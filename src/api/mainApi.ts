import axios from 'axios';
import type { ICity } from '../types/interfaces/iCity';
import type { ICityResponse } from '../types/interfaces/iCityResponse';
import type { ICurrentWeather } from '../types/interfaces/iCurrentWeather';
import type { ICurrentWeatherResponse } from '../types/interfaces/iCurrentWeatherResponse';
import type { IHourlyWeather } from '../types/interfaces/iHourlyWeather';
import type { IHourlyWeatherResponse } from '../types/interfaces/iHourlyWeatherResponse';
import type { IAllWebcams, IWebcam } from '../types/interfaces/iWebcam';
import type { IWebcamResponse } from '../types/interfaces/iWebcamResponse';

const { VITE_WINDY_API_KEY, VITE_OPEN_WEATHER_MAP_API_KEY } = process.env;

const geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/search';
const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

const api = {
  getWindyUrl(latitude: number, longitude: number): string {
    return `https://api.windy.com/api/webcams/v2/list/nearby=${latitude},${longitude},15`;
  },

  async getWeather(latitude: number, longitude: number): Promise<[string, ICurrentWeather]> {
    const { data } = await axios
      .get<string, ICurrentWeatherResponse>(openWeatherUrl, {
        params: {
          lat: latitude,
          lon: longitude,
          units: 'metric',
          appid: VITE_OPEN_WEATHER_MAP_API_KEY,
        },
      });

    return [
      data.name,
      {
        ...data.main,
        ...data.weather[0],
        ...data.wind,
        clouds: data.clouds.all,
      },
    ];
  },

  async getForecast(latitude: number, longitude: number): Promise<IHourlyWeather[]> {
    const { data } = await axios
      .get<string, IHourlyWeatherResponse>(forecastUrl, {
        params: {
          lat: latitude,
          lon: longitude,
          units: 'metric',
          appid: VITE_OPEN_WEATHER_MAP_API_KEY,
        },
      });

    const weatherByPeriod = data.list.slice(0, 8);

    return weatherByPeriod;
  },

  async getCities(city: string): Promise<ICity[]> {
    const { data } = await axios.get<string, ICityResponse>(geocodingUrl, {
      params: {
        name: city,
      },
    });

    return data.results;
  },

  async getWebCams(
    latitude: number,
    longitude: number,
  ): Promise<[IAllWebcams, IWebcam | undefined]> {
    const { data } = await axios.get<IWebcamResponse>(this.getWindyUrl(latitude, longitude), {
      params: {
        key: VITE_WINDY_API_KEY,
        show: 'webcams:player',
      },
    });

    const { webcams } = data.result;

    const availableCam = webcams.find((cam) => cam.player.live.available);

    return [webcams, availableCam];
  },
};

export { api };
