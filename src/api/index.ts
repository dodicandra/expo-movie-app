const API_KEY = 'ff99aa7252c2cd4c74fb35f26a0ee26c';

export interface MovieReults {
  id: string;
  original_title: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: string;
  overview: string;
  release_date: string;
  genre_ids: Array<keyof typeof genres>;
  adult: boolean;
}

type Results = {
  results: MovieReults[];
};

const genres = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  878: 'Science Fiction',
  9648: 'Mystery',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10770: 'TV Movie'
};

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
const getImagePath = (path: string) => `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path: string) => `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

export const getMovies = async () => {
  const {results}: Results = await fetch(API_URL).then(x => x.json());
  const movies = results.map(
    ({id, original_title, poster_path, backdrop_path, vote_average, overview, release_date, genre_ids, adult}) => ({
      key: String(id),
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      genres: genre_ids.map(genre => genres[genre]),
      adult
    })
  );

  return movies;
};
