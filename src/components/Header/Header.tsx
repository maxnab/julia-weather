import React, { FC } from 'react';
import cn from 'classnames';
import searchIcon from '../../assets/icons/search.svg';
import menuIcon from '../../assets/icons/menu.svg';
import styles from './Header.module.scss';

const Header: FC = () => (
  <div className={styles.wrap}>
    <button type="button">
      <img src={searchIcon} alt="search" />
    </button>
    <ul className={styles.pagination}>
      <li className={cn(styles.dot, styles['dot-expanded'])} />
      <li className={styles.dot} />
    </ul>
    <button type="button">
      <img src={menuIcon} alt="menu" />
    </button>
  </div>
);
export default Header;
