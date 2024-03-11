import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

type ArrowLeftPropsType = SvgProps;

const EyeOn: React.FC<ArrowLeftPropsType> = ({
  color,
  ...others
}) => (
  <Svg
    fill="none"
    viewBox="0 0 16 16"
    {...others}
  >
    <Path
      d="m13 5-6.875 6L3 8.273"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

EyeOn.defaultProps = {
  width: 16,
  height: 16,
};

export default EyeOn;
