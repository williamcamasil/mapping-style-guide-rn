import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Close: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m5 5 14 14m0-14L5 19"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Close.defaultProps = {
  height: 24,
  width: 24,
};

export default Close;
