import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Airplane: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m14.081 7.116 3.312-3.312a1.982 1.982 0 0 1 2.803 2.803l-3.312 3.312 1.792 8.917c.066.328-.037.667-.273.904l-.66.66a1 1 0 0 1-1.639-.344l-2.624-6.733-3.406 3.406.182 2.17a1 1 0 0 1-.289.791l-1.086 1.086-2.12-3.536-3.537-2.121 1.086-1.086a.998.998 0 0 1 .791-.289l2.17.182 3.406-3.406-6.732-2.624A1 1 0 0 1 3.6 6.257l.66-.66a.999.999 0 0 1 .904-.273l8.917 1.792Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Airplane.defaultProps = {
  height: 24,
  width: 24,
};

export default Airplane;
