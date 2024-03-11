import * as React from 'react';

import Svg, { SvgProps, Circle } from 'react-native-svg';

const Pointer: React.FC<SvgProps> = ({
  color,
  fill,
  ...others
}) => (
  <Svg
    viewBox="0 0 16 16"
    fill="none"
    {...others}
  >
    <Circle
      cx={8}
      cy={8}
      r={7}
      fill={fill}
      stroke={color}
      strokeWidth={2}
    />
  </Svg>
);

Pointer.defaultProps = {
  width: 16,
  height: 16,
};

export default Pointer;
