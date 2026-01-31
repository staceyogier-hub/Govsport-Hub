import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "mobile-core";

export function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in to Govsport Hub</Text>
      <Text style={styles.subtitle}>Authentication flow will be wired to SSO.</Text>
      <PrimaryButton label="Continue" onPress={() => undefined} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 16
  },
  title: {
    fontSize: 28,
    color: "#f9fafc",
    fontWeight: "700"
  },
  subtitle: {
    fontSize: 16,
    color: "#a7adbd"
  }
});
