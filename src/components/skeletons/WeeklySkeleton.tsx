import React, { FC } from 'react';
import ContentLoader from 'react-content-loader';

const WeeklySkeleton: FC = () => (
  <ContentLoader
    speed={2}
    width={320}
    height={500}
    viewBox="0 0 320 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="45" y="15" rx="3" ry="3" width="190" height="124" />
    <rect x="45" y="180" rx="3" ry="3" width="190" height="30" />
    <rect x="45" y="250" rx="3" ry="3" width="190" height="30" />
    <rect x="45" y="300" rx="3" ry="3" width="190" height="30" />
    <rect x="45" y="350" rx="3" ry="3" width="190" height="30" />
    <rect x="45" y="400" rx="3" ry="3" width="190" height="30" />
    <rect x="45" y="450" rx="3" ry="3" width="190" height="30" />
  </ContentLoader>
);

export default WeeklySkeleton;
