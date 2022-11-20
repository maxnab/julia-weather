import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Webcams.module.scss';
import type { ICoords } from '../../types/interfaces/iCoords';
import type { IAllWebcams, IWebcam } from '../../types/interfaces/iWebcam';
import type { IWebcamResponse } from '../../types/interfaces/iWebcamResponse';
import { Content } from '../../components/wrappers/Content/Content';
import { Page } from '../../components/wrappers/Page/Page';

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

    axios.get<IWebcamResponse>(`https://api.windy.com/api/webcams/v2/list/nearby=${coords.latitude},${coords.longitude},15?key=1M7CwWRJiJBt9ktm6GSBtXw06OJ6QZGM&show=webcams:player`).then(({ data }) => {
      const { webcams } = data.result;
      const availableCam = webcams.find((cam) => cam.player.live.available);
      setAllWebcams(webcams);
      setActiveCam(availableCam);
    });
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
