import * as React from 'react';

import Svg, {
  SvgProps, Path, G,
} from 'react-native-svg';

const Transactions: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    {...others}
  >
    <G>
      <Path
        d="M16.103 10.793 19 7.897 16.103 5M5 7.9h14M7.897 13.207 5 16.103 7.897 19M19 16.1H5"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

Transactions.defaultProps = {
  height: 24,
  width: 24,
};

export default Transactions;
