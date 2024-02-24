import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const DeleteAccount: React.FC<SvgProps> = ({ color, ...others }) => (
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
      d="M4.863 5a9.994 9.994 0 0 0 0 14M19.137 5a9.994 9.994 0 0 1 0 14M10.5 10.5l3 3m0-3-3 3m8-1.498a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z"
    />
  </Svg>
);

DeleteAccount.defaultProps = {
  height: 24,
  width: 24,
};

export default DeleteAccount;
