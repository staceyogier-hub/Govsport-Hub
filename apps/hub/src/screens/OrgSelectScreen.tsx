import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Card } from "mobile-core";

const ORGS = ["Metro Athletics", "Riverside Sports", "Capital Rec"];

export function OrgSelectScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select an organization</Text>
      <FlatList
        data={ORGS}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Card title={item} subtitle="Tap to continue" />
        )}
      />
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
  list: {
    gap: 12
  }
});
