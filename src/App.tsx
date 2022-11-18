import React, { FC } from 'react';
import './reset.css';
import './main.css';
import { Route, Routes } from 'react-router-dom';
import { Pages } from './pages/Pages';

const App: FC = () => (
  <Routes>
    <Route
      path="/app"
      element={
        <Pages />
    }
    />
  </Routes>
);

export { App };
