import React from 'react';
import styles from './styles.module.scss';
import { weatherCodes, weatherCodesImages } from '../../weatherCodes';
import windIcon from '../../assets/icons/wind.svg';
import rainIcon from '../../assets/icons/umbrella.svg';
import humidityIcon from '../../assets/icons/humidity.svg';
import Page from '../../components/wrappers/Page';

const tomorrowStatus = [
  {
    name: 'rain',
    icon: rainIcon,
  },
  {
    name: 'wind',
    icon: windIcon,
  },
  {
    name: 'humidity',
    icon: humidityIcon,
  },
];

const Week = () => {
  return (
    <Page>
      <div className={styles.tomorrow}>
        <div className={styles['tomorrow-top']}>
          <h3>Tomorrow</h3>
          <div className={styles['tomorrow-top-degrees']}>
            <span>22</span>
            <img src={weatherCodesImages[0]} alt={weatherCodes[0]} />
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
    </Page>
  );
};

export default Week;
