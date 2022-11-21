import type { IColor } from '../types/interfaces/iColor';
import { checkColorRange } from './checkColorRange';

type TTempToColorFunc = (t: number, min: number, max: number, mode?: string) => IColor

const getColor: TTempToColorFunc = (t, min, max, mode) => {
  let temp = t;

  if (!Number.isFinite(t) || !Number.isFinite(min) || !Number.isFinite(max)) {
    throw new TypeError('function tempToColor() expected only numbers');
  }

  if (min > max) {
    throw new Error('minimum cannot be greater than maximum');
  }

  if (t < min) {
    temp = min;
  } else if (t > max) {
    temp = max;
  }

  const nT = (temp - min) / (max - min);
  let rValue = 255;
  let gValue = 255;
  let bValue = 255;

  switch (mode) {
    case 'extended': {
      const regions = [1 / 6, (1 / 6) * 2, (1 / 6) * 3, (1 / 6) * 4, (1 / 6) * 5];
      if (nT <= regions[0]) {
        rValue = 128 - 6 * nT * 127.999;
        gValue = 0;
        bValue = 255;
      } else if (nT > regions[0] && nT <= regions[1]) {
        rValue = 0;
        gValue = 1280 - 6 * (1 - nT) * 255.999;
        bValue = 255;
      } else if (nT > regions[1] && nT <= regions[2]) {
        rValue = 0;
        gValue = 255;
        bValue = 768 - 6 * nT * 255.999;
      } else if (nT > regions[2] && nT <= regions[3]) {
        rValue = 768 - 6 * (1 - nT) * 255.999;
        gValue = 255;
        bValue = 0;
      } else if (nT > regions[3] && nT <= regions[4]) {
        rValue = 255;
        gValue = 1280 - 6 * nT * 255.999;
        bValue = 0;
      } else {
        rValue = 255;
        gValue = 0;
        bValue = 128 - 6 * (1 - nT) * 127.999;
      }
      break;
    }

    case 'half': {
      const regions = [1 / 4, (1 / 4) * 2, (1 / 4) * 3];
      if (nT <= regions[0]) {
        rValue = 0;
        gValue = 128 + 4 * nT * 127.999;
        bValue = 0;
      } else if (nT > regions[0] && nT <= regions[1]) {
        rValue = 768 - 4 * (1 - nT) * 255.999;
        gValue = 255;
        bValue = 0;
      } else if (nT > regions[1] && nT <= regions[2]) {
        rValue = 255;
        gValue = 768 - 4 * nT * 255.999;
        bValue = 0;
      } else {
        rValue = 128 + 4 * (1 - nT) * 127.999;
        gValue = 0;
        bValue = 0;
      }
      break;
    }

    default: {
      const regions = [1 / 4, (1 / 4) * 2, (1 / 4) * 3];
      if (nT <= regions[0]) {
        rValue = 0;
        gValue = 4 * nT * 255.999;
        bValue = 255;
      } else if (nT > regions[0] && nT <= regions[1]) {
        rValue = 0;
        gValue = 255;
        bValue = 512 - 4 * nT * 255.999;
      } else if (nT > regions[1] && nT <= regions[2]) {
        rValue = 512 - 4 * (1 - nT) * 255.999;
        gValue = 255;
        bValue = 0;
      } else {
        rValue = 255;
        gValue = 4 * (1 - nT) * 255.999;
        bValue = 0;
      }
      break;
    }
  }

  return {
    r: checkColorRange(Math.trunc(rValue)),
    g: checkColorRange(Math.trunc(gValue)),
    b: checkColorRange(Math.trunc(bValue)),
  };
};

export { getColor };
