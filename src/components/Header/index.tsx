import React, { FC, SetStateAction, useState } from 'react';
import searchIcon from '../../assets/icons/search.svg';
import Select from 'react-select';
import { Option, Options } from '../../App';

interface Props {
  city: Option;
  citiesOptions: Options;
  handleCity: (city: string) => void;
  setCity: (city: SetStateAction<Option>) => void;
}

const Header: FC<Props> = ({ city, citiesOptions, handleCity, setCity }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        <img src={searchIcon} alt="search" />
      </button>
      <>
        {open && (
          <Select<Option, false>
            placeholder="Choose your city"
            value={city}
            options={citiesOptions}
            onInputChange={(inputValue) => {
              handleCity(inputValue);
            }}
            onChange={(selectedCity) => {
              if (selectedCity) {
                setCity(selectedCity);
              }
            }}
          />
        )}
      </>
    </div>
  );
};

export default Header;
