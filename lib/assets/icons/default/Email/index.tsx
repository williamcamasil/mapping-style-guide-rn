import React from 'react';

import Svg, {
  Path, SvgProps,
} from 'react-native-svg';

type EmailPropsType = SvgProps;

const Email = ({
  color,
  width = 24,
  height = 24,
  ...others
}: EmailPropsType) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    width={width}
    height={height}
    {...others}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M17 21h-5v0a9 9 0 1 1 9-9v1.5a2.5 2.5 0 0 1-5 0V12a4 4 0 0 0-4-4v0a4 4 0 1 0 4 4"
    />
  </Svg>
);

export default Email;
