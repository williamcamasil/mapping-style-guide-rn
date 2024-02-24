import * as React from 'react';

import Svg, { G, Path, SvgProps } from 'react-native-svg';

type LoginPropsType = SvgProps;

const Login: React.FC<LoginPropsType> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <G
      clipPath="url(#a)"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M15 12H5M12 15l3-3-3-3" />
      <Path d="M3.95 16a8.878 8.878 0 0 0 1.686 2.364 9 9 0 1 0 0-12.728A8.875 8.875 0 0 0 3.95 8" />
    </G>
  </Svg>
);

Login.defaultProps = {
  width: 24,
  height: 24,
};

export default Login;
