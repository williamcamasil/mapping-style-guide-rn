import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Cancel: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m9 9 6 6m0-6-6 6m3-12a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Cancel.defaultProps = {
  height: 24,
  width: 24,
};

export default Cancel;
