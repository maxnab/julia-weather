import React, { useEffect, useState } from 'react';
import format from 'date-fns/format';
import axios from 'axios';
import styles from './Daily.module.scss';
import WeatherLine from '../../components/Block/Block';
import PeriodSelector from '../../components/PeriodSelector/PeriodSelector';
import Line from '../../components/Line/Line';
import { CurrentWeather, HourlyWeather, initialCity, Option } from '../../App';
import { units } from '../../units';

interface Coords {
  latitude: number;
  longitude: number;
  cityName: string;
}

const initialWeather = {
  feels_like: 0,
  grnd_level: 0,
  humidity: 0,
  pressure: 0,
  sea_level: 0,
  temp: 0,
  temp_max: 0,
  temp_min: 0,
  description: '',
  icon: '',
  speed: '',
  precipitation: '',
  clouds: '',
};

const initialCoords = { latitude: -0, longitude: -0, cityName: '' };

const selectedUnit = 'metric';

const Daily = () => {
  const [city, setCity] = useState<Option>(initialCity);

  // eslint-disable-next-line no-unused-vars
  const [coords, setCoords] = useState<Coords>(initialCoords);
  const [cityWeather, setCityWeather] = useState<HourlyWeather[]>([]);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather>(initialWeather);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        const { latitude, longitude } = location.coords;
        setCoords({ latitude, longitude, cityName: '' });
      });
    }
  }, []);

  useEffect(() => {
    axios
      .get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat: coords.latitude,
          lon: coords.longitude,
          units: 'metric',
          appid: '7eec0e6761b704245b20f20fb368b214',
        },
      })
      .then(({ data }) => {
        setCity({ label: data.name, value: data.name });
        setCurrentWeather({
          ...data.main, ...data.weather[0], ...data.wind, clouds: data.clouds.all,
        });
      });

    axios
      .get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
          lat: coords.latitude,
          lon: coords.longitude,
          units: 'metric',
          appid: '7eec0e6761b704245b20f20fb368b214',
        },
      })
      .then(({ data }) => {
        const weatherByPeriod = data.list.slice(0, 8);
        setCityWeather(weatherByPeriod);
      });
  }, [coords.latitude, coords.longitude]);

  return (
    <div>
      <div className={styles['current-city']}>
        <span className={styles['current-city-title']}>{city.label}</span>
        <span className={styles['current-city-date']}>{format(Date.now(), 'EEE MMM dd')}</span>
      </div>
      <div className={styles['current-weather']}>
        <img src={`/src/assets/weather_icons/${currentWeather.icon}.png`} alt={currentWeather.description} />
        <div className={styles['current-weather-info']}>
          <span className={styles['current-weather-info-temperature']}>
            {Math.round(currentWeather.temp)}
            <span className={styles['current-weather-info-temperature-mark']}>° C</span>
          </span>
          <span className={styles['current-weather-info-code']}>
            {currentWeather.description}
          </span>
        </div>
      </div>
      <div>
        <WeatherLine name="wind" value={`${currentWeather.speed} ${units[selectedUnit].wind}`} />
        <WeatherLine name="humidity" value={`${currentWeather.humidity} ${units[selectedUnit].humidity}`} />
        <WeatherLine name="clouds" value={`${currentWeather.clouds} ${units[selectedUnit].clouds}`} />
      </div>
      <PeriodSelector />
      <Line weather={cityWeather} />
    </div>
  );
};

export default Daily;
