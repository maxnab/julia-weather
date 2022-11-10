import React, { FC } from 'react';
import './reset.css';
import './main.css';
import { Route, Routes } from 'react-router-dom';
import { Pages } from './pages/Pages';

// var hue = 30 + 240 * (30 - t) / 60
// var F = function(t)
// {
//   // Map the temperature to a 0-1 range
//   var a = (t + 30)/60;
//   a = (a < 0) ? 0 : ((a > 1) ? 1 : a);

//   // Scrunch the green/cyan range in the middle
//   var sign = (a < .5) ? -1 : 1;
//   a = sign * Math.pow(2 * Math.abs(a - .5), .35)/2 + .5;

//   // Linear interpolation between the cold and hot
//   var h0 = 259;
//   var h1 = 12;
//   var h = (h0) * (1 - a) + (h1) * (a);

//   return pusher.color("hsv", h, 75, 90).hex6();
// };
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
