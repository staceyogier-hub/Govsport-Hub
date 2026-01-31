import React, { useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { formatEdgeVersion } from "edge-protocol";
import { Card } from "mobile-core";
import { formatQueueDepth } from "data-store";
import { useBleLivePackets } from "../hooks/useBleLivePackets";

function formatAge(timestamp: number, now: number) {
  const seconds = Math.max(0, Math.floor((now - timestamp) / 1000));
  return `${seconds}s ago`;
}

export function HubSessionScreen() {
  const { deviceList, error } = useBleLivePackets(true);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const sortedDevices = useMemo(
    () => [...deviceList].sort((a, b) => a.deviceSerial.localeCompare(b.deviceSerial)),
    [deviceList]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Live session monitor</Text>
        <Text style={styles.subtitle}>
          {formatQueueDepth(2)} waiting to sync · {formatEdgeVersion("1.0")}
        </Text>
        {error ? <Text style={styles.error}>Scanner warning: {error}</Text> : null}
      </View>
      <FlatList
        data={sortedDevices}
        keyExtractor={(item) => item.deviceSerial}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>Scanning for edge devices...</Text>}
        renderItem={({ item }) => (
          <Card
            title={`${item.deviceSerial} · ${item.batteryPct}% battery`}
            subtitle={`RSSI ${item.rssi} dBm · ${formatAge(item.lastSeen, now)} · ${item.impactCount10s} impacts/10s`}
            variant={item.rssi > -70 ? "success" : "muted"}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    marginBottom: 16
  },
  title: {
    fontSize: 24,
    color: "#f9fafc",
    fontWeight: "700"
  },
  subtitle: {
    fontSize: 14,
    color: "#a7adbd",
    marginTop: 6
  },
  error: {
    marginTop: 8,
    color: "#f4a261"
  },
  list: {
    gap: 12
  },
  empty: {
    color: "#a7adbd"
  }
});
