export type EdgePacketVersion = "1.0" | "1.1";

export type EdgePacket = {
  version: EdgePacketVersion;
  payload: Record<string, unknown>;
};

export type DeviceStatus = {
  id: string;
  label: string;
  status: "online" | "offline";
  version: string;
};

export function parseEdgePacket(packet: string): EdgePacket {
  return {
    version: "1.0",
    payload: {
      raw: packet
    }
  };
}

export function formatEdgeVersion(version: string) {
  return `Edge protocol ${version}`;
}
