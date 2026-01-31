import { decode as decodeBase64 } from "base-64";
import { useEffect, useMemo, useRef, useState } from "react";
import { BleManager } from "react-native-ble-plx";
import { LivePacket, parseLivePacket } from "edge-protocol";

export type LiveDeviceSummary = LivePacket & {
  rssi: number;
  lastSeen: number;
};

const EMPTY_BYTES = new Uint8Array(0);

function base64ToBytes(data?: string | null): Uint8Array {
  if (!data) {
    return EMPTY_BYTES;
  }
  const binary = decodeBase64(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export function useBleLivePackets(isActive: boolean) {
  const [devices, setDevices] = useState<Record<string, LiveDeviceSummary>>({});
  const [error, setError] = useState<string | null>(null);
  const managerRef = useRef<BleManager | null>(null);
  const seenRef = useRef(new Set<string>());

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const manager = new BleManager();
    managerRef.current = manager;

    manager.startDeviceScan(null, { allowDuplicates: true }, (scanError, device) => {
      if (scanError) {
        setError(scanError.message);
        return;
      }
      if (!device) {
        return;
      }

      const payloadBytes = base64ToBytes(device.manufacturerData);
      let packet: LivePacket | null = null;
      try {
        packet = parseLivePacket(payloadBytes);
      } catch (parseError) {
        setError(parseError instanceof Error ? parseError.message : "Failed to parse packet");
      }
      if (!packet) {
        return;
      }

      const dedupeKey = `${packet.deviceSerial}:${packet.seq}`;
      if (seenRef.current.has(dedupeKey)) {
        return;
      }
      seenRef.current.add(dedupeKey);

      setDevices((prev) => ({
        ...prev,
        [packet.deviceSerial]: {
          ...packet,
          rssi: device.rssi ?? 0,
          lastSeen: Date.now()
        }
      }));
    });

    return () => {
      manager.stopDeviceScan();
      manager.destroy();
      managerRef.current = null;
    };
  }, [isActive]);

  const deviceList = useMemo(() => Object.values(devices), [devices]);

  return {
    deviceList,
    error
  };
}
