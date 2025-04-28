import { createContext, ReactNode, useContext, useState } from "react";
import { fetchCurrentMovies, fetchMovies } from "../api/Api";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genres: string[];
  certification: string;
}

interface MovieContextProps {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  handleSearch: (query: string) => Promise<void>;
  fetchLatestMovies: () => Promise<void>;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const latestMovies = await fetchCurrentMovies();
      setMovies(latestMovies);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      await fetchLatestMovies();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const searchedMovies = await fetchMovies(query);

      setMovies(searchedMovies);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MovieContext.Provider
      value={{ movies, loading, error, handleSearch, fetchLatestMovies }}
    >
      {children}
    </MovieContext.Provider>
  );
};
export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};
