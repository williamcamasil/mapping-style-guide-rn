import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Menu: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M20 12H4m16 6H4M20 6H4"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Menu.defaultProps = {
  height: 24,
  width: 24,
};

export default Menu;
