import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const ArrowRight: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m8.5 5 7 7-7 7"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

ArrowRight.defaultProps = {
  height: 24,
  width: 24,
};

export default ArrowRight;
