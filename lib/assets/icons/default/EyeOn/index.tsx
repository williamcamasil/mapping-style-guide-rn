import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

type EyeOnPropsType = SvgProps;

const EyeOn: React.FC<EyeOnPropsType> = ({
  color,
  ...others
}) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M2.13 12.297a1.097 1.097 0 0 1 0-1.04C4.234 7.37 8.118 4 12 4c3.883 0 7.767 3.37 9.87 7.259.174.323.174.715 0 1.039-2.103 3.888-5.987 7.258-9.87 7.258-3.883 0-7.767-3.37-9.87-7.26Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.357 9.42a3.333 3.333 0 1 1-4.714 4.715 3.333 3.333 0 0 1 4.714-4.714Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

EyeOn.defaultProps = {
  width: 24,
  height: 24,
};

export default EyeOn;
