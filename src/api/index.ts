import {API_KEY} from '@config';

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
  price: number;
}

type Results = {
  results: MovieReults[];
  page: number;
  total_pages: number;
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

const API_URL = (page: string | number) => `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
const getImagePath = (path: string) => `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path: string) => `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

export const getMovies = async (pages: string | number = 1) => {
  const {results, page, total_pages}: Results = await fetch(API_URL(pages)).then(x => x.json());
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
      adult,
      price: 25000
    })
  );

  return {page, total_pages, movies};
};
