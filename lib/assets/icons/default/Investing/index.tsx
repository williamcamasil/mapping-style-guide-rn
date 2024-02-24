import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Investing: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M20 21a2 2 0 0 0 2-2V5a2 2 0 1 0-4 0v14a2 2 0 0 0 2 2ZM12 21a2 2 0 0 0 2-2v-8.316a2 2 0 1 0-4 0V19a2 2 0 0 0 2 2ZM4 21a2 2 0 0 0 2-2v-2.632a2 2 0 1 0-4 0V19a2 2 0 0 0 2 2Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Investing.defaultProps = {
  height: 24,
  width: 24,
};

export default Investing;
