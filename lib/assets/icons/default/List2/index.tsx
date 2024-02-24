import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const List2 = ({ color, ...others }: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M3 18L4.22 19.1L6.688 16.87M3 12L4.22 13.1L6.68 10.87M11 18.5H21M11 12.5H21M3 6.00002L4.22 7.10402L6.68 4.87402M11 6.50002H21"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

List2.defaultProps = {
  height: 24,
  width: 24,
};

export default List2;
