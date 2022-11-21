import React, { FC } from 'react';
import styles from './Block.module.scss';

interface Props {
  name: 'cloud' | 'humidity' | 'wind';
  value: string;
}

const WeatherLine: FC<Props> = ({ name, value }) => (
  <div className={styles.wrap}>
    <div className={styles.label}>
      <div className={styles.img}>
        <img src={`assets/icons/${name}.svg`} alt={name} />
      </div>
      <span>
        {name}
      </span>
    </div>
    <span>{value}</span>
  </div>
);

export { WeatherLine };
