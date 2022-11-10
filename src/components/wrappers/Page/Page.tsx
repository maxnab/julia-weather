import React from 'react';
import type { FC, ReactNode } from 'react';
import styles from './Page.module.scss';

interface Props {
  children: ReactNode;
}

const Page: FC<Props> = ({ children }) => (
  <div className={styles.wrap}>
    {children}
  </div>
);

export { Page };
