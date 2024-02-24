import * as React from 'react';

import Svg, { G, Path, SvgProps } from 'react-native-svg';

type CarPropsType = SvgProps;

const Car: React.FC<CarPropsType> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <G clipPath="url(#a)">
      <Path
        d="M21 18.5V20c0 .6-.4 1-1 1h-2c-.6 0-1-.4-1-1v-1.5m4 0v-4.8c0-.8-.3-1.5-.9-2.1L19 10.5m2 8H3m4 0V20c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1v-1.5m0 0v-4.8c0-.8.3-1.6.9-2.1L5 10.5m0 0h14m-14 0V10m14 .5V10m2 4.5-3 .3m-12 0-3-.3m5 4 1-3h6l1 3m5-9-2 .5m0 0-.7-3.1C18 5.8 17 5 15.9 5H8.3c-1.2 0-2.2.8-2.5 1.9L5 10m0 0-2-.5"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

Car.defaultProps = {
  width: 24,
  height: 24,
};

export default Car;
