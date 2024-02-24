import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Plus2: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M12 8v8m4-4H8m4 9c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Plus2.defaultProps = {
  height: 24,
  width: 24,
};

export default Plus2;
