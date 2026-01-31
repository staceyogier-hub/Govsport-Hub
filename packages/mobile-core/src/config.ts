import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const DEVICE_ID_KEY = "govsport:hubDeviceId";

export type AppConfig = {
  apiBaseUrl: string;
};

export function getAppConfig(): AppConfig {
  const extra = Constants.expoConfig?.extra ?? {};
  return {
    apiBaseUrl: String(extra.GOVSPORT_API_BASE_URL ?? "")
  };
}

function generateDeviceId() {
  return `hub-${Math.random().toString(36).slice(2, 10)}`;
}

export async function getOrCreateDeviceId(): Promise<string> {
  const stored = await AsyncStorage.getItem(DEVICE_ID_KEY);
  if (stored) {
    return stored;
  }
  const nextId = generateDeviceId();
  await AsyncStorage.setItem(DEVICE_ID_KEY, nextId);
  return nextId;
}
