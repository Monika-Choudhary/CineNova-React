const api_key = import.meta.env.VITE_TMDB_api_key;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovieDetails(movieId: number) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${api_key}&append_to_response=videos,credits,watch/providers,release_dates`
  );
  const data = await response.json();
  console.log("Fetched Movie Details for ID:", movieId, data);
  // Genres extrahieren
  const genres =
    data.genres?.map((genre: { id: number; name: string }) => genre.name) || [];

  // Altersfreigabe aus Deutschland (DE) holen
  const releaseDates = data.release_dates?.results || [];
  const germanyRelease = releaseDates.find(
    (release: { iso_3166_1: string }) => release.iso_3166_1 === "DE"
  );
  const certification = germanyRelease?.release_dates[0]?.certification;

  return {
    id: data.id,
    title: data.title,
    overview: data.overview,
    poster_path: data.poster_path,
    genres,
    certification,
  };
}

export async function fetchCurrentMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${api_key}`);
  const data = await response.json();

  const detailedMovies = await Promise.all(
    data.results.map((movie: { id: number }) => fetchMovieDetails(movie.id))
  );

  return detailedMovies;
}

export async function fetchMovies(searchTerm: string) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${api_key}&query=${encodeURIComponent(
      searchTerm
    )}`
  );
  const data = await response.json();

  const detailedMovies = await Promise.all(
    data.results.map((movie: { id: number }) => fetchMovieDetails(movie.id))
  );

  return detailedMovies;
}
