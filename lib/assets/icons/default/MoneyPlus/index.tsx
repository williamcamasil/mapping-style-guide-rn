import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const MoneyPlus: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M18.407 14.016A7.96 7.96 0 0 0 19 11a8 8 0 1 0-4.982 7.407M11 8.132v-.637m0 6.364v.636m0-.636-.477.001c-.511 0-.933-.279-1.18-.684m1.657.683.569.001a1.34 1.34 0 0 0 .325-2.641l-1.79-.45a1.34 1.34 0 0 1 .326-2.639h1.047c.509 0 .931.279 1.177.683m4.026 9.318h2.68m-1.341 1.34v-2.68M18 14a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

MoneyPlus.defaultProps = {
  height: 24,
  width: 24,
};

export default MoneyPlus;
