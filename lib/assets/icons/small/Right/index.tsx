import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

type ArrowLeftPropsType = SvgProps;

const Right: React.FC<ArrowLeftPropsType> = ({
  color,
  ...others
}) => (
  <Svg
    fill="none"
    viewBox="0 0 16 16"
    {...others}
  >
    <Path
      d="m10 12 4-4-4-4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Right.defaultProps = {
  width: 16,
  height: 16,
};

export default Right;
