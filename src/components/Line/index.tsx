import React, { FC } from 'react';
import styles from './styles.module.scss';
import { weatherCodes, weatherCodesImages } from '../../weatherCodes';
import { HourlyWeather } from '../../App';

interface Props {
  weather: HourlyWeather[];
}

const Line: FC<Props> = ({ weather }) => {
  return (
    <div className={styles.daily}>
      {weather.map(({ time, code, temp }) => (
        <div className={styles['daily-block']}>
          <span className={styles['daily-block-time']}>{time}</span>
          <div className={styles['daily-block-code']}>
            <img src={weatherCodesImages[code]} alt={weatherCodes[code]} />
          </div>
          <span className={styles['daily-block-temp']}>{temp}</span>
        </div>
      ))}
    </div>
  );
};

export default Line;
