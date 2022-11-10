import React, { FC } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import searchIcon from '../../assets/icons/search.svg';
import menuIcon from '../../assets/icons/menu.svg';
import styles from './Header.module.scss';

enum Page {
  DAILY = 'daily',
  WEEKLY = 'weekly'
}

const Header: FC = () => {
  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get('currentPage');

  const dailyMenuItemClassName = cn(styles.dot, { [styles['dot-expanded']]: Page.DAILY === currentPage }, { [styles['dot-collapsed']]: Page.WEEKLY === currentPage });

  const weeklyMenuItemClassName = cn(styles.dot, { [styles['dot-expanded']]: Page.WEEKLY === currentPage }, { [styles['dot-collapsed']]: Page.DAILY === currentPage });

  return (
    <div className={styles.wrap}>
      <button type="button">
        <img src={searchIcon} alt="search" />
      </button>
      <ul className={styles.pagination}>
        <li className={dailyMenuItemClassName} />
        <li className={weeklyMenuItemClassName} />
      </ul>
      <button type="button">
        <img src={menuIcon} alt="menu" />
      </button>
    </div>
  );
};
export { Header };
