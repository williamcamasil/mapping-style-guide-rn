import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Unlock: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M16.055 5.944A4.05 4.05 0 0 0 11.999 1.9a4.05 4.05 0 0 0-4.057 4.044v4.033M17.07 21.1H6.93a2.025 2.025 0 0 1-2.03-2.022V12c0-1.117.909-2.022 2.03-2.022h10.14c1.12 0 2.028.905 2.028 2.022v7.077A2.025 2.025 0 0 1 17.07 21.1Z"
      stroke={color}
      strokeWidth={1.8}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Unlock.defaultProps = {
  height: 24,
  width: 24,
};

export default Unlock;
