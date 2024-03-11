import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const SelectAccount: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M20 16c-1.595 3.082-4.664 5-8 5a9 9 0 0 1-9-9v.001C3 16.971 7.052 21 12.05 21A9.058 9.058 0 0 0 20 16.301M20 16h-4m4 0v4M4 8c1.595-3.082 4.664-5 8-5a9 9 0 0 1 9 9 8.99 8.99 0 0 0-4.724-7.904C11.885 1.721 6.389 3.334 4 7.698M4 8h4M4 8V4"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

SelectAccount.defaultProps = {
  height: 24,
  width: 24,
};

export default SelectAccount;
