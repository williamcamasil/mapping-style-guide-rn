import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const ShakeHands: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M3.817 15.75h1.517a1.333 1.333 0 0 0 1.333-1.333V9.083A1.333 1.333 0 0 0 5.334 7.75h-1.27m15.87 0h-1.267a1.333 1.333 0 0 0-1.333 1.333v5.334a1.333 1.333 0 0 0 1.333 1.333h1.517m-2.83-1.103h-.86c-.286 0-.57.061-.83.18l-4.206 1.916m-.813-8.075a1.988 1.988 0 0 0-1.675-.164l-2.303.829m10.827-.897L14.618 7.17a2.001 2.001 0 0 0-1.893.152l-2.61 1.691a1.506 1.506 0 0 0 1.455 2.628l1.556-.726m0-.001.79.717a2 2 0 0 1 .008 2.957l-2.017 1.846c-.761.698-1.93.7-2.693.007l-1.386-1.257a1.997 1.997 0 0 0-1.185-.5m11.72-9.048a9 9 0 0 1 0 12.728 9 9 0 1 1 0-12.728Z"
      stroke={color}
      strokeWidth={1.8}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

ShakeHands.defaultProps = {
  height: 24,
  width: 24,
};

export default ShakeHands;
