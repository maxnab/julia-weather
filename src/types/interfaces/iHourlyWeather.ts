import type { IClouds } from './iClouds';
import type { IMainWeather } from './iMainWeather';
import type { ISys } from './iSys';
import type { IWeather } from './iWeather';
import type { IWind } from './iWind';

interface IHourlyWeather {
    id: number;
    dt: number;
    main: IMainWeather;
    weather: IWeather[];
    clouds: IClouds;
    wind: IWind;
    visibility: number;
    pop: number;
    sys: ISys;
    dt_txt: string;
  }

export type { IHourlyWeather };
