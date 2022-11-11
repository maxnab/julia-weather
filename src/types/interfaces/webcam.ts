import type { Player } from './player';

interface Webcam {
  id: string;
  player: Player;
  status: string;
  title: string;
}

type AllWebcams = Webcam[];

export type { Webcam, AllWebcams };
