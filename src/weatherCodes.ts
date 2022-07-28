import sunny from './weather icons/sun/26.png';
import mainlyClear from './weather icons/sun/6.png';
import cloudy from './weather icons/sun/27.png';
import overcast from './weather icons/cloud/35.png';
import rain from './weather icons/rain/39.png';
import snow from './weather icons/snow/36.png';
import shower from './weather icons/cloud/7.png';
import snowfall from './weather icons/cloud/18.png';
import storm from './weather icons/cloud/17.png';

export const weatherCodes: { [key: number]: string } = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense intensity drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense intensity freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Intensity rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy intensity snow fall',
  77: 'Snow grains',
  80: 'Slight shower rain',
  81: 'Moderate shower rain',
  82: 'Violent shower rain',
  85: 'Slight shower snow',
  86: 'Heavy shower snow',
  95: 'Thunderstorm',
  96: 'Heavy thunderstorm',
  99: 'Very heavy thunderstorm',
};

export const weatherCodesImages: { [key: number]: string } = {
  0: sunny,
  1: mainlyClear,
  2: cloudy,
  3: overcast,
  45: overcast, // TODO: need fog icon
  48: overcast,
  51: rain,
  53: rain, // TODO: need more rain
  55: rain,
  56: rain,
  57: rain,
  61: rain,
  63: rain,
  65: rain,
  66: rain,
  67: rain,
  71: snow,
  73: snow,
  75: snow,
  77: snow,
  80: shower,
  81: shower,
  82: shower,
  85: snowfall,
  86: snowfall,
  95: storm,
  96: storm,
  99: storm,
};
