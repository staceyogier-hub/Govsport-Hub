import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function PrimaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
      <Text style={styles.primaryButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

export function Card({
  title,
  subtitle,
  variant = "default"
}: {
  title: string;
  subtitle?: string;
  variant?: "default" | "success" | "muted";
}) {
  return (
    <View style={[styles.card, styles[`card_${variant}`]]}>
      <Text style={styles.cardTitle}>{title}</Text>
      {subtitle ? <Text style={styles.cardSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: "#3d5afe",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20
  },
  primaryButtonText: {
    color: "#f9fafc",
    fontWeight: "600",
    fontSize: 16
  },
  card: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#161b26",
    borderWidth: 1,
    borderColor: "#23283a"
  },
  card_default: {},
  card_success: {
    borderColor: "#2ce79d",
    backgroundColor: "#13261f"
  },
  card_muted: {
    borderColor: "#434c65",
    backgroundColor: "#11141d"
  },
  cardTitle: {
    color: "#f9fafc",
    fontSize: 18,
    fontWeight: "600"
  },
  cardSubtitle: {
    color: "#a7adbd",
    marginTop: 6
  }
});
