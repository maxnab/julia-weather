import { useState, useEffect } from 'react';
import type { ICoords } from '@interfaces/iCoords';

interface IUsePosition {
    position: ICoords | null;
    geoError: string;
}

const defaulCity = { latitude: 55.751244, longitude: 37.618423 };

const usePosition = (): IUsePosition => {
  const [position, setPosition] = useState<ICoords>(defaulCity);
  const [geoError, setGeoError] = useState<string>('');

  const onChange = ({ coords } : { coords: ICoords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const onError = (error: { message: string }) => {
    setGeoError(error.message);
  };

  useEffect(() => {
    const { geolocation } = navigator;

    if (!geolocation) {
      setGeoError('Geolocation is not supported');
      return undefined;
    }

    const watcher = geolocation.watchPosition(onChange, onError);

    return () => geolocation.clearWatch(watcher);
  }, []);

  return { position, geoError };
};

export { usePosition };
