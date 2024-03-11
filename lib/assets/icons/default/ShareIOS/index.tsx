import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const ShareIOS: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M5 11.35v7c0 .968.783 1.75 1.75 1.75h10.5A1.75 1.75 0 0 0 19 18.35v-7m-7 3.787L11.937 4m0 0 4.356 4.306M11.936 4 7.63 8.356"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

ShareIOS.defaultProps = {
  height: 24,
  width: 24,
};

export default ShareIOS;
