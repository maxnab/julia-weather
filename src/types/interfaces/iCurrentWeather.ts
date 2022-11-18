interface ICurrentWeather {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
    description: string;
    icon: string;
    speed: string;
    precipitation: string;
    clouds: string;
}

export type { ICurrentWeather };
