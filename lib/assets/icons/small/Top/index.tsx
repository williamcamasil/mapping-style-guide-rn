import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

type ArrowTopPropsType = SvgProps;

const Top: React.FC<ArrowTopPropsType> = ({
  color,
  ...others
}) => (
  <Svg
    fill="none"
    viewBox="0 0 16 16"
    {...others}
  >
    <Path
      d="M12 10 8 6l-4 4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Top.defaultProps = {
  width: 16,
  height: 16,
};

export default Top;
