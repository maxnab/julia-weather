import type { AllWebcams } from './webcam';

interface WebcamResponse {
  result: {
    webcams: AllWebcams;
  };
}

export type { WebcamResponse };
