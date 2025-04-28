import {useState } from "react";
import { useMovieContext } from "../context/MovieContext";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import MovieCard from "../components/MovieCard";

function FetchMovies() {
  const {movies, loading, error, handleSearch} = useMovieContext();
  const [filteredMovies, setFilteredMovies] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSearch(filteredMovies);
  };
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <h1 className="text-4xl flex justify-center p-5">CineNova</h1>
      <div className="p-5 flex justify-center">
        <input
          className="w-1/2"
          type="text"
          placeholder="Search movies..."
          value={filteredMovies}
          onChange={(event) => setFilteredMovies(event.target.value)}
          onKeyDown={handleKeyDown} // key enter
        />
        <button
          onClick={() => handleSearch(filteredMovies)}
          className="mx-2 px-2 rounded border-2 border-white"
        >
          Search
        </button>
      </div>

      <ul className=" p-2 gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
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
