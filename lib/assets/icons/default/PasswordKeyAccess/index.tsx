import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const PasswordKeyAccess: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M7.5 8h.06M12 8h.06m4.44 0h.06M10 13H5a1.999 1.999 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3m-3.4 7.3h.06m-4.017 1.383-2.328 2.333a1.086 1.086 0 0 0-.315.763v1.142A1.078 1.078 0 0 0 12.079 22h1.147a1.072 1.072 0 0 0 .762-.317l2.324-2.329a4.294 4.294 0 1 0-2.669-2.671Z"
    />
  </Svg>
);

PasswordKeyAccess.defaultProps = {
  height: 24,
  width: 24,
};

export default PasswordKeyAccess;
