import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const PasswordLock: React.FC<SvgProps> = ({ color, ...others }) => (
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
      d="M7.5 8h.06M12 8h.06m4.44 0h.06M11 13H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3m-1.607 7.696v-1.734a1.963 1.963 0 0 0-3.926 0v1.734m4.533.002h-5a1 1 0 0 0-1 1V20a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3.302a1 1 0 0 0-1-1Z"
    />
  </Svg>
);

PasswordLock.defaultProps = {
  height: 24,
  width: 24,
};

export default PasswordLock;
