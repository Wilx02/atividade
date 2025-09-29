import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock JSON 
const MOCK_MOVIES = [
  { id: "1", title: "O Senhor dos Anéis" },
  { id: "2", title: "Harry Potter" },
  { id: "3", title: "Vingadores" },
  { id: "4", title: "Interestelar" },
];

export default function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Buscar filmes 
  useEffect(() => {
    setMovies(MOCK_MOVIES);
    loadFavorites();
  }, []);

  // Carregar favoritos 
  const loadFavorites = async () => {
    try {
      const favs = await AsyncStorage.getItem("favorites");
      if (favs) {
        setFavorites(JSON.parse(favs));
      }
    } catch (error) {
      console.log("Erro ao carregar favoritos", error);
    }
  };

  // Alternar favorito
  const toggleFavorite = async (movie) => {
    let updatedFavorites = [];
    if (favorites.some((fav) => fav.id === movie.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Verifica se é favorito
  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 Lista de Filmes</Text>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>{item.title}</Text>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: isFavorite(item.id) ? "red" : "green" },
              ]}
              onPress={() => toggleFavorite(item)}
            >
              <Text style={styles.buttonText}>
                {isFavorite(item.id) ? "Remover" : "Favoritar"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Text style={styles.title}>⭐ Favoritos</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.text}>• {item.title}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#111" },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff", marginVertical: 10 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  text: { color: "#fff", fontSize: 16 },
  button: {
    padding: 8,
    borderRadius: 6,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
