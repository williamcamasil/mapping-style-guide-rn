import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

const Backspace: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m11.25 10 4 4m0-4-4 4M21 8.457A3.457 3.457 0 0 0 17.543 5H9.474a3.455 3.455 0 0 0-2.632 1.216L3.825 9.759a3.456 3.456 0 0 0 0 4.482l3.017 3.543A3.455 3.455 0 0 0 9.474 19h8.07A3.457 3.457 0 0 0 21 15.543V8.457Zm0 0s0 0 0 0Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Backspace.defaultProps = {
  width: 24,
  height: 24,
};

export default Backspace;
