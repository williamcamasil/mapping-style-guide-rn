import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Expand: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M12.9 6a.9.9 0 1 0-1.8 0h1.8Zm-1.8 12a.9.9 0 1 0 1.8 0h-1.8Zm6.9-5.1a.9.9 0 1 0 0-1.8v1.8ZM6 11.1a.9.9 0 1 0 0 1.8v-1.8ZM11.1 6v12h1.8V6h-1.8Zm6.9 5.1H6v1.8h12v-1.8Z"
      fill={color}
    />
  </Svg>
);

Expand.defaultProps = {
  height: 24,
  width: 24,
};

export default Expand;
