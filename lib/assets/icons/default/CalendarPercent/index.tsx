import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const CalendarPercent: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M16 3v2.25M8 3v2.25M3 9h18M9.899 17.1l4.2-4.2M10 13v.01M14 17v.01M18 21H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3Z"
      stroke={color}
      strokeWidth={1.8}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

CalendarPercent.defaultProps = {
  height: 24,
  width: 24,
};

export default CalendarPercent;
