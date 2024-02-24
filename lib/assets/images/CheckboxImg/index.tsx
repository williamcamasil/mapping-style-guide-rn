import * as React from 'react';
import { ColorValue } from 'react-native';

import Svg, { SvgProps, Rect, Path } from 'react-native-svg';

export type CheckBoxImgPropsType = Omit<SvgProps, 'color'> & {
  backgroundColor?: ColorValue;
  borderColor?: ColorValue;
  checkColor?: ColorValue;
  borderWidth?: number;
  checked?: boolean;
};

const CheckboxImg: React.FC<CheckBoxImgPropsType> = ({
  backgroundColor,
  borderColor,
  borderWidth,
  checkColor,
  checked,
  ...others
}) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Rect
      x={1}
      y={1}
      width={22}
      height={22}
      rx={5}
      fill={backgroundColor}
      stroke={borderColor}
      strokeWidth={borderWidth}
    />
    {checked ? (
      <Path
        d="m16.01 10-5.414 4.67L8 12.43"
        stroke={checkColor}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ) : null}
  </Svg>
);

CheckboxImg.defaultProps = {
  width: 24,
  height: 24,
};

export default CheckboxImg;
