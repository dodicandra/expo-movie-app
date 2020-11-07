import {useFetchMore} from '@utils';
import React, {createContext, useContext, useState} from 'react';

interface Context {
  loading: boolean;
  movie: ItemsProps[];
  pages: {page: string | number; total: string | number};
  setPages: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}

const ContextAPI = createContext<Context>({} as Context);

export function useMovie() {
  const ctx = useContext(ContextAPI);

  if (ctx === null || ctx === undefined) throw new Error('not using contex');

  return ctx;
}

const Provides: React.FC = ({children}) => {
  const [page, setPages] = useState(1);
  const [movie, loading, pages] = useFetchMore(page);

  // const value = useMemo(() => ({movie, loading, pages, page, setPages}), []);

  return <ContextAPI.Provider value={{movie, loading, page, setPages, pages}}>{children}</ContextAPI.Provider>;
};

export default Provides;
