import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

type ArrowLeftPropsType = SvgProps;

const Close: React.FC<ArrowLeftPropsType> = ({
  color,
  ...others
}) => (
  <Svg
    {...others}
    viewBox="0 0 16 16"
    fill="none"
  >
    <Path
      d="m4 4 8 8m0-8-8 8"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Close.defaultProps = {
  width: 16,
  height: 16,
};

export default Close;
