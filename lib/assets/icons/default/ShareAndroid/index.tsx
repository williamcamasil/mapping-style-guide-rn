import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const ShareAndroid: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m9.04 10.81 5.92-2.96m-5.92 5.34 5.92 2.96m-6.407-6.036a2.667 2.667 0 1 1-3.772 3.772 2.667 2.667 0 0 1 3.772-3.772Zm10.666-5.333a2.667 2.667 0 1 1-3.772 3.772 2.667 2.667 0 0 1 3.772-3.772Zm0 10.666a2.667 2.667 0 1 1-3.772 3.772 2.667 2.667 0 0 1 3.772-3.772Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

ShareAndroid.defaultProps = {
  height: 24,
  width: 24,
};

export default ShareAndroid;
