import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Attach: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m16.68 9.32-6.387 6.387v0a1 1 0 0 1-.707.293H8v0a1 1 0 0 1-1-1v-1.586 0c0-.265.104-.52.29-.71l7.03-7.19v0a3.884 3.884 0 0 1 5.524-.03l.072.071v0a3.945 3.945 0 0 1-.016 5.617 1273.717 1273.717 0 0 0-7.438 7.37v0A5 5 0 0 1 8.931 20H6v0a3 3 0 0 1-3-3v0-2.929 0a5 5 0 0 1 1.464-3.535L10.68 4.32"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Attach.defaultProps = {
  height: 24,
  width: 24,
};

export default Attach;
