import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Transfers: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M11 19h3a5 5 0 0 0 5-5V5m0 0-2.5 2.5M19 5l2.5 2.5M13 5h-3a5 5 0 0 0-5 5v9m0 0 3-3m-3 3-3-3"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Transfers.defaultProps = {
  height: 24,
  width: 24,
};

export default Transfers;
