import React, { FC, ReactNode } from 'react';
import styles from './Button.module.scss';

interface Props {
    children: ReactNode
}

const Button: FC<Props> = ({ children }) => (
  <div className={styles.wrap}>
    {children}
  </div>
);

export { Button };
