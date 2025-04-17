import { useEffect, useState } from "react";
import { fetchCurrentMovies, fetchMovies } from "../api/Api";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import MovieCard from "../components/MovieCard";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genres: string[];
  certification: string;
  adult: boolean;
}

function FetchMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [filteredMovies, setFilteredMovies] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const movies = await fetchCurrentMovies();
        setMovies(movies);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const handleSearch = async () => {
    if (!filteredMovies.trim()) {
      const movies = await fetchCurrentMovies();
      setMovies(movies);

      return;
    }
    setLoading(true);
    try {
      const searchedMovies = await fetchMovies(filteredMovies);
      setTimeout(() => {
        setMovies(searchedMovies);
        setLoading(false);
      }, 2000);
    } catch (error) {
      setError(error as Error);
      setLoading(false);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSearch();
  };
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="">
      <h1>Popular Movies</h1>
      <div>
        <input
          type="text"
          placeholder="Search movies..."
          value={filteredMovies}
          onChange={(event) => setFilteredMovies(event.target.value)}
          onKeyDown={handleKeyDown} // key enter
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div></div>
      <ul className="border border-red-700 p-2 gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            overview={movie.overview}
            posterPath={movie.poster_path}
            genres={movie.genres}
            certification={movie.certification}
          />
        ))}
      </ul>
    </div>
  );
}

export default FetchMovies;
