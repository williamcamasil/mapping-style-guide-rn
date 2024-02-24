import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const PasswordWrong: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M17 7.89h.015M12 7.89h.014m-4.708 0h.014M9 13H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3m-2.59 6.59-2.82 2.82m2.82 0-2.82-2.82M17 21a5 5 0 1 1 .001-10.001A5 5 0 0 1 17 21Z"
    />
  </Svg>
);

PasswordWrong.defaultProps = {
  height: 24,
  width: 24,
};

export default PasswordWrong;
