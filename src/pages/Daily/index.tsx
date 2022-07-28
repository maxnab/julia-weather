import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import styles from './styles.module.scss';
import format from 'date-fns/format';
import { weatherCodes, weatherCodesImages } from '../../weatherCodes';
import WeatherLine from '../../components/Block';
import PeriodSelector from '../../components/PeriodSelector';
import Line from '../../components/Line';
import Page from '../../components/wrappers/Page';
import axios from 'axios';
import { closestIndexTo, parseISO } from 'date-fns';
import {
  Cities,
  CurrentWeather,
  HourlyWeather,
  initialCity,
  Option,
  Options,
  Weather,
} from '../../App';

const getCitiesOptions = (cities: Cities): Options =>
  cities.map(({ name, latitude, longitude, country }) => ({
    label: `${name} ${country}`,
    value: `latitude=${latitude}&longitude=${longitude}`,
  }));

const getDataByDay = <T extends unknown>(data: T[], start: number, end: number) =>
  data.slice(start, end);

const Daily = () => {
  const [city, setCity] = useState<Option>(initialCity);
  const [period, setPeriod] = useState<{ start: number; end: number }>({ start: 0, end: 24 });
  const [citiesOptions, setCitiesOptions] = useState<Options>([]);
  const [cityWeather, setCityWeather] = useState<HourlyWeather[]>([]);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>({
    temperature: 0,
    time: '',
    weathercode: 0,
    winddirection: 3,
    windspeed: '',
    humidity: '',
    precipitation: '',
  });

  useEffect(() => {
    axios
      .get<string, Weather>(
        `https://api.open-meteo.com/v1/forecast?${city.value}&hourly=temperature_2m,weathercode&daily=weathercode&timezone=Europe%2FMoscow`,
      )
      .then((res) => {
        if (res) {
          const hourlyWeather = Object.entries(res.data.hourly).map(([key, value]) => ({
            [key]: getDataByDay(value, period.start, period.end),
          }));

          const hourlyWeatherXXX = Object.assign(...hourlyWeather);
          const dailyWeather = hourlyWeatherXXX.time.map((time, index) => ({
            time: format(new Date(time), 'h:mm'),
            temp: hourlyWeatherXXX.temperature_2m[index],
            code: hourlyWeatherXXX.weathercode[index],
          }));

          setCityWeather(dailyWeather);
        }
      });
    axios
      .get<string, { data: { results: Cities } }>(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city.label}`,
      )
      .then((res) => {
        if (res.data.results) {
          setCitiesOptions(getCitiesOptions(res.data.results));
        }
      });
    axios
      .get<
        string,
        {
          data: {
            hourly: {
              time: string[];
              relativehumidity_2m: string[];
              windspeed_10m: string[];
              precipitation: string[];
            };
          };
        }
      >(
        'https://api.open-meteo.com/v1/forecast?latitude=55.7558&longitude=37.6176&hourly=relativehumidity_2m,precipitation,windspeed_10m&current_weather=true',
      )
      .then((res) => {
        console.log('res', res);
        const currentWeatherIdx = closestIndexTo(
          new Date(),
          res.data.hourly.time.map((date) => parseISO(date)),
        );
        if (currentWeatherIdx) {
          setCurrentWeather({
            temperature: 0,
            time: '',
            weathercode: 0,
            winddirection: 3,
            humidity: res.data.hourly.relativehumidity_2m[currentWeatherIdx],
            windspeed: res.data.hourly.windspeed_10m[currentWeatherIdx],
            precipitation: res.data.hourly.precipitation[currentWeatherIdx],
          });
        }
      });
  }, [city.label, city.value, period.start, period.end]);

  const handleCity = (v: string): void => {
    setCity({ label: v, value: '' });
  };

  return (
    <Page>
      <Header citiesOptions={citiesOptions} city={city} handleCity={handleCity} setCity={setCity} />
      <div>
        <div className={styles['current-city']}>
          <span className={styles['current-city-title']}>{city.label}</span>
          <span className={styles['current-city-date']}>{format(Date.now(), 'EEE MMM dd')}</span>
        </div>
        <div className={styles['current-weather']}>
          <img src={weatherCodesImages[currentWeather.weathercode]} alt="sun" />
          <div className={styles['current-weather-info']}>
            <span className={styles['current-weather-info-temperature']}>
              {currentWeather.temperature}
            </span>
            <span className={styles['current-weather-info-code']}>
              {weatherCodes[currentWeather.weathercode]}
            </span>
          </div>
        </div>
        <div>
          <WeatherLine name="wind" value={`${currentWeather.windspeed} km/h`} />
          <WeatherLine name="humidity" value={`${currentWeather.humidity} mm`} />
          <WeatherLine name="rain" value={`${currentWeather.precipitation} mm`} />
        </div>
        <PeriodSelector periods={[24, 48]} setPeriods={setPeriod} />
        <Line weather={cityWeather} />
      </div>
    </Page>
  );
};

export default Daily;
