import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Payments: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M18 16V9m-3 7.047v-4M12 16v-5M6 9.047v7M9 12v4m8.556-13H6.444C3.99 3 2 5.015 2 7.5v9C2 18.985 3.99 21 6.444 21h11.112C20.01 21 22 18.985 22 16.5v-9C22 5.015 20.01 3 17.556 3Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Payments.defaultProps = {
  height: 24,
  width: 24,
};

export default Payments;
