import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

const NextForward: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m7 16 4-4-4-4m7 9 5-5-5-5"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

NextForward.defaultProps = {
  width: 24,
  height: 24,
};

export default NextForward;

