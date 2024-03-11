import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const PinLocation: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M10 9.955a2 2 0 1 0 4 0v-.037a2 2 0 1 0-4 0m-4.873.127v-.172a6.873 6.873 0 1 1 13.746 0v.172c0 3.461-4.382 8.671-6.148 10.631a.973.973 0 0 1-1.45 0c-1.766-1.96-6.148-7.17-6.148-10.631Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

PinLocation.defaultProps = {
  height: 24,
  width: 24,
};

export default PinLocation;
