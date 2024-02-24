import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const BankAccount: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M15.643 9v8M20 17V9m-6 11h8v-1l-1-2h-9m-2.368 4H3.474A.474.474 0 0 1 3 20.526v-.384a1.989 1.989 0 0 1 1.984-1.984h3.137a1.99 1.99 0 0 1 1.984 1.984v.384a.474.474 0 0 1-.473.474Zm-3.079-5.211a1.895 1.895 0 1 1 .007 0h-.007ZM4 9h18V5.928L13 2 4 5.928V9Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

BankAccount.defaultProps = {
  height: 24,
  width: 24,
};

export default BankAccount;
