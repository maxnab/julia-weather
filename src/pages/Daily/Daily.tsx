import { forwardRef, useEffect, useState } from 'react';
import format from 'date-fns/format';
import { api } from '@api';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import { Content } from '../../components/wrappers/Content/Content';
import { Page } from '../../components/wrappers/Page/Page';
import { WeatherLine } from '../../components/Block/Block';
import { PeriodSelector } from '../../components/PeriodSelector/PeriodSelector';
import { Line } from '../../components/Line/Line';
import { units } from '../../variables/units';
import type { IHourlyWeather } from '../../types/interfaces/iHourlyWeather';
import type { ICurrentWeather } from '../../types/interfaces/iCurrentWeather';
import type { ICoords } from '../../types/interfaces/iCoords';
import styles from './Daily.module.scss';

const selectedUnit = 'metric';

interface Props {
  isLoading: boolean;
  currentWeather?: ICurrentWeather;
  city?: string;
  coords?: ICoords;
  onSwipeLeftButton?: () => void;
  onSwipeRightButton?: () => void;
}

const Daily = forwardRef<HTMLDivElement, Props>(({
  isLoading,
  coords,
  city,
  currentWeather,
  onSwipeLeftButton,
  onSwipeRightButton,
}, ref) => {
  const [cityWeather, setCityWeather] = useState<IHourlyWeather[]>([]);

  useEffect(() => {
    if (!coords) return;

    const fetchData = async () => {
      const weatherByPeriod = await api.getForecast(coords.latitude, coords.longitude);
      setCityWeather(weatherByPeriod);
    };

    fetchData();
  }, [coords?.latitude, coords?.longitude]);

  if (!currentWeather) return null;
  if (!city) return null;

  return (
    <Page
      isLoading={isLoading}
      temperature={currentWeather.temp}
      onSwipeLeftButton={onSwipeLeftButton}
      onSwipeRightButton={onSwipeRightButton}
    >
      <Content>
        <div className={styles['current-city']}>
          <span className={styles['current-city-title']}>{city}</span>
          <span className={styles['current-city-date']}>{format(Date.now(), 'EEE MMM dd')}</span>
        </div>
        <div className={styles['current-weather']}>
          <img src={`assets/weather_icons/${currentWeather.icon}.png`} alt={currentWeather.description} />
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
          <WeatherLine name="cloud" value={`${currentWeather.clouds} ${units[selectedUnit].clouds}`} />
        </div>
        <PeriodSelector />
        <Line ref={ref} weather={cityWeather} />
      </Content>
    </Page>
  );
});

export { Daily };
