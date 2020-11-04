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
