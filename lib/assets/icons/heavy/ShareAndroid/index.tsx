import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const ShareAndroid: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m8.67 10.661 6.66-3.33M8.67 13.34l6.66 3.33m-7.208-6.79a3 3 0 1 1-4.243 4.243 3 3 0 0 1 4.243-4.244Zm12-6a3 3 0 1 1-4.244 4.243 3 3 0 0 1 4.243-4.243Zm0 11.999a3 3 0 1 1-4.244 4.243 3 3 0 0 1 4.243-4.243Z"
      stroke={color}
      strokeWidth={2.2}
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
