import * as React from 'react';

import Svg, {
  G, Path, SvgProps,
} from 'react-native-svg';

type MyAccountPropsType = SvgProps;

const MyAccount: React.FC<MyAccountPropsType> = ({ color, ...others }) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    {...others}
  >
    <G clipPath="url(#a)">
      <Path
        d="M3.975 16.025A8.93 8.93 0 0 1 3 12c0-4.974 4.026-9 9-9s9 4.026 9 9c0 1.45-.363 2.81-.977 4.023M6 18.584a8.62 8.62 0 0 1 6.023-2.463c2.308 0 4.408.919 5.977 2.416A8.62 8.62 0 0 1 11.977 21C9.669 21 7.569 20.081 6 18.584Zm8.121-10.705A3 3 0 1 1 9.88 12.12 3 3 0 0 1 14.12 7.88Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

MyAccount.defaultProps = {
  width: 24,
  height: 24,
};

export default MyAccount;
