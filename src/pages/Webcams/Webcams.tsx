import { api } from '@api';
import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary';
import { Button } from '@components/Button/Button';
import type { ICoords } from '../../types/interfaces/iCoords';
import type { IAllWebcams, IWebcam } from '../../types/interfaces/iWebcam';
import { Content } from '../../components/wrappers/Content/Content';
import { Page } from '../../components/wrappers/Page/Page';
import styles from './Webcams.module.scss';

interface Props {
  isLoading: boolean;
  temperature?: number;
  coords?: ICoords;
  onSwipeLeftButton?: () => void;
}

const Webcams: FC<Props> = ({
  isLoading,
  coords,
  temperature,
  onSwipeLeftButton,
}) => {
  const [allWebcams, setAllWebcams] = useState<IAllWebcams>([]);
  const [activeCam, setActiveCam] = useState<IWebcam | undefined>(undefined);

  useEffect(() => {
    if (!coords) return;

    const fetchData = async () => {
      const [webcams, availableCam] = await api.getWebCams(coords.latitude, coords.longitude);
      setAllWebcams(webcams);
      setActiveCam(availableCam);
    };

    fetchData();
  }, [coords?.latitude, coords?.longitude]);

  const selectCurrentCam = (cam: IWebcam): void => {
    setActiveCam(cam);
  };

  return (
    <Page
      isLoading={isLoading}
      temperature={temperature}
      onSwipeLeftButton={onSwipeLeftButton}
    >
      <Content>
        {activeCam
          ? (
            <embed src={activeCam.player.day.embed} width="100%" height="50%" />
          )
          : (
            <span>Camera not available</span>
          )}
        <div className={styles['cameras-list']}>
          {allWebcams.map((cam) => (
            <Button key={cam.id} onClick={(): void => selectCurrentCam(cam)}>{cam.title}</Button>
          ))}
        </div>
      </Content>
    </Page>
  );
};

export { Webcams };
