import React, { FC, useState, useRef, TouchEvent } from 'react';
import './reset.css';
import './main.css';
import cn from 'classnames';
import Week from './pages/Week/Week';
import Daily from './pages/Daily/Daily';
import Page from './components/wrappers/Page/Page';
import styles from './App.module.scss';
import Header from './components/Header/Header';

export interface Option {
  label: string;
  value: string;
}

export type Options = Option[];

interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
  day: { icon: string, description: string };
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Sys {
  pod: string;
}

export interface HourlyWeather {
  id: number;
  dt: number;
  main: MainWeather;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}

export const initialCity = {
  label: 'Moscow',
  value: 'latitude=52.52&longitude=13.41',
};

export interface CurrentWeather {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
  description: string;
  icon: string;
  speed: string;
  precipitation: string;
  clouds: string;
}

const enum SwipeDirection {
  LEFT = 1,
  RIGHT,
}

const App: FC = () => {
  const swipeRef = useRef<number | null>(null);
  const [swipe, setSwipe] = useState(-0);

  const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    swipeRef.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const swipeEndPosition = e.changedTouches[0].clientX;
    if (swipeRef.current && swipeRef.current - swipeEndPosition > 150) {
      swipeRef.current = 0;
      setSwipe(SwipeDirection.LEFT);
    }
    if (swipeRef.current && swipeRef.current - swipeEndPosition <= 150) {
      swipeRef.current = 0;
      setSwipe(SwipeDirection.RIGHT);
    }
  };

  const swipeClassName = cn(
    styles.wrap,
    { [styles.sl]: swipe === SwipeDirection.LEFT },
    { [styles.sr]: swipe === SwipeDirection.RIGHT },
  );

  return (
    <div>
      <Header />
      <div
        className={swipeClassName}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className={styles['first-page']}>
          <Page>
            <Daily />
          </Page>
        </div>
        <div className={styles['second-page']}>
          <Page>
            <Week />
          </Page>
        </div>
      </div>
    </div>
  );
};

export default App;
