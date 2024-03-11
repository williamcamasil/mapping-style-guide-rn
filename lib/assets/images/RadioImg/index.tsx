import * as React from 'react';
import { ColorValue } from 'react-native';

import Svg, { SvgProps, Circle } from 'react-native-svg';

export type RadioImgPropsType = Omit<SvgProps, 'color'> & {
  backgroundColor?: ColorValue;
  borderColor?: ColorValue;
  checkColor?: ColorValue;
  borderWidth?: number;
  selected?: boolean;
};

const RadioImg: React.FC<RadioImgPropsType> = ({
  backgroundColor,
  borderColor,
  borderWidth,
  checkColor,
  selected,
  ...others
}) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Circle
      cx={12}
      cy={12}
      fill={backgroundColor}
      r={11}
      stroke={borderColor}
      strokeWidth={borderWidth}
    />
    {selected ? (
      <Circle cx={12} cy={12} fill={checkColor} r={9} />
    ) : null}
  </Svg>
);

RadioImg.defaultProps = {
  width: 24,
  height: 24,
};

export default RadioImg;
