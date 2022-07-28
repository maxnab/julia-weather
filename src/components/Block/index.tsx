import React, { FC } from 'react';
import styles from './styles.module.scss';
import windIcon from '../../assets/icons/wind.svg';
import humidityIcon from '../../assets/icons/humidity.png';
import rainIcon from '../../assets/icons/umbrella.png';

const icons = {
  wind: windIcon,
  humidity: humidityIcon,
  rain: rainIcon,
};

interface Props {
  name: 'wind' | 'humidity' | 'rain';
  value: string;
}

const WeatherLine: FC<Props> = ({ name, value }) => (
  <div className={styles.wrap}>
    <div>
      <img src={icons[name]} alt={name} />
      <span>{name}</span>
    </div>
    <span>{value}</span>
  </div>
);

export default WeatherLine;
