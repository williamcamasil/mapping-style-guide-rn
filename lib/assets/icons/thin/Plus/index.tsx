import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

const Plus: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M12 8v8m4-4H8m4 9a9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 9 9 9 9 0 0 1-9 9Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Plus.defaultProps = {
  width: 24,
  height: 24,
};

export default Plus;
