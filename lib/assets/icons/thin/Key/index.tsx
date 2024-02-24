
import React from 'react';
import { ColorValue } from 'react-native';

import Svg, {
  ClipPath, Defs, G, Path, SvgProps,
} from 'react-native-svg';

type QuestionPropsType = SvgProps & {
  backgroundColor?: ColorValue;
};

const Key: React.FC<QuestionPropsType> = ({
  color,
  backgroundColor,
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
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="m16.209 14.035-.992-1.008-1.26 1.24-2.124-.019-.86 2.08a1.999 1.999 0 0 1-1.866 1.236l-4.163-.035A2.001 2.001 0 0 1 3.1 16.262l-1.408-3.575a1.999 1.999 0 0 1 .013-1.498l1.469-3.55a2 2 0 0 1 1.865-1.236l4.163.036a2 2 0 0 1 1.843 1.267l.805 2.04 8.52.073 2.23 2.27-2.269 2.23-1.875-.015-1.24-1.261-1.008.992h0Z" />
      <Path d="M6.727 11.464a.433.433 0 1 1-.001.002" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill={backgroundColor} d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

Key.defaultProps = {
  width: 24,
  height: 24,
};

export default Key;
