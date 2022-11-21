import React, { ReactNode, useState, FC } from 'react';
import cn from 'classnames';
import styles from './Tooltip.module.scss';

interface Props {
    children: ReactNode;
    content: ReactNode | string;
    direction?: 'top' | 'left' | 'bottom' | 'right' | 'left-bottom';
    delay?: number;
}

const Tooltip: FC<Props> = ({ children, content, direction = 'bottom', delay = 500 }) => {
  let timeout: ReturnType<typeof setTimeout>;

  const [active, setActive] = useState(false);

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  const toolTipClassName = cn(styles.tip, styles[direction]);

  return (
    <div
      className={styles.wrap}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active ? (
        <div className={toolTipClassName}>
          {content}
        </div>
      ) : null}
    </div>
  );
};

export { Tooltip };
