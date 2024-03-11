import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const CalendarIcon: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M16 3v2.25M8 3v2.25M3 9h18m-3 12H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

CalendarIcon.defaultProps = {
  height: 24,
  width: 24,
};

export default CalendarIcon;
