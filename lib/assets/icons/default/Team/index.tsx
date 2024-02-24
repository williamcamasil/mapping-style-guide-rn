import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Team: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M18 12.25c1.53 0 3 .53 4 1.33m-20 0c1-.8 2.47-1.33 4-1.33m10.59 7.5c-1.16-.9-2.84-1.5-4.59-1.5s-3.43.6-4.59 1.5m7.09-7a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm5.49-6a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10.98 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Team.defaultProps = {
  height: 24,
  width: 24,
};

export default Team;
