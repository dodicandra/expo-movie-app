import {getMovies} from '@api';
import {useCallback, useEffect, useState} from 'react';
import {ItemsProps} from 'types';

export function useFetchMore() {
  const [page, setPage] = useState(3);

  const [movie, setMovie] = useState<ItemsProps[]>([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchMore = useCallback(() => setShouldFetch(true), []);

  useEffect(() => {
    if (!shouldFetch) {
      return;
    }

    const getMoviess = async () => {
      try {
        setLoading(true);
        const data = await getMovies(page);
        setMovie(curen => [
          {key: `item-${Math.random() * 1238}`, title: `title-${Math.random() * 98347}`},
          ...(data as any),
          {key: `item-${Math.random() * 1238}`, title: `title-${Math.random() * 98347}`}
        ]);
        setShouldFetch(false);
        setLoading(false);
        setPage(page + 1);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    getMoviess();
  }, [page, shouldFetch]);

  return [movie, fetchMore, loading] as const;
}
