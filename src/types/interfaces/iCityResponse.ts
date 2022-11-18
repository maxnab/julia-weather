import type { ICity } from './iCity';

interface ICityResponse {
    generationtime_ms: number;
    results: ICity[];
  }

export type { ICityResponse };
