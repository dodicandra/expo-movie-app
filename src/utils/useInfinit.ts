import {getMovies} from '@api';
import {useEffect, useReducer} from 'react';

interface State {
  movie: ItemsProps[];
  loading: boolean;
  page: {page: number | string; total: number | string};
}

interface SetLoading {
  type: typeof set_loading;
}

interface SetData {
  type: typeof set_data;
  payload: ItemsProps[];
}

interface SetPage {
  type: typeof set_page;
  payload: State['page'];
}

type Action = SetLoading | SetData | SetPage;

const initialState: State = {
  movie: [],
  loading: false,
  page: {page: 1, total: 0}
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'set-data':
      const datas = new Set([{key: `item-right`, title: `title-right`}, ...action.payload, {key: `item-left`, title: `title-left`}]);
      return {
        ...state,
        loading: true,
        movie: [...datas] as ItemsProps[]
      };
    case 'set-loading':
      return {
        ...state,
        loading: false
      };
    case 'set-page':
      return {
        ...state,
        page: action.payload
      };
    default:
      throw new Error('cannot action type');
  }
};

export function useFetchMore(pagenumber: number | string) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({type: 'set-data', payload: []});
  }, [pagenumber]);

  useEffect(() => {
    let didcancel = false;

    const getMoviess = async () => {
      try {
        const data = await getMovies(pagenumber);
        dispatch({
          type: 'set-data',
          payload: data.movies
        });
        dispatch({type: 'set-page', payload: {page: data.page, total: data.total_pages}});
        dispatch({type: 'set-loading'});
        return () => {
          didcancel = true;
        };
      } catch (err) {
        console.log(err);
        dispatch({type: 'set-loading'});
      }
    };
    getMoviess();

    return () => {
      didcancel = true;
    };
  }, [pagenumber]);

  return [state.movie, state.loading, state.page] as const;
}
