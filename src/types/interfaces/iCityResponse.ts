import type { ICity } from './iCity';
import type { IResponse } from './iResponse';

interface ICityData {
  generationtime_ms: number;
  results: ICity[];
}

type ICityResponse = IResponse<ICityData>;

export type { ICityResponse };
