import type { RefObject } from 'react';
import type { ICoords } from './iCoords';
import type { ICurrentWeather } from './iCurrentWeather';

interface IPagesProps {
    onCitySelect: (coords: ICoords) => void;
    ref: RefObject<HTMLDivElement>;
    coords?: ICoords;
    city?: string;
    currentWeather?: ICurrentWeather;
    onSwipeLeftButton?: () => void;
    onSwipeRightButton?: () => void;
  }

export type { IPagesProps };
