import type { FC } from 'react';
import './reset.css';
import './main.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import { Pages } from './pages/Pages';

const App: FC = () => (
  <ErrorBoundary>
    <Routes>
      <Route
        path="/app"
        element={
          <Pages />
      }
      />
      <Route path="*" element={<Navigate to="/app?currentPage=daily" replace />} />
    </Routes>
  </ErrorBoundary>
);

export { App };
