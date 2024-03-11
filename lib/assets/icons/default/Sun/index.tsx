import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

const Sun = ({
  color,
  width = 24,
  height = 24,
  ...others
}: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    width={width}
    height={height}
    {...others}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M12 3.9V3m0 18v-.9m5.724-13.824.639-.639M5.637 18.363l.639-.639M20.1 12h.9M3 12h.9m13.824 5.724.639.639M5.637 5.637l.639.639M15.5 8.5a4.95 4.95 0 1 1-7 7 4.95 4.95 0 0 1 7-7Z"
    />
  </Svg>

);

export default Sun;
