import React, { FC, useState, useRef, TouchEvent, useEffect } from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SwipeDirection } from '../types/enums/swipeDirection';
import { Coords } from '../types/interfaces/coords';
import { Webcams } from './Webcams/Webcams';
import { Daily } from '../pages/Daily/Daily';
import { Page } from '../components/wrappers/Page/Page';
import { Header } from '../components/Header/Header';
import styles from './Pages.module.scss';

const Pages: FC = () => {
  const [coords, setCoords] = useState<Coords | undefined>(undefined);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get('currentPage');

  const swipeRef = useRef<number | null>(null);
  const [swipe, setSwipe] = useState<number>(-0);

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
      case 'weekly':
        setSwipe(SwipeDirection.LEFT);
        break;

      case 'daily':
        setSwipe(SwipeDirection.RIGHT);
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

    if (scrollLeft) {
      swipeRef.current = 0;
      setSwipe(SwipeDirection.LEFT);
      setSearchParams('currentPage=weekly');
    }

    if (scrollRight) {
      swipeRef.current = 0;
      setSwipe(SwipeDirection.RIGHT);
      setSearchParams('currentPage=daily');
    }
  };

  const swipeClassName: string = cn(
    styles.wrap,
    { [styles.sl]: swipe === SwipeDirection.LEFT },
    { [styles.sr]: swipe === SwipeDirection.RIGHT },
  );

  return (
    <div>
      <Header />
      <div
        className={swipeClassName}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className={styles['first-page']}>
          <Page>
            <Daily coords={coords} />
          </Page>
        </div>
        <div className={styles['second-page']}>
          <Page>
            <Webcams coords={coords} />
          </Page>
        </div>
      </div>
    </div>
  );
};

export { Pages };
