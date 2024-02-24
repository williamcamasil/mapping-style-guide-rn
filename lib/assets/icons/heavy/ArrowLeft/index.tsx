import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

type ArrowLeftPropsType = SvgProps;

const ArrowLeft: React.FC<ArrowLeftPropsType> = ({
  color,
  ...others
}) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.778 3.222a1.1 1.1 0 0 1 0 1.556L5.556 12l7.222 7.222a1.1 1.1 0 1 1-1.555 1.556l-8-8a1.1 1.1 0 0 1 0-1.556l8-8a1.1 1.1 0 0 1 1.555 0Z"
      fill={color}
    />
  </Svg>
);

ArrowLeft.defaultProps = {
  width: 24,
  height: 24,
};

export default ArrowLeft;
