const api_key = import.meta.env.VITE_TMDB_api_key;
const BASE_URL = "https://api.themoviedb.org/3";

export async function FetchMovies(query: string) {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${api_key}&query=${query}`
  );
  const data = await response.json();
  return data.results;
}

export async function FetchMovieDetails(movieId: number) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${api_key}&append_to_response=videos,credits,watch/providers`
  );
  const data = await response.json();
  return data;
}

export async function FetchCurrentMovies() {
  const response = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${api_key}`
  );
  const data = await response.json();

  return data.results;
}

export async function FetchMoviesByActor(query: string) {
  const response = await fetch(
    `${BASE_URL}/search/person?api_key=${api_key}&query=${query}`
  );
  const data = await response.json();
  const actorId = data.results[0]?.id;

  if (!actorId) {
    return [];
  }

  const moviesResponse = await fetch(
    `${BASE_URL}/discover/movie?api_key=${api_key}&with_cast=${actorId}`
  );
  const moviesData = await moviesResponse.json();

  return moviesData.results;
}

export async function FetchTVShows(query: string) {
  const response = await fetch(
    `${BASE_URL}/search/tv?api_key=${api_key}&query=${query}`
  );
  const data = await response.json();

  return data.results;
}

export async function FetchTVShowDetails(tvShowId: number) {
  const response = await fetch(
    `${BASE_URL}/tv/${tvShowId}?api_key=${api_key}&append_to_response=videos,credits,watch/providers`
  );
  const data = await response.json();
  return data;
}

export async function FetchCurrentTVShows() {
  const response = await fetch(`${BASE_URL}/tv/on_the_air?api_key=${api_key}`);
  const data = await response.json();

  return data.results;
}

// import { useEffect, useState } from "react";

// const api_key = import.meta.env.VITE_TMDB_api_key;
// const BASE_URL = "https://api.themoviedb.org/3";

// interface Movie {
//   id: number;
//   title: string;
//   overview: string;
//   poster_path: string;
// }

// function FetchMovies() {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<null | Error>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           `${BASE_URL}/movie/popular?api_key=${api_key}`
//         );
//         const data = await response.json();
//         setTimeout(() => {
//           console.log("Timeout 5sec");
//           setMovies(data.results);
//           console.log(data.results);
//           setLoading(false);
//         }, 5000);
//       } catch (error) {
//         setError(error as Error);
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (loading) {
//     return <h1>Loading...</h1>;
//   }
//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }
//   return (
//     <div>
//       <h1>Popular Movies</h1>
//       <ul>
//         {movies.map((movie) => (
//           <li key={movie.id}>
//                        <img
//               src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               alt={movie.title}
//             />
//             <h1>{movie.title}</h1>
//             <p>{movie.overview}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default FetchMovies;
