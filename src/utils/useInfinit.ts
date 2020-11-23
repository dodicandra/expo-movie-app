import {getMovies} from '@api';
import {useEffect, useReducer} from 'react';
import {set_loading, set_data, set_page} from 'types';

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
    case 'set-data': {
      const datas = new Set([{key: 'item-right', title: 'title-right'}, ...action.payload, {key: 'item-left', title: 'title-left'}]);
      return {
        ...state,
        loading: false,
        movie: [...datas] as ItemsProps[]
      };
    }
    case 'set-loading':
      return {
        ...state,
        loading: true
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
    const getMoviess = async () => {
      try {
        dispatch({type: 'set-loading'});
        const data = await getMovies(pagenumber);
        dispatch({
          type: 'set-data',
          payload: data.movies
        });
        dispatch({type: 'set-page', payload: {page: data.page, total: data.total_pages}});
      } catch (err) {
        console.log(err);
        dispatch({type: 'set-loading'});
      }
    };
    getMoviess();
  }, [pagenumber]);

  return [state.movie, state.loading, state.page] as const;
}
