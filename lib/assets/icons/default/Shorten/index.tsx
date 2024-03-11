import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Shorten: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M18 12.9a.9.9 0 1 0 0-1.8v1.8ZM6 11.1a.9.9 0 1 0 0 1.8v-1.8Zm12 0H6v1.8h12v-1.8Z"
      fill={color}
    />
  </Svg>
);

Shorten.defaultProps = {
  height: 24,
  width: 24,
};

export default Shorten;
