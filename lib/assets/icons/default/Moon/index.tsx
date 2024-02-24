import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

const Moon = ({
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
      d="M9.004 9.004c1.938-1.938 2.313-4.867 1.17-7.312-.179-.377.193-.78.596-.675a8.25 8.25 0 0 1 3.767 2.149c3.223 3.222 3.292 8.383.152 11.523-3.14 3.14-8.298 3.072-11.523-.153a8.242 8.242 0 0 1-2.149-3.767c-.106-.402.299-.775.675-.596 2.441 1.145 5.372.77 7.312-1.17v0Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default Moon;
