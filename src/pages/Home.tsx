import React, { useState, useEffect } from 'react';
import { FetchCurrentMovies, FetchMovies, FetchMoviesByActor, FetchCurrentTVShows, FetchTVShows } from "../api/Api";
import { MovieCard } from "../components/MovieCard";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

interface TVShow {
  id: number;
  poster_path: string;
  name: string;
}

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadCurrentContent = async () => {
      setLoading(true);
      const currentMovies = await FetchCurrentMovies();
      const currentTVShows = await FetchCurrentTVShows();
      setMovies(currentMovies);
      setTVShows(currentTVShows);
      setLoading(false);
    };

    loadCurrentContent();
  }, []);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    let movies = await FetchMovies(query);
    if (movies.length === 0) {
      movies = await FetchMoviesByActor(query);
    }
    const tvShows = await FetchTVShows(query);
    setMovies(movies);
    setTVShows(tvShows);
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="flex mt-10 mb-16 px-4 sm:px-6 md:px-8 lg:px-10">
        <input
          type="text"
          placeholder="Search for a movie, TV show, actor..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-2 bg-gray-800 text-white rounded-l gold-input lg:h-15 placeholder-lg"
        />
        <button type="submit" className="gold-button">Search</button>
      </form>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 mt-6 px-4 sm:px-6 md:px-8 lg:px-10">
        {loading ? (
          <p className="text-center text-red-500">Loading...</p>
        ) : (
          <>
            {movies.length === 0 && tvShows.length === 0 ? (
              <p className="text-center text-red-500">No movies or TV shows found.</p>
            ) : (
              <>
                {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
                {tvShows.map((tvShow) => (
                  <MovieCard key={tvShow.id} movie={{ id: tvShow.id, poster_path: tvShow.poster_path, title: tvShow.name }} />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;