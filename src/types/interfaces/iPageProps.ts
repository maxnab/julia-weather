import { RefObject } from 'react';
import type { ICoords } from './iCoords';
import type { ICurrentWeather } from './iCurrentWeather';
import type { IOption } from './iOption';

interface IPagesProps {
    onCitySelect: (coords: ICoords) => void;
    ref: RefObject<HTMLDivElement>;
    coords?: ICoords;
    city?: IOption;
    currentWeather?: ICurrentWeather;
    onSwipeLeftButton?: () => void;
    onSwipeRightButton?: () => void;
  }

export type { IPagesProps };
