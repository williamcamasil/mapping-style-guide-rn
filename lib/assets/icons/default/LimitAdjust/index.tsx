import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const LimitAdjust: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M20 7H9M4 17h11M8.121 4.879A3 3 0 1 1 3.88 9.12 3 3 0 0 1 8.12 4.88Zm12 10a3 3 0 1 1-4.242 4.242 3 3 0 0 1 4.242-4.242Z"
      stroke={color}
      strokeWidth={1.8}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

LimitAdjust.defaultProps = {
  height: 24,
  width: 24,
};

export default LimitAdjust;
