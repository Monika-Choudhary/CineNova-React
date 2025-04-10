const api_key = import.meta.env.VITE_TMDB_api_key;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchCurrentMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${api_key}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }
  const data = await response.json();

  return data.results;
}
