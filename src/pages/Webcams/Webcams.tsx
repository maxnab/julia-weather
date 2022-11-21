import React, { FC, useEffect, useState } from 'react';
import { api } from '../../api/mainApi';
import { Content } from '../../components/wrappers/Content/Content';
import { Page } from '../../components/wrappers/Page/Page';
import type { ICoords } from '../../types/interfaces/iCoords';
import type { IAllWebcams, IWebcam } from '../../types/interfaces/iWebcam';
import styles from './Webcams.module.scss';

interface Props {
  temperature?: number;
  coords?: ICoords;
  onSwipeLeftButton?: () => void;
}

const Webcams: FC<Props> = ({ coords, temperature, onSwipeLeftButton }) => {
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
            <div key={cam.id} className={styles.wrap}>
              <button type="button" onClick={(): void => selectCurrentCam(cam)}>{cam.title}</button>
            </div>
          ))}
        </div>
      </Content>
    </Page>
  );
};

export { Webcams };
