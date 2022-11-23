import React, { FC } from 'react';
import './reset.css';
import './main.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Pages } from './pages/Pages';

const App: FC = () => (
  <Routes>
    <Route
      path="/app"
      element={
        <Pages />
    }
    />
    <Route path="*" element={<Navigate to="/app?currentPage=daily" replace />} />
  </Routes>
);

export { App };
