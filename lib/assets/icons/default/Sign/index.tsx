import * as React from 'react';

import Svg, {
  SvgProps, G, Path, Defs, ClipPath,
} from 'react-native-svg';

const Sign: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    {...others}
  >
    <G
      clipPath="url(#a)"
      stroke={color}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M16.1 3c.7-.7 1.8-.7 2.4 0 .7.7.7 1.8 0 2.4l-7.8 7.8c-.2.2-.4.3-.7.3H8v-2c0-.3.1-.5.3-.7L16.1 3ZM15 13.5h2M7 17.5h10" />
      <Path d="M19 10.5c1.1 0 2 .9 2 2v7c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2v-7c0-1.1.9-2 2-2M14.1 5l2.4 2.4M10.1 5.6 11.7 4c.5-.5 1.2-.5 1.7 0s.5 1.2 0 1.7l-1.1 1.1" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

Sign.defaultProps = {
  width: 24,
  height: 24,
};

export default Sign;

