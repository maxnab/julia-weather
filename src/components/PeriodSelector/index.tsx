import React, { FC, SetStateAction } from 'react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const hoursToPeriod: { [k: number]: string } = {
  24: 'Today',
  48: 'Tomorrow',
};

interface Props {
  periods: number[];
  setPeriods: (period: SetStateAction<{ start: number; end: number }>) => void;
}

const PeriodSelector: FC<Props> = ({ periods, setPeriods }) => {
  const handlePeriod = (period: number): void => {
    setPeriods({ start: period - 24, end: period });
  };

  return (
    <div className={styles.wrap}>
      <div>
        {periods.map((period) => (
          <button type="button" className={styles.button} onClick={() => handlePeriod(period)}>
            {hoursToPeriod[period]}
          </button>
        ))}
      </div>
      <div>
        <Link to="/week">Next 7 days</Link>
      </div>
    </div>
  );
};

export default PeriodSelector;
