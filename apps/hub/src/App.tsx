import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getAppConfig, getOrCreateDeviceId } from "mobile-core";
import { HubSessionScreen } from "./screens/HubSessionScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { OrgSelectScreen } from "./screens/OrgSelectScreen";
import { TeamSelectScreen } from "./screens/TeamSelectScreen";

const SCREENS = ["login", "org", "team", "session"] as const;

type ScreenKey = (typeof SCREENS)[number];

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenKey>("login");
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const config = useMemo(() => getAppConfig(), []);

  useEffect(() => {
    getOrCreateDeviceId().then(setDeviceId).catch(() => setDeviceId("unknown"));
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.sidebar}
        >
          <Text style={styles.brand}>Govsport Hub</Text>
          <Text style={styles.meta}>API: {config.apiBaseUrl}</Text>
          <Text style={styles.meta}>Device: {deviceId ?? "loading..."}</Text>
          <View style={styles.nav}>
            {SCREENS.map((screen) => (
              <TouchableOpacity
                key={screen}
                onPress={() => setActiveScreen(screen)}
                style={[styles.navButton, activeScreen === screen && styles.navButtonActive]}
              >
                <Text style={styles.navButtonText}>{screen.toUpperCase()}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.content}>
          {activeScreen === "login" && <LoginScreen />}
          {activeScreen === "org" && <OrgSelectScreen />}
          {activeScreen === "team" && <TeamSelectScreen />}
          {activeScreen === "session" && <HubSessionScreen />}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0c0f1a"
  },
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 24
  },
  sidebar: {
    width: 260,
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: "#1f2433"
  },
  brand: {
    color: "#f9fafc",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12
  },
  meta: {
    color: "#b4b9c8",
    fontSize: 12,
    marginBottom: 6
  },
  nav: {
    marginTop: 20,
    gap: 12
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#161b26"
  },
  navButtonActive: {
    backgroundColor: "#2e3652"
  },
  navButtonText: {
    color: "#f9fafc",
    fontWeight: "600"
  },
  content: {
    flex: 1,
    paddingLeft: 24
  }
});
