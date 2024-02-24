import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

type ArrowLeftPropsType = SvgProps;

const Left: React.FC<ArrowLeftPropsType> = ({
  color,
  ...others
}) => (
  <Svg
    fill="none"
    viewBox="0 0 16 16"
    {...others}
  >
    <Path
      d="M6 4 2 8l4 4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Left.defaultProps = {
  width: 16,
  height: 16,
};

export default Left;
