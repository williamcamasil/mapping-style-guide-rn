import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Token: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M15.031 9.342a.374.374 0 1 0-.75.002.375.375 0 0 0 .75-.001m-2.532 5.442-1.03 1.032H9.637v1.469H8.172v1.836L6.798 20.5H3.5v-3.305l5.723-5.736a5.856 5.856 0 0 1 1.311-6.245 5.83 5.83 0 0 1 8.257 0 5.862 5.862 0 0 1 0 8.276 5.83 5.83 0 0 1-6.292 1.295Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Token.defaultProps = {
  height: 24,
  width: 24,
};

export default Token;
