/// <reference types="react" />

declare module '*.svg' {
  import React from 'react'
  import {SvgProps} from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}

type StackHome<H = object, B = object, D = object> = {
  Home: H | undefined
  Booking: B | undefined
  Detail: D | undefined
}

enum TypeAction {
  SET_LOADING = 'SET_LOADING',
  SET_DATA = 'SET_DATA',
  SET_PAGE = 'SET_PAGE'
}

interface ItemsProps {
  key: string
  title: string
  poster: string
  backdrop: string
  rating: string
  description: string
  releaseDate: string
  genres: string[]
  adult: boolean
  price: number
}

/**
 *
 * P for React Props
 * S for Static React Shared Element
 *
 */
type ComStatic<P, S> = React.FC<P> & S
