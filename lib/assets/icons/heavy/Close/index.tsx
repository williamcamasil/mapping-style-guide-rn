import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

type ArrowLeftPropsType = SvgProps;

const Close: React.FC<ArrowLeftPropsType> = ({
  color,
  ...others
}) => (
  <Svg
    {...others}
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.778 3.222a1.1 1.1 0 0 0-1.556 1.556L10.444 12l-7.222 7.222a1.1 1.1 0 1 0 1.556 1.556L12 13.556l7.222 7.222a1.1 1.1 0 1 0 1.556-1.556L13.556 12l7.222-7.222a1.1 1.1 0 1 0-1.556-1.556L12 10.444 4.778 3.222Z"
      fill={color}
    />
  </Svg>
);

Close.defaultProps = {
  width: 24,
  height: 24,
};

export default Close;
