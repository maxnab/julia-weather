import type { FC, HTMLProps, ReactNode } from 'react';
import styles from './Button.module.scss';

interface Props extends HTMLProps<HTMLButtonElement> {
    children: ReactNode
}

const Button: FC<Props> = ({ children, onClick, ...restProps }) => (
  <button type="button" className={styles.wrap} onClick={onClick} {...restProps}>
    {children}
  </button>
);

export { Button };
