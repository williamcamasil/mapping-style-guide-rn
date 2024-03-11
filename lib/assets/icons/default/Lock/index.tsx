import React from 'react';

import Svg, {
  ClipPath, Defs, G, Path, SvgProps,
} from 'react-native-svg';

type LockPropsType = SvgProps;

const Lock: React.FC<LockPropsType> = ({
  color,
  ...others
}) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <G
      clipPath="url(#a)"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M17 21H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2ZM8 10V7a4 4 0 0 1 8 0v3" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

Lock.defaultProps = {
  width: 24,
  height: 24,
};

export default Lock;
