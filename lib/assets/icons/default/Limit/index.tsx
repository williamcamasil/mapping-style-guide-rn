import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Limit: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M4 3h16M5 21h1.002a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1Zm6.5 0h1a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1Zm6.5 0h1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Limit.defaultProps = {
  height: 24,
  width: 24,
};

export default Limit;
