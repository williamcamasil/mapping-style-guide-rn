import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Microphone: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M18.9 10a.9.9 0 1 0-1.8 0h1.8Zm-12 0a.9.9 0 1 0-1.8 0h1.8Zm4.2 11a.9.9 0 1 0 1.8 0h-1.8Zm-3.28-.9a.9.9 0 1 0 0 1.8v-1.8Zm8.36 1.8a.9.9 0 1 0 0-1.8v1.8ZM12 14.1A2.1 2.1 0 0 1 9.9 12H8.1a3.9 3.9 0 0 0 3.9 3.9v-1.8ZM9.9 12V6H8.1v6h1.8Zm0-6c0-1.16.94-2.1 2.1-2.1V2.1A3.9 3.9 0 0 0 8.1 6h1.8ZM12 3.9c1.16 0 2.1.94 2.1 2.1h1.8A3.9 3.9 0 0 0 12 2.1v1.8ZM14.1 6v6h1.8V6h-1.8Zm0 6a2.1 2.1 0 0 1-2.1 2.1v1.8a3.9 3.9 0 0 0 3.9-3.9h-1.8Zm3-2v2h1.8v-2h-1.8Zm0 2a5.1 5.1 0 0 1-5.1 5.1v1.8a6.9 6.9 0 0 0 6.9-6.9h-1.8ZM12 17.1A5.1 5.1 0 0 1 6.9 12H5.1a6.9 6.9 0 0 0 6.9 6.9v-1.8ZM6.9 12v-2H5.1v2h1.8Zm4.2 6v3h1.8v-3h-1.8Zm-3.28 3.9h8.36v-1.8H7.82v1.8Z"
      fill={color}
    />
  </Svg>
);

Microphone.defaultProps = {
  height: 24,
  width: 24,
};

export default Microphone;
