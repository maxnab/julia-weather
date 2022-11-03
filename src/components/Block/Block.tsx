import React, { FC } from 'react';
import styles from './Block.module.scss';
import windIcon from '../../assets/icons/wind.svg';
import humidityIcon from '../../assets/icons/humidity.svg';
import cloudsIcon from '../../assets/icons/cloud.svg';

const icons = {
  wind: windIcon,
  humidity: humidityIcon,
  clouds: cloudsIcon,
};

interface Props {
  name: 'clouds' | 'humidity' | 'wind';
  value: string;
}

const WeatherLine: FC<Props> = ({ name, value }) => (
  <div className={styles.wrap}>
    <div className={styles.label}>
      <div className={styles.img}>
        <img src={icons[name]} alt={name} />
      </div>
      <span>
        {name}
      </span>
    </div>
    <span>{value}</span>
  </div>
);

export default WeatherLine;
