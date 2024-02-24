import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

const WifiAlert: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M12 11.036V7.275M12 14v.01M12 20 2 8.101c5.523-5.467 14.477-5.467 20 0L12 20Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

WifiAlert.defaultProps = {
  width: 24,
  height: 24,
};

export default WifiAlert;
