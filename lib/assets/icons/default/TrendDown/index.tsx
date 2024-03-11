import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

const TrendDown = ({ color, ...others }: SvgProps) => (
  <Svg
    viewBox="0 0 6 9"
    fill="none"
    {...others}
  >
    <Path
      d="M1.5 6.551L2.948 8l1.448-1.449M2.946 1v7"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

TrendDown.defaultProps = {
  height: 6,
  width: 9,
};

export default TrendDown;
