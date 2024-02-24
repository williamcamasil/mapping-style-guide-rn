import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const BarCode: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M6.5 8v4m3.67-4v4m3.66-4v4M7 21H6a3 3 0 0 1-3-3v-1M17 3h1a3 3 0 0 1 3 3v1M3 7V6a3 3 0 0 1 3-3h1m14 14v1a3 3 0 0 1-3 3h-1M6.5 15v2m3.67-2v2m3.66-1.87V17m3.67-1.87V17m0-9v4M4 12h16"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

BarCode.defaultProps = {
  height: 24,
  width: 24,
};

export default BarCode;
