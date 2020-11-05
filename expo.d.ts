/// <reference types="react" />

declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

const set_loading = 'set-loading';
const set_data = 'set-data';
const set_page = 'set-page';

type StackHome<T = object> = {
  Home: T | undefined;
  Booking: T | undefined;
  Detail: T | undefined;
};

enum colore {
  blue1 = 'rgb(105, 41, 255)',
  hitam1 = 'rgba(200, 200, 200, 0.3)',
  kuning = '#F7BB0E',
  merah = '#F00000'
}

enum TypeAction {
  SET_LOADING = 'SET_LOADING',
  SET_DATA = 'SET_DATA',
  SET_PAGE = 'SET_PAGE'
}

interface ItemsProps {
  key: string;
  title: string;
  poster: string;
  backdrop: string;
  rating: string;
  description: string;
  releaseDate: string;
  genres: string[];
  adult: boolean;
  price: number;
}

/**
 *
 * T for React Props
 * S for Static React Shared Element
 *
 */
type ComStatic<T, S> = React.FC<T & S>;
