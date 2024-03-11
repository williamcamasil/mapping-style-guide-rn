import * as React from 'react';

import Svg, {
  Circle,
  Path, SvgProps,
} from 'react-native-svg';

type SuccessFilledPropsType = SvgProps;

const SuccessFilled: React.FC<SuccessFilledPropsType> = ({ color, ...others }) => (
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
    <Path d="m22.001 14.8-5.948 6.4-2.852-3.07" fill={color} />
    <Path
      d="m22.001 14.8-5.948 6.4-2.852-3.07"
      stroke="#fff"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

SuccessFilled.defaultProps = {
  width: 36,
  height: 36,
};

export default SuccessFilled;
