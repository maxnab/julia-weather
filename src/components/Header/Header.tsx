import React, { FC } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import searchIcon from '../../assets/icons/search.svg';
import menuIcon from '../../assets/icons/menu.svg';
import styles from './Header.module.scss';
import { IPage } from '../../pages/Pages';

enum Page {
  DAILY = 'daily',
  WEEKLY = 'weekly'
}

interface Props {
  pages: IPage[];
  onSearchClick: () => void;
}

const Header: FC<Props> = ({ pages, onSearchClick }) => {
  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get('currentPage');

  const getDotClassName = (pageName: string) => cn(
    styles.dot,
    {
      [styles['dot-expanded']]: pageName === currentPage,
    },
    {
      [styles['dot-collapsed']]: pageName !== currentPage,
    },
  );

  return (
    <div className={styles.wrap}>
      <button type="button" onClick={onSearchClick}>
        <img src={searchIcon} alt="search" />
      </button>
      <ul className={styles.pagination}>
        {pages.map((page) => (
          <li key={page.name} className={getDotClassName(page.name)} />
        ))}
      </ul>
      <button type="button">
        <img src={menuIcon} alt="menu" />
      </button>
    </div>
  );
};

export { Header };
