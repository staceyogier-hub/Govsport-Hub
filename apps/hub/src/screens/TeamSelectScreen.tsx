import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "mobile-core";

const TEAMS = ["Varsity Soccer", "Junior Basketball", "Track & Field"];

export function TeamSelectScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your team</Text>
      <View style={styles.grid}>
        {TEAMS.map((team) => (
          <Card key={team} title={team} subtitle="Active roster" />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 24,
    color: "#f9fafc",
    fontWeight: "700",
    marginBottom: 16
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16
  }
});
