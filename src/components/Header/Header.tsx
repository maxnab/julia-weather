import React, { FC } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import searchIcon from '../../assets/icons/search.svg';
import menuIcon from '../../assets/icons/menu.svg';
import styles from './Header.module.scss';
import { getColor } from '../../functions/getColor';
import { IPage } from '../../types/interfaces/iPage';

interface Props {
  temperature?: number;
  pages: IPage[];
  onSearchClick: () => void;
}

const Header: FC<Props> = ({ pages, onSearchClick, temperature }) => {
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

  const color = getColor(temperature ?? 25, -30, 40);

  return (
    <div className={styles.wrap} style={{ background: `rgba(${color.r}, ${color.g}, ${color.b}, 100)` }}>
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
