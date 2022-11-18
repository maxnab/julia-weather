interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
    day: { icon: string, description: string };
  }

export type { IWeather };
