import type { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getColor } from '../../functions/getColor';
import { Tooltip } from '../Tooltip/Tooltip';
import type { IPage } from '../../types/interfaces/iPage';
import styles from './Header.module.scss';

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
        <img src="assets/icons/search.svg" alt="search" />
      </button>
      <ul className={styles.pagination}>
        {pages.map((page) => (
          <li key={page.name} className={getDotClassName(page.name)} />
        ))}
      </ul>
      <button type="button">
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
          <img src="assets/icons/menu.svg" alt="menu" />
        </Tooltip>
      </button>
    </header>
  );
};

export { Header };
