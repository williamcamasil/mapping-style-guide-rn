import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Backspace: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m11.217 10.03 4.178 3.944m0-3.944-4.178 3.944m10.184-5.465c0-1.883-1.617-3.409-3.611-3.409H9.36a3.7 3.7 0 0 0-2.749 1.199L3.461 9.792a3.263 3.263 0 0 0 0 4.42l3.151 3.493a3.7 3.7 0 0 0 2.75 1.199h8.428c1.994 0 3.61-1.526 3.61-3.409V8.51Zm0 0s0 0 0 0Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Backspace.defaultProps = {
  height: 24,
  width: 24,
};

export default Backspace;
