import React from 'react';
import type { IPage } from '../types/interfaces/iPage';
import { Daily } from './Daily/Daily';
import { Webcams } from './Webcams/Webcams';
import { Search } from './Search/Search';
import { PagePosition } from '../types/enums/swipeDirection';

const pages: IPage[] = [
  {
    name: 'search',
    position: PagePosition.LEFT,
    component: (props) => (
      <Search
        onCitySelect={props.onCitySelect}
        temperature={props.currentWeather?.temp}
        onSwipeRightButton={props?.onSwipeRightButton}
      />
    ),
  },
  {
    name: 'daily',
    position: PagePosition.CENTER,
    component: (props) => (
      <Daily
        ref={props.ref}
        coords={props.coords}
        city={props.city}
        currentWeather={props.currentWeather}
        onSwipeLeftButton={props?.onSwipeLeftButton}
        onSwipeRightButton={props?.onSwipeRightButton}
      />
    ),
  },
  {
    name: 'webcams',
    position: PagePosition.RIGHT,
    component: (props) => (
      <Webcams
        coords={props.coords}
        temperature={props.currentWeather?.temp}
        onSwipeLeftButton={props?.onSwipeLeftButton}
      />
    ),
  },
];

export { pages };
