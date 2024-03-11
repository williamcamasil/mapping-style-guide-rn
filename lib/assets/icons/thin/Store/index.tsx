import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

const Store: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M19.875 11.46v7.28c0 1.24-1.01 2.25-2.25 2.25H6.375l-.01-.001a2.256 2.256 0 0 1-2.25-2.26v-7.29m15.585-.661a2.2 2.2 0 0 0 2.07-3.142l-1.718-3.377A2.358 2.358 0 0 0 17.938 3H6.062a2.361 2.361 0 0 0-2.115 1.259L2.231 7.636a2.2 2.2 0 0 0 2.07 3.142 2.39 2.39 0 0 0 2.565-2.163v-.048a2.409 2.409 0 0 0 2.566 2.211A2.409 2.409 0 0 0 12 8.567a2.409 2.409 0 0 0 2.566 2.211 2.409 2.409 0 0 0 2.566-2.211v.048a2.392 2.392 0 0 0 2.568 2.163ZM14 21v-3a2 2 0 0 0-4 0v3h4Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Store.defaultProps = {
  width: 24,
  height: 24,
};

export default Store;
