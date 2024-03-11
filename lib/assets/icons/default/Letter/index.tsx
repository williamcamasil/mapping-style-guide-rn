import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Letter = ({
  color, width = 24, height = 24, ...others
}: SvgProps) => (
  <Svg
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="m7.5 9.75 2.925 1.804a3 3 0 0 0 3.15 0L16.5 9.75M6 5h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z"
    />
  </Svg>
);

export default Letter;
