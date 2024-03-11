import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

type WhatsAppPropsType = SvgProps;

const WhatsApp: React.FC<WhatsAppPropsType> = ({
  color,
  ...others
}) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    {...others}
  >
    <Path
      d="M7.886 12.291c1.965 1.966 4.454 3.219 5.935 1.745l.359-.36a1.082 1.082 0 0 0-.143-1.655c-.35-.243-.727-.505-1.143-.798a1.092 1.092 0 0 0-1.394.114l-.405.404c-.504-.319-1.001-.728-1.464-1.19l-.002-.002a8.667 8.667 0 0 1-1.19-1.463l.404-.406c.37-.374.417-.965.113-1.395-.292-.415-.554-.79-.796-1.14A1.081 1.081 0 0 0 6.504 6l-.36.36c-1.473 1.48-.22 3.968 1.744 5.934M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

WhatsApp.defaultProps = {
  width: 24,
  height: 24,
};

export default WhatsApp;
