import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

const EyeOff: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M9.218 19.006c.91.352 1.846.55 2.782.55 3.883 0 7.767-3.37 9.87-7.258a1.097 1.097 0 0 0 0-1.039 16.819 16.819 0 0 0-2.004-2.902M4.222 19.556 19.778 4M9.525 14.252a3.5 3.5 0 0 1 4.95-4.95m3.13-3.129C15.885 4.843 13.942 4 12 4c-3.883 0-7.767 3.37-9.87 7.26a1.097 1.097 0 0 0 0 1.038c1.052 1.943 2.548 3.757 4.265 5.086"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

EyeOff.defaultProps = {
  width: 24,
  height: 24,
};

export default EyeOff;
