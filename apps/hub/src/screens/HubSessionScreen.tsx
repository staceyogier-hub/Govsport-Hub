import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { DeviceStatus, formatEdgeVersion } from "edge-protocol";
import { Card } from "mobile-core";
import { formatQueueDepth } from "data-store";

const DEVICES: DeviceStatus[] = [
  { id: "hub-1001", label: "North Gate", status: "online", version: "1.0.0" },
  { id: "hub-1002", label: "West Court", status: "offline", version: "1.0.0" },
  { id: "hub-1003", label: "South Field", status: "online", version: "1.1.0" }
];

export function HubSessionScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Live session monitor</Text>
        <Text style={styles.subtitle}>
          {formatQueueDepth(2)} waiting to sync · {formatEdgeVersion("1.1.0")}
        </Text>
      </View>
      <FlatList
        data={DEVICES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card
            title={item.label}
            subtitle={`${item.id} · ${item.status.toUpperCase()} · v${item.version}`}
            variant={item.status === "online" ? "success" : "muted"}
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
  list: {
    gap: 12
  }
});
