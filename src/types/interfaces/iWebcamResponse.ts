import type { IAllWebcams } from './iWebcam';

interface IWebcamResponse {
  result: {
    webcams: IAllWebcams;
  };
}

export type { IWebcamResponse };
