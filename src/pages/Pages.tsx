import React, { FC, useState, useRef, TouchEvent, useEffect, CSSProperties, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SwipeDirection } from '../types/enums/swipeDirection';
import { Coords } from '../types/interfaces/coords';
import { Webcams } from './Webcams/Webcams';
import { Daily } from '../pages/Daily/Daily';
import { Page } from '../components/wrappers/Page/Page';
import { Header } from '../components/Header/Header';
import styles from './Pages.module.scss';
import { Search } from './Search/Search';

interface PagesProps {
  onCitySelect: (coords: Coords) => void;
  coords?: Coords;
}

export interface IPage {
  name: string;
  position: number;
  component: (props: PagesProps) => ReactNode;
}

const pages: IPage[] = [
  {
    name: 'search',
    position: 100,
    component: (props) => <Search onCitySelect={props.onCitySelect} />,
  },
  {
    name: 'daily',
    position: 0,
    component: (props) => <Daily coords={props.coords} />,
  },
  {
    name: 'webcams',
    position: -100,
    component: (props) => <Webcams coords={props.coords} />,
  },
];

const Pages: FC = () => {
  const [coords, setCoords] = useState<Coords | undefined>(undefined);
  const [transition, setTransiton] = useState<number>(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get('currentPage');

  const swipeRef = useRef<number | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        const { latitude, longitude } = location.coords;
        setCoords({ latitude, longitude, cityName: '' });
      });
    }
  }, []);

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

    if (scrollLeft && transition !== pages.at(-1)?.position) {
      swipeRef.current = 0;

      setTransiton((prev) => {
        const swipeValue = prev - 100;

        setSearchParams(`currentPage=${pages.find((page) => page.position === swipeValue)?.name}`);
        return swipeValue;
      });
    }

    if (scrollRight && transition !== pages.at(0)?.position) {
      swipeRef.current = 0;

      setTransiton((prev) => {
        const swipeValue = prev + 100;

        setSearchParams(`currentPage=${pages.find((page) => page.position === swipeValue)?.name}`);
        return swipeValue;
      });
    }
  };

  const selectCity = (cityCoords: Coords) => {
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
      <Header pages={pages} onSearchClick={swipeToSearchPage} />
      <div
        className={styles.wrap}
        style={transitionStyle}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {
          pages.map((page) => (
            <div className={styles.page} style={pagePositionStyle(page.position)}>
              <Page>
                {page.component({ coords, onCitySelect: selectCity })}
              </Page>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export { Pages };
