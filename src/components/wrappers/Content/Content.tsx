import React, { FC, ReactNode } from 'react';
import styles from './Content.module.scss';

interface Props {
    children: ReactNode;
}

const Content: FC<Props> = ({ children }) => (
  <div className={styles.wrap}>{children}</div>
);

export { Content };
