import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function SearchBar({ search, setSearch }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for a movie..."
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    elevation: 2,
  },
});
