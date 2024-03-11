import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

type LoanPropsType = SvgProps;

const Loan: React.FC<LoanPropsType> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M7 20v-6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1Zm0 0h1.508c.327 0 .652.04.969.12l2.65.662a3.999 3.999 0 0 0 1.755.042l2.93-.586a4.004 4.004 0 0 0 2.044-1.094l2.073-2.073a1.514 1.514 0 0 0-1.98-2.283L16.533 16.6c-.346.26-.767.4-1.2.4H13h1.485c.837 0 1.515-.678 1.515-1.515v-.303c0-.695-.473-1.301-1.147-1.469l-2.292-.573a4.705 4.705 0 0 0-3.744.649L7 15m3.667-5h8.667C20.254 10 21 9.254 21 8.333V3.667C21 2.746 20.254 2 19.333 2h-8.667C9.746 2 9 2.746 9 3.667v4.667C9 9.254 9.746 10 10.667 10Zm5.394-5.061a1.5 1.5 0 1 1-2.122 2.122 1.5 1.5 0 0 1 2.122-2.122Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Loan.defaultProps = {
  width: 24,
  height: 24,
};

export default Loan;
