import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Returns: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m6 7.5 3-3m-3 3 3 3m-3-3h6a6 6 0 1 1-6 6"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Returns.defaultProps = {
  height: 24,
  width: 24,
};

export default Returns;
