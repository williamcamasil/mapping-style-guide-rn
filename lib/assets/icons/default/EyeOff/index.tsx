import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

type EyeOffPropsType = SvgProps;

const EyeOff: React.FC<EyeOffPropsType> = ({ color, ...others }) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    {...others}
  >
    <Path
      d="M9.217 19.006c.91.352 1.847.55 2.783.55 3.883 0 7.767-3.37 9.869-7.258a1.096 1.096 0 0 0 0-1.039 16.813 16.813 0 0 0-2.003-2.902M4.222 19.556 19.778 4M9.525 14.252a3.5 3.5 0 0 1 4.95-4.95m3.13-3.129C15.884 4.843 13.941 4 12 4c-3.884 0-7.767 3.37-9.87 7.26a1.097 1.097 0 0 0 0 1.038c1.052 1.943 2.547 3.757 4.265 5.086"
      stroke={color}
      strokeWidth={1.8}
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
