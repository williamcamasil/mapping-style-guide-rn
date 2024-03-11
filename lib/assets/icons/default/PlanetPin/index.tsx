import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const PlanetPin: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M11.53 4.52C6.78 4.77 3 8.68 3 13.5s4.03 9 9 9a9 9 0 0 0 9-9 8.93 8.93 0 0 0-2.98-6.67M8 21.57v-.07c0-2 4-1.76 4-4 0-2-3-2-3-5 0-2.83-2-3-5-3h-.06m14.03 10.72c-.15-.06-.3-.12-.44-.2a3.007 3.007 0 0 1-1.08-4.12 3.007 3.007 0 0 1 4.12-1.08c.11.06.2.14.29.21M15 10.5s3.5-2.87 3.5-5.5c0-1.93-1.57-3.5-3.5-3.5S11.5 3.07 11.5 5c0 2.62 3.5 5.5 3.5 5.5Zm0-5.65c.14 0 .25.11.25.25s-.11.25-.25.25-.25-.11-.25-.25.11-.25.25-.25Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

PlanetPin.defaultProps = {
  height: 24,
  width: 24,
};

export default PlanetPin;
