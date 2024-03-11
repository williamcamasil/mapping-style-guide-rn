import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const RandomKey: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M13.5 10.51v-.01m-3.343 1.242a3.255 3.255 0 0 1 .783-3.287 3.249 3.249 0 0 1 4.6-.002 3.266 3.266 0 0 1 .006 4.61 3.238 3.238 0 0 1-3.29.787l-.007.006-2.203 2.207a1.487 1.487 0 0 1-2.105-2.101l2.203-2.207m-5.72-7.349v2.387h2.389m-2.145 0A8.98 8.98 0 0 1 12 3a9 9 0 0 1 9 9c0 .539-.056 1.064-.147 1.576m-1.277 6.018v-2.387h-2.389m2.145 0A8.98 8.98 0 0 1 12 21a9 9 0 0 1-9-9c0-.539.056-1.064.147-1.576"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

RandomKey.defaultProps = {
  height: 24,
  width: 24,
};

export default RandomKey;
