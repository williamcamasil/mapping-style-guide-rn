import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const QRCode: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M14 16v-2m3.8 3.8h-2m5.7-9.822V4.5a2 2 0 0 0-2-2h-3.478M16.3 14h1.5M7.978 2.5H4.5a2 2 0 0 0-2 2v3.478m0 8.044V19.5a2 2 0 0 0 2 2h3.478m8.044 0H19.5a2 2 0 0 0 2-2v-3.478M6.196 6.196H10V10H6.196V6.196ZM6.12 14.12H10V18H6.12v-3.88Zm11.76-4.24H14V6h3.88v3.88Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

QRCode.defaultProps = {
  height: 24,
  width: 24,
};

export default QRCode;
