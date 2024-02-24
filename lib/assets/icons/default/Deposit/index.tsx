import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Deposit: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M16.563 6.496A3.1 3.1 0 0 1 18.25 6h1.056v2.696a6.316 6.316 0 0 1 1.716 2.513h.923c.582 0 1.055.473 1.055 1.056V15.5c0 .583-.473 1.056-1.055 1.056H20.56a6.37 6.37 0 0 1-2.311 2.312v1.91c0 .582-.473 1.055-1.055 1.055h-2.112a1.056 1.056 0 0 1-1.055-1.055v-1.056h-3.695v.916c0 .583-.473 1.056-1.055 1.056H7.167a1.056 1.056 0 0 1-1.056-1.055v-2.54A6.308 6.308 0 0 1 4 13.39a6.333 6.333 0 0 1 4.326-6.003M17 11.01V11M2.288 10a1.57 1.57 0 0 0-.788 1.358c0 .871.706 1.577 1.577 1.577H4M9.5 9h6m-.525-5.975a3.5 3.5 0 1 1-4.95 4.95 3.5 3.5 0 0 1 4.95-4.95Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Deposit.defaultProps = {
  height: 24,
  width: 24,
};

export default Deposit;
