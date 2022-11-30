import { useState } from 'react';
import { api } from '@api';
import type { ChangeEvent, FC } from 'react';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import type { ICoords } from '../../types/interfaces/iCoords';
import type { ICity } from '../../types/interfaces/iCity';
import { Button } from '../../components/Button/Button';
import { Content } from '../../components/wrappers/Content/Content';
import { Page } from '../../components/wrappers/Page/Page';
import styles from './Search.module.scss';

interface ICityOption extends ICoords {
  cityName: string;
}

interface Props {
  isLoading: boolean;
  temperature?: number;
  onCitySelect: (city: ICityOption) => void;
  onSwipeRightButton?: () => void;
}

const Search: FC<Props> = ({
  isLoading,
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
      isLoading={isLoading}
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
                  <Button
                    key={cityOption.id}
                    onClick={() => selectCity(cityOption)}
                  >
                    {getCityLabel(cityOption.name, cityOption.country)}
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
