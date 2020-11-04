import {getMovies} from '@api';
import {useCallback, useEffect, useMemo, useState} from 'react';

export function useFetchMore(pagenumber: number | string) {
  const [page, setPage] = useState({page: pagenumber, total: 0});

  const [movie, setMovie] = useState<ItemsProps[]>([]);
  const [loading, setLoading] = useState(false);

  const movieMemo = useMemo(() => ({movie, page}), [loading]);

  useEffect(() => {
    let didcancel = false;

    const getMoviess = async () => {
      try {
        setLoading(true);
        const data = await getMovies(pagenumber);
        setMovie(curen => {
          return [
            ...new Set([
              {key: `item-${Math.random() * 1238}`, title: `title-${Math.random() * 98347}`},
              ...(data.movies as any),
              {key: `item-${Math.random() * 1238}`, title: `title-${Math.random() * 98347}`}
            ])
          ];
        });
        setPage({page: data.page, total: data.total_pages});
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getMoviess();

    return () => {
      didcancel = true;
    };
  }, [pagenumber]);

  return [movieMemo.movie, loading, movieMemo.page] as const;
}
