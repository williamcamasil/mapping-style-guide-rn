import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Package: React.FC<SvgProps> = ({ color, ...others }) => (
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
      d="M14 20H5.125A2.124 2.124 0 0 1 3 17.875V7.855c0-.287.058-.572.171-.835l1.167-2.73A2.125 2.125 0 0 1 6.292 3h10.417c.851 0 1.619.508 1.954 1.29l1.167 2.73c.112.264.17.548.17.835V12m-8.5-9v4.44m8.457 0H3.043M6 16h2m10.944-.972-2.431 2.431L15.054 16M17 21a5 5 0 1 1 .001-10.001A5 5 0 0 1 17 21Z"
    />
  </Svg>
);

Package.defaultProps = {
  height: 24,
  width: 24,
};

export default Package;
