import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

type RightCenteredPropsType = SvgProps;

const RightCentered: React.FC<RightCenteredPropsType> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 32 32"
    {...others}
  >
    <Path
      d="m14 24 8-8-8-8"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>

);

RightCentered.defaultProps = {
  width: 16,
  height: 16,
};

export default RightCentered;
