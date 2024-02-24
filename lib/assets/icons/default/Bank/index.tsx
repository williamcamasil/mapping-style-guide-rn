import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Bank: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M4 18v-7.667m16 0V18M8 10.333V18m4-7.667V18m4-7.667V18m4.972-7.667H3.028a.527.527 0 0 1-.528-.526V7.83a1 1 0 0 1 .684-.948l8.482-2.828a1.06 1.06 0 0 1 .668 0l8.482 2.828a1 1 0 0 1 .684.948v1.976a.527.527 0 0 1-.527.527h-.001ZM20.382 18H3.618a1 1 0 0 0-.894.553l-.618 1.236a.993.993 0 0 0-.106.447V21h20v-.764a.993.993 0 0 0-.106-.447l-.618-1.236a1 1 0 0 0-.894-.553Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Bank.defaultProps = {
  height: 24,
  width: 24,
};

export default Bank;
