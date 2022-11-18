import type { IPlayer } from './iPlayer';

interface IWebcam {
  id: string;
  player: IPlayer;
  status: string;
  title: string;
}

type IAllWebcams = IWebcam[];

export type { IWebcam, IAllWebcams };
