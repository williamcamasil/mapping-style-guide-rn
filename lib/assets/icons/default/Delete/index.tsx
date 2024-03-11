import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Delete: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M20 6.375H4M15.541 21H8.46a2.25 2.25 0 0 1-2.244-2.077L5.25 6.375h13.5l-.965 12.548A2.25 2.25 0 0 1 15.54 21ZM9.187 3h5.626a1.125 1.125 0 0 1 1.124 1.125v2.25H8.064v-2.25A1.125 1.125 0 0 1 9.187 3Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Delete.defaultProps = {
  height: 24,
  width: 24,
};

export default Delete;
