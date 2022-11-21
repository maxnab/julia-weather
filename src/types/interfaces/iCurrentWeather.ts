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
    id: number;
    main:string
    deg: number;
    gust: number;
    speed: number;
    clouds: number;
}

export type { ICurrentWeather };
