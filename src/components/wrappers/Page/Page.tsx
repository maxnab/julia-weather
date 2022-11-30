import type { FC, ReactNode } from 'react';
import { getColor } from '../../../functions/getColor';
import styles from './Page.module.scss';
import { Loader } from '../../Loader/Loader';

interface Props {
  children: ReactNode;
  isLoading: boolean;
  temperature?: number;
  onSwipeLeftButton?: () => void;
  onSwipeRightButton?: () => void;
}

const Page: FC<Props> = ({
  children,
  isLoading,
  temperature,
  onSwipeLeftButton,
  onSwipeRightButton,
}) => {
  const fromColor = getColor(temperature ?? 25, -30, 40);
  const toColor = getColor(temperature ?? 25, -10, 10);

  const gradient = `linear-gradient(180deg, rgba(${fromColor.r}, ${fromColor.g}, ${fromColor.b}, 50) 0%, rgba(${toColor.r}, ${toColor.g}, ${toColor.b}, 1) 100%)`;

  const backgroundStyle = { background: gradient };

  return (
    <div
      className={styles.wrap}
      style={backgroundStyle}
    >
      {onSwipeLeftButton ? (
        <button type="button" className={styles.arrow} onClick={onSwipeLeftButton}>
          <img src="assets/icons/arrow-left-circle.svg" alt="arrow left" />
        </button>
      ) : <div />}
      {isLoading ? <Loader /> : children}
      {onSwipeRightButton ? (
        <button type="button" className={styles.arrow} onClick={onSwipeRightButton}>
          <img src="assets/icons/arrow-right-circle.svg" alt="arrow right" />
        </button>
      ) : <div />}
    </div>
  );
};

export { Page };
