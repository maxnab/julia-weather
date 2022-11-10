import React, { FC } from 'react';
import styles from './Line.module.scss';
import type { HourlyWeather } from '../../types/interfaces/hourlyWeather';

interface Props {
  weather: HourlyWeather[];
}

const getTimeCode = (timestamp: number) => {
  const date = new Date(timestamp * 1000).toLocaleTimeString().split(':');
  return date.slice(0, 2).join(':');
};

const Line: FC<Props> = ({ weather }) => (
  <div className={styles.daily}>
    {weather.map((day) => (
      <div key={day.id} className={styles['daily-block']}>
        <span className={styles['daily-block-time']}>{getTimeCode(day.dt)}</span>
        <div className={styles['daily-block-code']}>
          <img src={`/src/assets/weather_icons/${day.weather[0].icon}.png`} alt="day.weather[0].day.description" />
        </div>
        <span className={styles['daily-block-temp']}>
          {Math.trunc(day.main.temp)}
          {' '}
          °
        </span>
      </div>
    ))}
  </div>
);
export { Line };
