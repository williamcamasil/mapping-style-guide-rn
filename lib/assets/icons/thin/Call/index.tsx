import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

const Call: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M9.886 14.291c1.965 1.966 4.454 3.219 5.935 1.745l.359-.36a1.082 1.082 0 0 0-.143-1.655c-.35-.243-.727-.505-1.142-.798a1.092 1.092 0 0 0-1.395.114l-.405.404c-.504-.319-1.001-.728-1.464-1.19l-.002-.002a8.667 8.667 0 0 1-1.19-1.463l.404-.406c.37-.374.417-.965.113-1.395-.292-.415-.554-.79-.796-1.14A1.081 1.081 0 0 0 8.504 8l-.36.36c-1.473 1.48-.22 3.968 1.744 5.934M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Call.defaultProps = {
  width: 24,
  height: 24,
};

export default Call;
