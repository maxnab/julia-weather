import React, { FC, useState, useRef, TouchEvent, useEffect, CSSProperties } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { pages } from './pagesVariables';
import type { ICoords } from '../types/interfaces/iCoords';
import type { ICurrentWeather } from '../types/interfaces/iCurrentWeather';
import styles from './Pages.module.scss';
import { PagePosition } from '../types/enums/swipeDirection';
import { api } from '../api/mainApi';

const Pages: FC = () => {
  const [city, setCity] = useState<string>('');
  const [currentWeather, setCurrentWeather] = useState<ICurrentWeather | undefined>(undefined);
  const [coords, setCoords] = useState<ICoords | undefined>(undefined);
  const [transition, setTransiton] = useState<number>(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get('currentPage');

  const swipeRef = useRef<number | null>(null);
  const disableSwipeRef = useRef<HTMLDivElement>(null);

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

    const fetchData = async () => {
      const [name, weather] = await api.getWeather(coords.latitude, coords.longitude);
      setCity(name);
      setCurrentWeather(weather);
    };

    fetchData();
  }, [coords?.latitude, coords?.longitude]);

  useEffect(() => {
    switch (currentPage) {
      case 'search':
        setTransiton(PagePosition.LEFT);
        break;

      case 'daily':
        setTransiton(PagePosition.CENTER);
        break;

      case 'webcams':
        setTransiton(PagePosition.RIGHT);
        break;

      default:
        break;
    }
  }, [currentPage]);

  const swipeRight = (): void => {
    swipeRef.current = 0;

    setTransiton((prev) => {
      const swipeValue = prev - 100;

      setSearchParams(`currentPage=${pages.find((page) => page.position === swipeValue)?.name}`);
      return swipeValue;
    });
  };

  const swipeLeft = (): void => {
    swipeRef.current = 0;

    setTransiton((prev) => {
      const swipeValue = prev + 100;

      setSearchParams(`currentPage=${pages.find((page) => page.position === swipeValue)?.name}`);
      return swipeValue;
    });
  };

  const onTouchStart = (e: TouchEvent<HTMLDivElement>): void => {
    swipeRef.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = (e: TouchEvent<HTMLDivElement>): void => {
    const swipeEndPosition = e.changedTouches[0].clientX;
    const scrollLeft = swipeRef.current && swipeRef.current - swipeEndPosition >= 150;
    const scrollRight = swipeRef.current && swipeRef.current - swipeEndPosition <= -150;

    const isScrollRightAvailable = scrollLeft && transition !== pages.at(-1)?.position
     && !disableSwipeRef.current?.contains(e.target as HTMLDivElement);

    const isScrollLeftAvailable = scrollRight
    && transition !== pages.at(0)?.position
    && !disableSwipeRef.current?.contains(e.target as HTMLDivElement);

    if (isScrollRightAvailable) {
      swipeRight();
    }

    if (isScrollLeftAvailable) {
      swipeLeft();
    }
  };

  const selectCity = (cityCoords: ICoords) => {
    setCoords(cityCoords);
  };

  const swipeToSearchPage = () => {
    setSearchParams('currentPage=search');
    setTransiton(PagePosition.LEFT);
  };

  const transitionStyle: CSSProperties = {
    transform: `translate(${transition}vw)`,
    transition: 'all .300s ease-in',
  };

  const pagePositionStyle = (position: number): CSSProperties => ({ right: `${position}vw` });

  return (
    <div>
      <Header pages={pages} onSearchClick={swipeToSearchPage} temperature={currentWeather?.temp} />
      <main
        className={styles.wrap}
        style={transitionStyle}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {
          pages.map((page) => (
            <section className={styles.page} style={pagePositionStyle(page.position)}>
              {page.component({
                coords,
                city,
                currentWeather,
                onCitySelect: selectCity,
                ref: disableSwipeRef,
                onSwipeLeftButton: swipeLeft,
                onSwipeRightButton: swipeRight,
              })}
            </section>
          ))
        }
      </main>
    </div>
  );
};

export { Pages };
