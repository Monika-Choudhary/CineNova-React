import React from 'react';
// import { navigateTo } from '../router/router';

interface Movie {
  id: number;
  poster_path: string;
  title: string;
}

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    window.location.href = `/movie?id=${movie.id}`;
  };

  return (
    <a href={`/movie?id=${movie.id}`} className="block movie-link" data-id={movie.id.toString()} onClick={handleClick}>
      <div className="gold-border hover-container">
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="rounded w-full object-cover" alt={movie.title} />
        <h2 className="text-lg text-left mb-6 pt-4 movie-title">{movie.title}</h2>
      </div>
    </a>
  );
};