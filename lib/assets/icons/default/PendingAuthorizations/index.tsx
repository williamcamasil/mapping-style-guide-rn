import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const PendingAuthorizations: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M13.433 3.067c4.255.715 7.5 4.407 7.5 8.865a9 9 0 0 1-9 9c-4.458 0-8.15-3.245-8.865-7.5m0-2.999c.094-.565.241-1.11.436-1.634M6.197 5a8.937 8.937 0 0 0-1.199 1.198m5.435-3.13a8.897 8.897 0 0 0-1.634.438M12.391 7v5.391h-4.39"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

PendingAuthorizations.defaultProps = {
  height: 24,
  width: 24,
};

export default PendingAuthorizations;
