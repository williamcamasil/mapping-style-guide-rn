import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

type LoginPropsType = SvgProps;

const Login: React.FC<LoginPropsType> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m7.733 21 3.912-3.555h6.578c.981 0 1.777-.797 1.777-1.778V6.778C20 5.796 19.204 5 18.222 5H5.778C4.796 5 4 5.796 4 6.778v8.889c0 .981.796 1.778 1.778 1.778H7.2"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Login.defaultProps = {
  width: 24,
  height: 24,
};

export default Login;
