/// <reference types="react" />

declare module '*.svg' {
  import React from 'react';
  import {SvgProps} from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

type StackHome<T = object> = {
  Home: T | undefined;
  Booking: T | undefined;
  Detail: T | undefined;
};

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
