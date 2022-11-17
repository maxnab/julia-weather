import axios, { AxiosResponse } from 'axios';
import React, { ChangeEvent, FC, useState } from 'react';
import { Button } from '../../components/wrappers/Page/Button/Button';
import { Coords } from '../../types/interfaces/coords';
import styles from './Search.module.scss';

export interface ICity {
  admin1: string;
  admin1_id: number;
  country: string;
  country_code: string;
  country_id: number;
  elevation: number;
  feature_code: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  timezone: string;
}

interface ICityResponse {
  generationtime_ms: number;
  results: ICity[];
}

interface Props {
  onCitySelect: (city: Coords) => void;
}

const Search: FC<Props> = ({ onCitySelect }) => {
  const [city, setCity] = useState<string>('');
  const [citiesList, setCitiesList] = useState<ICity[]>([]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setCity(e.target.value);
    axios.get<string, AxiosResponse<ICityResponse>>(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`).then(({ data }) => {
      if (!data.results) return;

      setCitiesList(data.results);
    });
  };

  const getCityLabel = (name: string, country: string) => `${name}, ${country}`;

  return (
    <div className={styles.wrap}>
      <input type="text" placeholder="Find city" value={city} onChange={handleSearch} />
      {citiesList.length > 0
        ? (
          <div className={styles.list}>
            {citiesList.map((cityOption) => (
              <Button>
                <button
                  type="button"
                  onClick={() => onCitySelect({ latitude: cityOption.latitude,
                    longitude: cityOption.longitude,
                    cityName: cityOption.name })}
                >
                  {getCityLabel(cityOption.name, cityOption.country)}
                </button>
              </Button>
            ))}
          </div>
        )
        : (
          <span>Type city name to see list</span>
        )}
    </div>
  );
};

export { Search };
