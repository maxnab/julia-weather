import React from 'react';
import styles from './Week.module.scss';
import windIcon from '../../assets/icons/wind.svg';
import humidityIcon from '../../assets/icons/humidity.svg';

const tomorrowStatus = [
  {
    name: 'wind',
    icon: windIcon,
  },
  {
    name: 'humidity',
    icon: humidityIcon,
  },
];

const Week = () => (
  <div className={styles.tomorrow}>
    <div className={styles['tomorrow-top']}>
      <h3>Tomorrow</h3>
      <div className={styles['tomorrow-top-degrees']}>
        <span>22</span>
        {/* <img src={weatherCodesImages[0]} alt={weatherCodes[0]} /> */}
      </div>
    </div>
    <div className={styles['tomorrow-bottom']}>
      {tomorrowStatus.map((status) => (
        <div key={status.name} className={styles['tomorrow-bottom-icon']}>
          <img src={status.icon} alt={status.name} />
          <span>info</span>
        </div>
      ))}
    </div>
  </div>
);

export default Week;
