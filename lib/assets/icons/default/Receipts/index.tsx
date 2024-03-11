import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Receipts: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m15.2 12-4 4-2.4-2.4M19 8h-4a1 1 0 0 1-1-1V3m4.414 3.414-2.828-2.828A2 2 0 0 0 14.172 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.828a2 2 0 0 0-.586-1.414Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Receipts.defaultProps = {
  height: 24,
  width: 24,
};

export default Receipts;
