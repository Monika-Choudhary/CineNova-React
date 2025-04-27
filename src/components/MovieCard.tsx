interface MovieCardProps {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  genres: string[];
  certification: string;
}

function MovieCard({
  id,
  title,
  genres,
  certification,
  posterPath,
}: MovieCardProps) {
  return (
    <li key={id}>
      <img className="pb-3 "src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />
      <h1>{title}</h1>
      <p>Genres: {genres.join(", ")}</p>
      <p>FSK:{certification || " nicht bekannt"}</p>
    </li>
  );
}

export default MovieCard;
