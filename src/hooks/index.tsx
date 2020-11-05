import React, {createContext, useMemo, useState} from 'react';
import {useFetchMore} from '@utils';

interface Context {
  loading: boolean;
  movie: ItemsProps[];
  pages: {page: string | number; total: string | number};
  setPages: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}

export const ContextAPI = createContext<Context>({} as Context);

const Provides: React.FC = ({children}) => {
  const [page, setPages] = useState(1);
  const [movie, loading, pages] = useFetchMore(page);

  return <ContextAPI.Provider value={{movie, loading, page, setPages, pages}}>{children}</ContextAPI.Provider>;
};

export default Provides;
