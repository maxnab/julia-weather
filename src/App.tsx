import React, { FC, useEffect, useState } from 'react';
import './reset.css';
import './main.css';
import axios from 'axios';
import format from 'date-fns/format';
import styles from './App.module.scss';
import { weatherCodes, weatherCodesImages } from './weatherCodes';
import WeatherLine from './components/Block';
import { closestIndexTo, parseISO } from 'date-fns';
import Line from './components/Line';
import PeriodSelector from './components/PeriodSelector';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Week from './pages/Week';
import Page from './components/wrappers/Page';
import Daily from './pages/Daily';

export interface Option {
  label: string;
  value: string;
}

export type Options = Option[];

export interface City {
  admin1: string;
  admin1_id: number;
  country: string;
  country_code: string;
  country_id: number;
  elevation: number;
  feature_code: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  ranking: number;
  timezone: string;
}

export type Cities = City[];

export interface HourlyWeather {
  code: number;
  temp: number;
  time: string;
}

export interface Weather {
  data: {
    hourly: HourlyWeather;
  };
}

export const initialCity = {
  label: 'Moscow',
  value: 'latitude=52.52&longitude=13.41',
};

export interface CurrentWeather {
  temperature: number;
  time: string;
  weathercode: number;
  winddirection: 3;
  windspeed: string;
  humidity: string;
  precipitation: string;
}

const App: FC = () => {
  //
  return (
    <Routes>
      <Route path="/" element={<Daily />} />
      <Route path="/week" element={<Week />} />
    </Routes>
  );
};

export default App;
