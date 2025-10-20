import React from "react";
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";
 
export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();
 
  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Image
        source={require("../assets/OIP.webp")}  
        style={styles.emptyImage}
        resizeMode="contain"
      />
      <Text style={styles.emptyTitle}>Your Favorite List is Empty</Text>
      <Text style={styles.emptySubtitle}>Pick up your Favorite Movies 🍿</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <EmptyState />
      ) : (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <View>
              <MovieCard movie={item} />
              <TouchableOpacity
                onPress={() => toggleFavorite(item)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remove ❌</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0c0c",  
  },
  removeButton: {
    backgroundColor: "red",
    padding: 8,
    marginHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  removeButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyImage: {
    width: 250,
    height: 250,
    marginBottom: 25,
  },
  emptyTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtitle: {
    color: "#bbb",
    fontSize: 16,
    textAlign: "center",
  },
});
