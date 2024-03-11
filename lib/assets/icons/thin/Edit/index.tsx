
import * as React from 'react';

import Svg, {
  G, Path, Defs, ClipPath, SvgProps,
} from 'react-native-svg';

type EditPropsType = SvgProps;

const Edit: React.FC<EditPropsType> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 16 16"
    {...others}
  >
    <G
      clipPath="url(#a)"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M13.333 7.407v4.741c0 .655-.53 1.185-1.185 1.185H3.852c-.655 0-1.185-.53-1.185-1.185V3.852c0-.655.53-1.185 1.185-1.185H8" />
      <Path d="m8.089 9.547-1.867.23.274-1.92a.593.593 0 0 1 .167-.335l4.48-4.48a1.283 1.283 0 0 1 1.814 1.814L8.435 9.378a.595.595 0 0 1-.346.17Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

Edit.defaultProps = {
  width: 16,
  height: 16,
};

export default Edit;
