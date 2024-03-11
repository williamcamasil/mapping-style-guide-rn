import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Notifications: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M13.723 20a1.984 1.984 0 0 1-3.446 0M6.502 9v-.5a5.5 5.5 0 1 1 10.998 0V9a12 12 0 0 0 2.4 7.2.5.5 0 0 1-.4.8H4.501a.5.5 0 0 1-.4-.8 12 12 0 0 0 2.4-7.2Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Notifications.defaultProps = {
  height: 24,
  width: 24,
};

export default Notifications;
