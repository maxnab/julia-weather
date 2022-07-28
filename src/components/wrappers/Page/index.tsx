import React, { FC, ReactNode } from 'react';
import styles from './styles.module.scss';

interface Props {
  children: ReactNode;
}

const Page: FC<Props> = ({ children }) => {
  return <div className={styles.wrap}>{children}</div>;
};

export default Page;
