import React from 'react';
import type { FC, ReactNode } from 'react';
import { getColor } from '../../../functions/getColor';
import styles from './Page.module.scss';

interface Props {
  children: ReactNode;
  temperature?: number;
}

const Page: FC<Props> = ({ children, temperature }) => {
  const color = getColor(temperature ?? 25, -30, 40);
  const color2 = getColor(temperature ?? 25, -10, 10);

  const gradient = `linear-gradient(180deg, rgba(${color.r}, ${color.g}, ${color.b}, 50) 0%, rgba(${color2.r}, ${color2.g}, ${color2.b}, 1) 100%)`;

  return (
    <div
      className={styles.wrap}
      style={{ background: gradient }}
    >
      {children}
    </div>
  );
};

export { Page };
