import axios from "axios";

const API_KEY = "9813ce01a72ca1bd2ae25f091898b1c7"; 
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";

export const fetchMovies = async (query = "") => {
  try {
    const endpoint = query
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
      : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
    const res = await axios.get(endpoint);
    return res.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error.message);
    return [];
  }
};

export const getImageUrl = (path) => `${IMG_PATH}${path}`;
