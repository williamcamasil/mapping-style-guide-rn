import * as React from 'react';

import Svg, { G, Path, SvgProps } from 'react-native-svg';

type CarPropsType = SvgProps;

const Car: React.FC<CarPropsType> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 32 32"
    {...others}
  >
    <G clipPath="url(#a)">
      <Path
        d="M28 24.667v2c0 .8-.533 1.333-1.333 1.333H24c-.8 0-1.333-.533-1.333-1.333v-2m5.333 0v-6.4c0-1.067-.4-2-1.2-2.8L25.333 14M28 24.667H4m5.333 0v2C9.333 27.467 8.8 28 8 28H5.333C4.533 28 4 27.467 4 26.667v-2m0 0v-6.4c0-1.067.4-2.134 1.2-2.8L6.667 14m0 0h18.666M6.667 14v-.667M25.333 14v-.667m2.667 6-4 .4m-16 0-4-.4m6.667 5.334 1.333-4h8l1.333 4m6.667-12-2.667.666m0 0L24.4 9.2c-.4-1.467-1.733-2.533-3.2-2.533H11.067A3.44 3.44 0 0 0 7.733 9.2l-1.066 4.133m0 0L4 12.667"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

Car.defaultProps = {
  width: 32,
  height: 32,
};

export default Car;
