import {getMovies} from '@api';
import {useEffect, useReducer} from 'react';
import update from 'immutability-helper';

interface State {
  movie: ItemsProps[];
  loading: boolean;
  page: {page: number | string; total: number | string};
}

enum TypeAction {
  SET_LOADING = 'SET_LOADING',
  SET_DATA = 'SET_DATA',
  SET_PAGE = 'SET_PAGE'
}

interface SetLoading {
  type: TypeAction.SET_LOADING;
}

interface SetData {
  type: TypeAction.SET_DATA;
  payload: ItemsProps[];
}

interface SetPage {
  type: TypeAction.SET_PAGE;
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
    case TypeAction.SET_DATA:
      const datas = new Set([
        {key: `item-right`, title: `title-right`},
        ...action.payload,
        {key: `item-left`, title: `title-left`}
      ]);
      return {
        ...state,
        loading: true,
        movie: [...datas] as ItemsProps[]
      };
    case TypeAction.SET_LOADING:
      return {
        ...state,
        loading: false
      };
    case TypeAction.SET_PAGE:
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
    dispatch({type: TypeAction.SET_DATA, payload: []});
  }, [pagenumber]);

  useEffect(() => {
    let didcancel = false;

    const getMoviess = async () => {
      try {
        const data = await getMovies(pagenumber);
        dispatch({
          type: TypeAction.SET_DATA,
          payload: data.movies
        });
        dispatch({type: TypeAction.SET_PAGE, payload: {page: data.page, total: data.total_pages}});
        dispatch({type: TypeAction.SET_LOADING});
      } catch (err) {
        console.log(err);
        dispatch({type: TypeAction.SET_LOADING});
      }
    };
    getMoviess();

    return () => {
      didcancel = true;
    };
  }, [pagenumber]);

  return [state.movie, state.loading, state.page] as const;
}
