import { useEffect, useState } from "react";
import { fetchCurrentMovies } from "../api/Api";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import MovieCard from "../components/MovieCard";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

function FetchMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const movies = await fetchCurrentMovies();
        setTimeout(() => {
          console.log("timeout");

          setMovies(movies);
          console.log(movies.results);

          setLoading(false);
        }, 1000);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  console.log("Loading state:", loading); // Log the loading state
  console.log("Error state:", error); // Log the error state
  console.log("Movies state:", movies); // Log the movies state


  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div>
      <h1>Popular Movies</h1>
      <ul>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            overview={movie.overview}
            posterPath={movie.poster_path}
          />
        ))}
      </ul>
    </div>
  );
}

export default FetchMovies;
