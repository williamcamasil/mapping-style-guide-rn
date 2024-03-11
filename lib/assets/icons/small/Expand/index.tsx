import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Expand: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    viewBox="0 0 16 16"
    fill="none"
    {...others}
  >
    <Path
      d="M9 4a1 1 0 0 0-2 0h2Zm-2 8a1 1 0 1 0 2 0H7Zm5-3a1 1 0 1 0 0-2v2ZM4 7a1 1 0 0 0 0 2V7Zm3-3v8h2V4H7Zm5 3H4v2h8V7Z"
      fill={color}
    />
  </Svg>
);

Expand.defaultProps = {
  height: 16,
  width: 16,
};

export default Expand;
