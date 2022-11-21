import React, { ChangeEvent, FC, useState } from 'react';
import { api } from '../../api/mainApi';
import { Button } from '../../components/wrappers/Button/Button';
import { Content } from '../../components/wrappers/Content/Content';
import { Page } from '../../components/wrappers/Page/Page';
import type { ICoords } from '../../types/interfaces/iCoords';
import type { ICity } from '../../types/interfaces/iCity';
import styles from './Search.module.scss';

interface Props {
  temperature?: number;
  onCitySelect: (city: ICoords) => void;
  onSwipeRightButton?: () => void;
}

const Search: FC<Props> = ({
  onCitySelect,
  temperature,
  onSwipeRightButton,
}) => {
  const [city, setCity] = useState<string>('');
  const [citiesList, setCitiesList] = useState<ICity[]>([]);

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    setCity(e.target.value);
    const response = await api.getCities(city);

    if (!response) return;
    setCitiesList(response);
  };

  const getCityLabel = (name: string, country: string): string => `${name}, ${country}`;

  const selectCity = (cityOption: ICity): void => {
    onCitySelect({
      latitude: cityOption.latitude,
      longitude: cityOption.longitude,
      cityName: cityOption.name,
    });
  };

  return (
    <Page
      temperature={temperature}
      onSwipeRightButton={onSwipeRightButton}
    >
      <Content>
        <div className={styles.wrap}>
          <input type="text" placeholder="Find city" value={city} onChange={handleSearch} />
          {citiesList.length > 0
            ? (
              <div className={styles.list}>
                {citiesList.map((cityOption) => (
                  <Button key={cityOption.id}>
                    <button
                      type="button"
                      onClick={() => selectCity(cityOption)}
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
