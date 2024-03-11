import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const AlertFile = ({ color, ...others }: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M17 9V6.828C17 6.298 16.789 5.789 16.414 5.414L13.586 2.586C13.211 2.211 12.702 2 12.172 2H5C3.895 2 3 2.895 3 4V18C3 19.105 3.895 20 5 20H9M17 7H13C12.448 7 12 6.552 12 6V2M15.501 16.333V14.682M15.501 18.3329V18.32M15.5 21C13.015 21 11 18.985 11 16.5C11 14.015 13.015 12 15.5 12C17.986 12 20 14.015 20 16.5C20 18.985 17.986 21 15.5 21Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

AlertFile.defaultProps = {
  height: 24,
  width: 24,
};

export default AlertFile;
