import React, { FC, useState, useRef, TouchEvent, useEffect, CSSProperties } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Page } from '../components/wrappers/Page/Page';
import { Header } from '../components/Header/Header';
import { pages } from './pagesVariables';
import type { ICoords } from '../types/interfaces/iCoords';
import styles from './Pages.module.scss';
import { ICurrentWeather } from '../types/interfaces/iCurrentWeather';
import { IOption } from '../types/interfaces/iOption';

const Pages: FC = () => {
  const [city, setCity] = useState<IOption | undefined>(undefined);
  const [currentWeather, setCurrentWeather] = useState<ICurrentWeather | undefined>(undefined);
  const [coords, setCoords] = useState<ICoords | undefined>(undefined);
  const [transition, setTransiton] = useState<number>(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get('currentPage');

  const swipeRef = useRef<number | null>(null);
  const disableSwipeRef = useRef<HTMLDivElement>(null);

  console.log('s', disableSwipeRef.current?.id);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        const { latitude, longitude } = location.coords;
        setCoords({ latitude, longitude, cityName: '' });
      });
    }
  }, []);

  useEffect(() => {
    if (!coords) return;
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
  }, [coords?.latitude, coords?.longitude]);

  useEffect(() => {
    switch (currentPage) {
      case 'search':
        setTransiton(100);
        break;

      case 'daily':
        setTransiton(0);
        break;

      case 'webcams':
        setTransiton(-100);
        break;

      default:
        break;
    }
  }, [currentPage]);

  const onTouchStart = (e: TouchEvent<HTMLDivElement>): void => {
    swipeRef.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>): void => {
    const swipeEndPosition = e.changedTouches[0].clientX;
    const scrollLeft = swipeRef.current && swipeRef.current - swipeEndPosition >= 150;
    const scrollRight = swipeRef.current && swipeRef.current - swipeEndPosition <= -150;

    const isScrollRightAvailable = scrollLeft && transition !== pages.at(-1)?.position
     && !disableSwipeRef.current?.contains(e.target);

    const isScrollLeftAvailable = scrollRight && transition !== pages.at(0)?.position && !disableSwipeRef.current?.contains(e.target);

    if (isScrollRightAvailable) {
      swipeRef.current = 0;

      setTransiton((prev) => {
        const swipeValue = prev - 100;

        setSearchParams(`currentPage=${pages.find((page) => page.position === swipeValue)?.name}`);
        return swipeValue;
      });
    }

    if (isScrollLeftAvailable) {
      swipeRef.current = 0;

      setTransiton((prev) => {
        const swipeValue = prev + 100;

        setSearchParams(`currentPage=${pages.find((page) => page.position === swipeValue)?.name}`);
        return swipeValue;
      });
    }
  };

  const selectCity = (cityCoords: ICoords) => {
    setCoords(cityCoords);
  };

  const swipeToSearchPage = () => {
    setSearchParams('currentPage=search');
    setTransiton(100);
  };

  const transitionStyle: CSSProperties = {
    transform: `translate(${transition}vw)`,
    transition: 'all .300s ease-in',
  };

  const pagePositionStyle = (position: number): CSSProperties => ({ right: `${position}vw` });

  return (
    <div>
      <Header pages={pages} onSearchClick={swipeToSearchPage} temperature={currentWeather?.temp} />
      <div
        className={styles.wrap}
        style={transitionStyle}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {
          pages.map((page) => (
            <div className={styles.page} style={pagePositionStyle(page.position)}>
              {page.component({
                coords,
                city,
                currentWeather,
                onCitySelect: selectCity,
                ref: disableSwipeRef,
              })}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export { Pages };
