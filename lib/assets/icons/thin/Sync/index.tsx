import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

const Sync: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m22.008 12.002-2.002 2-2-2M6.34 6.344A7.983 7.983 0 0 1 12.002 4a8.003 8.003 0 0 1 8.005 8.002c0 .608-.074 1.198-.202 1.767M1.992 11.998l2.002-2 2.001 2m11.664 5.658A7.983 7.983 0 0 1 12 20a8.003 8.003 0 0 1-8.006-8.002c0-.608.074-1.198.202-1.767"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Sync.defaultProps = {
  width: 24,
  height: 24,
};

export default Sync;
