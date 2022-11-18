import axios, { AxiosResponse } from 'axios';
import React, { ChangeEvent, FC, useState } from 'react';
import { Button } from '../../components/wrappers/Button/Button';
import { ICoords } from '../../types/interfaces/iCoords';
import { ICity } from '../../types/interfaces/iCity';
import { ICityResponse } from '../../types/interfaces/iCityResponse';
import styles from './Search.module.scss';
import { Content } from '../../components/wrappers/Content/Content';
import { Page } from '../../components/wrappers/Page/Page';

interface Props {
  temperature?: number;
  onCitySelect: (city: ICoords) => void;
}

const Search: FC<Props> = ({ onCitySelect, temperature }) => {
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
    <Page temperature={temperature}>
      <Content>
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
      </Content>
    </Page>
  );
};

export { Search };
