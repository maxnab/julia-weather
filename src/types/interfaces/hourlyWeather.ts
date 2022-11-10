import type { Clouds } from './clouds';
import type { MainWeather } from './mainWeather';
import type { Sys } from './sys';
import type { Weather } from './weather';
import type { Wind } from './wind';

interface HourlyWeather {
    id: number;
    dt: number;
    main: MainWeather;
    weather: Weather[];
    clouds: Clouds;
    wind: Wind;
    visibility: number;
    pop: number;
    sys: Sys;
    dt_txt: string;
  }

export type { HourlyWeather };
