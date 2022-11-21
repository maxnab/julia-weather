import React, { FC } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import searchIcon from '../../assets/icons/search.svg';
import menuIcon from '../../assets/icons/menu.svg';
import styles from './Header.module.scss';
import { getColor } from '../../functions/getColor';
import { IPage } from '../../types/interfaces/iPage';
import { Tooltip } from '../Tooltip/Tooltip';

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

  const handleSearchClick = (): void => {
    if (currentPage === 'search') return;
    onSearchClick();
  };

  const color = getColor(temperature ?? 25, -30, 40);

  const backgroundStyle = { background: `rgba(${color.r}, ${color.g}, ${color.b}, 100)` };

  return (
    <header className={styles.wrap} style={backgroundStyle}>
      <button type="button" onClick={handleSearchClick}>
        <img src={searchIcon} alt="search" />
      </button>
      <ul className={styles.pagination}>
        {pages.map((page) => (
          <li key={page.name} className={getDotClassName(page.name)} />
        ))}
      </ul>
      <Tooltip
        direction="left-bottom"
        content={(
          <pre>
            Made with love
            <br />
            and named after Julia Sichkareva
            <br />
            ⊂ﾟU┬────┬~
          </pre>
        )}
      >
        <button type="button">
          <img src={menuIcon} alt="menu" />
        </button>
      </Tooltip>
    </header>
  );
};

export { Header };
