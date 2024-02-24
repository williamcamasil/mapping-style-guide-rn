import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Home: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M9.682 20.062v-3.286c0-.815.803-1.483 1.8-1.483h1.028c.997 0 1.8.668 1.8 1.483v3.286m4.977-11.361V4.62h-2.983v1.714M4.195 9.272l5.85-4.599a3.187 3.187 0 0 1 3.918 0l5.842 4.599c.44.34.695.86.695 1.401v8.003c0 1-.842 1.81-1.886 1.81H5.386c-1.043 0-1.885-.81-1.885-1.81v-8.003c0-.541.255-1.06.695-1.401Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Home.defaultProps = {
  height: 24,
  width: 24,
};

export default Home;
