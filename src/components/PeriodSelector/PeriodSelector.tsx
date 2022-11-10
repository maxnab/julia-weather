import React from 'react';
import type { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './PeriodSelector.module.scss';

const PeriodSelector: FC = () => {
  const [_, setSearchParams] = useSearchParams();

  const navigateToWeeklyPage = (): void => {
    setSearchParams('currentPage=weekly');
  };

  return (
    <div className={styles.wrap}>
      <div>
        <span>Next 24 hours</span>
      </div>
      <div>
        <button type="button" onClick={navigateToWeeklyPage}>Next 7 days</button>
      </div>
    </div>
  );
};

export { PeriodSelector };
