import * as React from 'react';

import Svg, {
  Circle,
  Path, SvgProps,
} from 'react-native-svg';

type CancelFilledPropsType = SvgProps;

const CancelFilled: React.FC<CancelFilledPropsType> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 36 36"
    {...others}
  >
    <Circle
      cx={18}
      cy={18}
      r={16}
      fill={color}
      stroke="#fff"
      strokeWidth={4}
    />
    <Path
      d="M21.948 14 13 22.5M22 22.5 13 14"
      stroke="#fff"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

CancelFilled.defaultProps = {
  width: 36,
  height: 36,
};

export default CancelFilled;
