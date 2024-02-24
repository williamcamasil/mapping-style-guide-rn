import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Travel: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M10 10h4M8 21v1m8-1v1m0-15V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3m4 6v5m-4-5v5m8-5v5m1 3H7a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Travel.defaultProps = {
  height: 24,
  width: 24,
};

export default Travel;
