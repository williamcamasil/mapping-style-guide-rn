import * as React from 'react';

import Svg, {
  G, Path, Defs, ClipPath, SvgProps,
} from 'react-native-svg';

const Logout: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    {...others}
  >
    <G clipPath="url(#a)">
      <Path
        d="M8 16v2a3 3 0 0 0 3 3h7a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3h-7a3 3 0 0 0-3 3v2m-3 7-3-3m0 0 3-3m-3 3h10"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={color} d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

Logout.defaultProps = {
  width: 24,
  height: 24,
};

export default Logout;
