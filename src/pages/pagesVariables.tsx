import React from 'react';
import type { IPage } from '../types/interfaces/iPage';
import { Daily } from './Daily/Daily';
import { Webcams } from './Webcams/Webcams';
import { Search } from './Search/Search';

const pages: IPage[] = [
  {
    name: 'search',
    position: 100,
    component: (props) => (
      <Search
        onCitySelect={props.onCitySelect}
        temperature={props.currentWeather?.temp}
      />
    ),
  },
  {
    name: 'daily',
    position: 0,
    component: (props) => (
      <Daily
        coords={props.coords}
        city={props.city}
        currentWeather={props.currentWeather}
      />
    ),
  },
  {
    name: 'webcams',
    position: -100,
    component: (props) => (
      <Webcams
        coords={props.coords}
        temperature={props.currentWeather?.temp}
      />
    ),
  },
];

export { pages };
