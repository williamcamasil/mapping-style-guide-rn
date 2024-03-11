import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Press: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M14 6v9m-8 0 1.529 3.858c.273.69.935 1.142 1.67 1.142 1.271 0 2.141-1.294 1.672-2.487L9.882 15m4.116 0L7 14.998c-2.209 0-4-1.792-4-4.002v-.997a4 4 0 0 1 4.001-4.001h6.998l3.872-2.646C19.199 2.445 21 3.396 21 5.004v10.992c0 1.608-1.802 2.559-3.129 1.651L13.998 15Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Press.defaultProps = {
  height: 24,
  width: 24,
};

export default Press;
