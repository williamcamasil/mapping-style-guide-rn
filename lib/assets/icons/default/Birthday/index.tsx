import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Birthday: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M22 21H2M7 9V7m10 2V7m-5 2V7M7 4V3m5 1V3m5 1V3m3 14.5H4M20 21v-7.07M4 21v-7.07m-1-2.18C3 12.99 4.01 14 5.25 14c.62 0 1.18-.25 1.59-.66.35-.35.96-.35 1.32 0 .41.41.97.66 1.59.66.62 0 1.18-.25 1.59-.66.35-.35.96-.35 1.32 0 .41.41.97.66 1.59.66.62 0 1.18-.25 1.59-.66.35-.35.96-.35 1.32 0 .41.41.97.66 1.59.66 1.24 0 2.25-1.01 2.25-2.25C21 10.23 19.77 9 18.25 9H5.75C4.23 9 3 10.23 3 11.75Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Birthday.defaultProps = {
  height: 24,
  width: 24,
};

export default Birthday;
