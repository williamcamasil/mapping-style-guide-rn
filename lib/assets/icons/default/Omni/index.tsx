import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Mapping: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M15.13 15.775c3.795-2.215 5.02-5.904 2.74-8.238a4.943 4.943 0 0 0-.724-.608C20.074 7.92 22 9.602 22 11.509c0 2.854-4.316 5.203-9.852 5.491a11.815 11.815 0 0 0 2.983-1.225ZM6.648 16.017C3.835 15.017 2 13.37 2 11.509 2 8.586 6.525 6.193 12.25 6c-1.16.26-2.315.699-3.38 1.321-3.794 2.215-5.02 5.904-2.74 8.238.16.164.333.316.518.458Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Mapping.defaultProps = {
  height: 24,
  width: 24,
};

export default Mapping;
