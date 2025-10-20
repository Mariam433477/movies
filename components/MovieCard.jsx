import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import { getImageUrl } from "../api/moviesApi";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function MovieCard({ movie }) {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: getImageUrl(movie.poster_path) }}
        style={styles.image}
      />

      <View style={styles.infoRow}>
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>

        <TouchableOpacity onPress={() => toggleFavorite(movie)}>
          {isFavorite(movie.id) ? (
            <FontAwesome name="heart" size={24} color="red" />
          ) : (
            <Entypo name="heart-outlined" size={24} color="black" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    elevation: 4,
    width: width - 20, 
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    marginRight: 10,
  },
});
