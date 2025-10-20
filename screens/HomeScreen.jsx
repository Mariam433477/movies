import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { fetchMovies } from "../api/moviesApi";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
 
  const genreMap = {
    All: null,
    Action: 28,
    Comedy: 35,
    Drama: 18,
    Horror: 27,
  };

  const categories = Object.keys(genreMap);

  const loadMovies = async (query = "", category = "All") => {
    setLoading(true);
    let data = await fetchMovies(query);

    
    if (category !== "All") {
      const genreId = genreMap[category];
      data = data.filter((movie) => movie.genre_ids?.includes(genreId));
    }

    setMovies(data);
    setLoading(false);
  };

  useEffect(() => {
    loadMovies();
  }, []);

  useEffect(() => {
    if (search.length > 2) loadMovies(search, selectedCategory);
    else loadMovies("", selectedCategory);
  }, [search, selectedCategory]);

  return (
    <View style={styles.container}>
      <SearchBar search={search} setSearch={setSearch} />

     
      <View style={styles.filterContainer}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterButton,
              selectedCategory === cat && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === cat && styles.filterTextActive,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

     
      {loading ? (
        <ActivityIndicator size="large" color="#BB86FC" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",  
    paddingTop: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  filterButton: {
    backgroundColor: "#1f1f1f",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    margin: 5,
  },
  filterButtonActive: {
    backgroundColor: "#8e1800ff",
  },
  filterText: {
    color: "#aaa",
    fontSize: 14,
  },
  filterTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
});
