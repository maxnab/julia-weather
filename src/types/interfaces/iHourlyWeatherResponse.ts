import type { IHourlyWeather } from './iHourlyWeather';
import type { IResponse } from './iResponse';

type IHourlyWeatherResponse = IResponse<{ list: IHourlyWeather[] }>

export type { IHourlyWeatherResponse };
