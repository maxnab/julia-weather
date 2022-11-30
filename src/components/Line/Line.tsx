import { forwardRef } from 'react';
import cn from 'classnames';
import styles from './Line.module.scss';
import type { IHourlyWeather } from '../../types/interfaces/iHourlyWeather';

interface Props {
  weather: IHourlyWeather[];
}

const getTimeCode = (timestamp: number) => {
  const date = new Date(timestamp * 1000).toLocaleTimeString().split(':');
  return date.slice(0, 2).join(':');
};

const Line = forwardRef<HTMLDivElement, Props>(({ weather }, ref) => {
  const blockWrapClassName = (idx: number): string => cn(styles['daily-block'], { [styles['daily-block-first']]: idx === 0 });

  return (
    <div id="not-swipable" ref={ref} className={styles.daily}>
      {weather.map((day, i) => (
        <div
          key={day.dt_txt}
          className={blockWrapClassName(i)}
        >
          <span className={styles['daily-block-time']}>{getTimeCode(day.dt)}</span>
          <div className={styles['daily-block-code']}>
            <img src={`assets/mini_weather_icons/${day.weather[0].icon}.png`} alt="day.weather[0].day.description" />
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
});

export { Line };
