import React, { FC, forwardRef, useEffect, useState } from 'react';
import format from 'date-fns/format';
import axios from 'axios';
import styles from './Daily.module.scss';
import { WeatherLine } from '../../components/Block/Block';
import { PeriodSelector } from '../../components/PeriodSelector/PeriodSelector';
import { Line } from '../../components/Line/Line';
import { units } from '../../variables/units';
import type { IOption } from '../../types/interfaces/iOption';
import type { IHourlyWeather } from '../../types/interfaces/iHourlyWeather';
import type { ICurrentWeather } from '../../types/interfaces/iCurrentWeather';
import type { ICoords } from '../../types/interfaces/iCoords';
import { Content } from '../../components/wrappers/Content/Content';
import { Page } from '../../components/wrappers/Page/Page';

const selectedUnit = 'metric';

interface Props {
  currentWeather?: ICurrentWeather;
  city?: IOption;
  coords?: ICoords;
  onSwipeLeftButton?: () => void;
  onSwipeRightButton?: () => void;
}

const Daily = forwardRef<HTMLDivElement, Props>(({
  coords,
  city,
  currentWeather,
  onSwipeLeftButton,
  onSwipeRightButton,
}, ref) => {
  const [cityWeather, setCityWeather] = useState<IHourlyWeather[]>([]);

  useEffect(() => {
    if (!coords) return;

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
  }, [coords?.latitude, coords?.longitude]);

  if (!currentWeather) return null;
  if (!city) return null;

  return (
    <Page
      temperature={currentWeather.temp}
      onSwipeLeftButton={onSwipeLeftButton}
      onSwipeRightButton={onSwipeRightButton}
    >
      <Content>
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
        <Line ref={ref} weather={cityWeather} />
      </Content>
    </Page>
  );
});

export { Daily };
