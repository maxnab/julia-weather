import type { ICoords } from './iCoords';
import type { ICurrentWeather } from './iCurrentWeather';
import type { IOption } from './iOption';

interface IPagesProps {
    onCitySelect: (coords: ICoords) => void;
    coords?: ICoords;
    city?: IOption;
    currentWeather?: ICurrentWeather;
  }

export type { IPagesProps };
