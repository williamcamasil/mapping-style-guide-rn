import React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

type ArrowTopPropsType = SvgProps;

const Down: React.FC<ArrowTopPropsType> = ({
  color,
  ...others
}) => (
  <Svg
    fill="none"
    viewBox="0 0 16 16"
    {...others}
  >
    <Path
      d="m4 6 4 4 4-4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Down.defaultProps = {
  width: 16,
  height: 16,
  color: '#A4A7AF',
};

export default Down;
