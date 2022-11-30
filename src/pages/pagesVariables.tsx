import type { IPage } from '../types/interfaces/iPage';
import { Daily } from './Daily/Daily';
import { Webcams } from './Webcams/Webcams';
import { Search } from './Search/Search';
import { PagePosition } from '../types/enums/swipeDirection';

const pages: IPage[] = [
  {
    name: 'search',
    position: PagePosition.LEFT,
    component: (props) => (
      <Search
        isLoading={props.isLoading}
        onCitySelect={props.onCitySelect}
        temperature={props.currentWeather?.temp}
        onSwipeRightButton={props?.onSwipeRightButton}
      />
    ),
  },
  {
    name: 'daily',
    position: PagePosition.CENTER,
    component: (props) => (
      <Daily
        ref={props.ref}
        isLoading={props.isLoading}
        coords={props.coords}
        city={props.city}
        currentWeather={props.currentWeather}
        onSwipeLeftButton={props?.onSwipeLeftButton}
        onSwipeRightButton={props?.onSwipeRightButton}
      />
    ),
  },
  {
    name: 'webcams',
    position: PagePosition.RIGHT,
    component: (props) => (
      <Webcams
        coords={props.coords}
        isLoading={props.isLoading}
        temperature={props.currentWeather?.temp}
        onSwipeLeftButton={props?.onSwipeLeftButton}
      />
    ),
  },
];

export { pages };
