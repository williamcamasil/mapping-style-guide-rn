import * as React from 'react';

import Svg, { G, SvgProps, Path } from 'react-native-svg';

const MenuDots: React.FC<SvgProps> = ({ color, ...props }) => (
  <Svg
    viewBox="0 0 32 32"
    fill={color}
    {...props}
  >
    <G
      data-name="Layer 2"
      id="Layer_2"
    >
      <Path
        stroke={color}
        strokeWidth={1.8}
        d="M16 7a2 2 0 112-2 2 2 0 01-2 2zm0-2zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zM16 18a2 2 0 112-2 2 2 0 01-2 2zm0-2zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zM16 29a2 2 0 112-2 2 2 0 01-2 2zm0-2zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0zm0 0z"
      />
    </G>
    <Path
      id="frame"
      d="M0 0H32V32H0z"
      fill="none"
    />
  </Svg>
);

MenuDots.defaultProps = {
  height: 24,
  width: 24,
};

export default MenuDots;
