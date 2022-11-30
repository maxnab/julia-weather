import type { FC, ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary, FallbackProps } from 'react-error-boundary';
import styles from './ErrorBoundary.module.scss';

interface Props {
    children: ReactNode;
}

const ErrorFallback: FC<FallbackProps> = ({ error }) => (
  <div role="alert" className={styles.error}>
    <span>
      Oops, error here!
    </span>
    <p>{error.message}</p>
  </div>
);

const ErrorBoundary: FC<Props> = ({ children }) => (
  <ReactErrorBoundary FallbackComponent={ErrorFallback}>
    {children}
  </ReactErrorBoundary>
);

export { ErrorBoundary };
