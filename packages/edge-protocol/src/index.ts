export type EdgePacketVersion = 1;

export type LivePacket = {
  deviceSerial: string;
  seq: number;
  tDeviceMs: number;
  syncQuality: number;
  batteryPct: number;
  gnssFix: boolean;
  speedMs: number;
  headingDeg?: number;
  playerLoad: number;
  impactCount10s: number;
  impactPeakG: number;
};

const MIN_V1_LENGTH = 18;

function readUint16(view: DataView, offset: number) {
  return view.getUint16(offset, true);
}

function readUint32(view: DataView, offset: number) {
  return view.getUint32(offset, true);
}

export function parseLivePacket(payloadBytes: Uint8Array): LivePacket | null {
  if (payloadBytes.length < 2) {
    return null;
  }
  const version = payloadBytes[0];
  if (version !== 1) {
    return null;
  }
  return parseLivePacketV1(payloadBytes);
}

function parseLivePacketV1(payloadBytes: Uint8Array): LivePacket | null {
  if (payloadBytes.length < MIN_V1_LENGTH) {
    return null;
  }

  const view = new DataView(payloadBytes.buffer, payloadBytes.byteOffset, payloadBytes.byteLength);
  const serialValue = readUint32(view, 1);
  const deviceSerial = `GS-${serialValue.toString(16).padStart(8, "0")}`;
  const seq = readUint16(view, 5);
  const tDeviceMs = readUint32(view, 7);
  const syncQuality = view.getUint8(11);
  const batteryPct = view.getUint8(12);
  const gnssFix = view.getUint8(13) > 0;
  const speedMs = readUint16(view, 14) / 100;

  let headingDeg: number | undefined;
  let playerLoad = 0;
  let impactCount10s = 0;
  let impactPeakG = 0;

  if (payloadBytes.length >= 20) {
    headingDeg = readUint16(view, 16) / 10;
    playerLoad = readUint16(view, 18) / 100;
  }

  if (payloadBytes.length >= 21) {
    impactCount10s = view.getUint8(20);
  }

  if (payloadBytes.length >= 23) {
    impactPeakG = readUint16(view, 21) / 100;
  }

  return {
    deviceSerial,
    seq,
    tDeviceMs,
    syncQuality,
    batteryPct,
    gnssFix,
    speedMs,
    headingDeg,
    playerLoad,
    impactCount10s,
    impactPeakG
  };
}

export function formatEdgeVersion(version: string) {
  return `Edge protocol ${version}`;
}
