import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const ShareIOS: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M4 11.4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8m-7.999 4.328L11.927 3m0 0 4.978 4.92M11.927 3l-4.92 4.978"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

ShareIOS.defaultProps = {
  height: 24,
  width: 24,
};

export default ShareIOS;
