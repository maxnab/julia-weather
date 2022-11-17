import React, { FC, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Webcams.module.scss';
import type { Coords } from '../../types/interfaces/coords';
import type { AllWebcams, Webcam } from '../../types/interfaces/webcam';
import type { WebcamResponse } from '../../types/interfaces/webcamResponse';

interface Props {
  coords?: Coords;
}

const Webcams: FC<Props> = ({ coords }) => {
  const [allWebcams, setAllWebcams] = useState<AllWebcams>([]);
  const [activeCam, setActiveCam] = useState<Webcam | undefined>(undefined);

  useEffect(() => {
    if (!coords) return;

    axios.get<WebcamResponse>(`https://api.windy.com/api/webcams/v2/list/nearby=${coords.latitude},${coords.longitude},15?key=1M7CwWRJiJBt9ktm6GSBtXw06OJ6QZGM&show=webcams:player`).then(({ data }) => {
      const { webcams } = data.result;
      const availableCam = webcams.find((cam) => cam.player.live.available);
      setAllWebcams(webcams);
      setActiveCam(availableCam);
    });
  }, [coords?.latitude, coords?.longitude]);

  const selectCurrentCam = (cam: Webcam): void => {
    setActiveCam(cam);
  };

  return (
    <>
      {activeCam ? <embed src={activeCam.player.day.embed} width="100%" height="50%" /> : <span>Camera not available</span>}
      <div className={styles['cameras-list']}>
        {allWebcams.map((cam) => (
          <div key={cam.id} className={styles.wrap}>
            <button type="button" onClick={(): void => selectCurrentCam(cam)}>{cam.title}</button>
          </div>
        ))}
      </div>
    </>
  );
};

export { Webcams };
