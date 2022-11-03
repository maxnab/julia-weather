import React from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './PeriodSelector.module.scss';

const PeriodSelector: FC = () => (
  <div className={styles.wrap}>
    <div>
      <span>Next 24 hours</span>
    </div>
    <div>
      <Link to="/week">Next 7 days</Link>
    </div>
  </div>
);

export default PeriodSelector;
