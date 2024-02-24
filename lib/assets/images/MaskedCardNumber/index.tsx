import * as React from 'react';

import Svg, {
  SvgProps,
  Path,
  G,
} from 'react-native-svg';

type MaskedCardNumberPropsType = SvgProps;

const MaskedCardNumber: React.FC<MaskedCardNumberPropsType> = ({ color, ...others }) => (
  <Svg
    viewBox="0 0 22 4"
    fill="none"
    {...others}
  >
    <G opacity={0.6} fill={color}>
      <Path d="M4 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM10 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM14 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM22 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    </G>
  </Svg>
);

MaskedCardNumber.defaultProps = {
  width: 22,
  height: 4,
};

export default MaskedCardNumber;
