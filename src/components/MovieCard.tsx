interface MovieCardProps {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
}

function MovieCard({ id, title, overview, posterPath }: MovieCardProps) {
  return (
    <li key={id}>
      <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />
      <h1>{title}</h1>
      <p>{overview}</p>
    </li>
  );
}

export default MovieCard;