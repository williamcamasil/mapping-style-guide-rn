import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Deal: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M16.96 19.91h-.95a1.74 1.74 0 0 0-.75.16l-3.8 1.73M21 14.08h-2.5a1.51 1.51 0 0 0-1.5 1.5v4a1.5 1.5 0 0 0 1.5 1.5H21m-18 0h2.5a1.5 1.5 0 0 0 1.5-1.5v-4a1.5 1.5 0 0 0-1.5-1.5H3m14.41.43-3.1-1.36a1.801 1.801 0 0 0-1.71.14l-2.36 1.52a1.37 1.37 0 0 0-.4 1.89 1 1 0 0 0 .23.26 1.361 1.361 0 0 0 1.49.23l1.4-.66 1 .9a1.47 1.47 0 0 1 .1 2.08l-.09.09-2.1 1.92a1.81 1.81 0 0 1-2.43 0l-1.26-1.15a2 2 0 0 0-1.11-.48m-.05-4.75 2.19-.79a1.779 1.779 0 0 1 1.51.15M7.67 10h8.67A1.66 1.66 0 0 0 18 8.33V3.66A1.66 1.66 0 0 0 16.34 2H7.67A1.66 1.66 0 0 0 6 3.66v4.67A1.67 1.67 0 0 0 7.67 10Zm5.39-5.09a1.502 1.502 0 1 1-2.12 2.128 1.502 1.502 0 0 1 2.12-2.128Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Deal.defaultProps = {
  height: 24,
  width: 24,
};

export default Deal;
