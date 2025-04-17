const api_key = import.meta.env.VITE_TMDB_api_key;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchCurrentMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${api_key}&append_to_response=releases`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();
  console.log("Fetched Current Movies:", data.results); // Log API response
  return data.results;
}

export async function fetchMovies(query: string) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${api_key}&query=${query}`
  );
  const data = await response.json();
  console.log("Fetched Movies for Query:", query, data.results);
  return data.results;
}

export async function fetchMovieDetails(movieId: number) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${api_key}&append_to_response=videos,credits,watch/providers`
  );
  const data = await response.json();
  console.log("Fetched Movie Details for ID:", movieId, data); // Log API response
  const genres = data.genres.map(
    (genre: { id: number; name: string }) => genre.name
  );
  return { ...data, genres };
}
