import type { IResponse } from './iResponse';

interface IWeather {
    name: string;
    main: {
        feels_like: number;
        grnd_level: number;
        humidity: number;
        pressure: number;
        sea_level: number;
        temp: number;
        temp_max: number;
        temp_min: number;
    };
    weather: [
        {
            description: string;
            icon: string;
            id: number;
            main:string
        }
    ];
    wind: {
        deg: number;
        gust: number;
        speed: number;
    };
    clouds: {
        all: number;
    }
}

type ICurrentWeatherResponse = IResponse<IWeather>

export type { ICurrentWeatherResponse };
