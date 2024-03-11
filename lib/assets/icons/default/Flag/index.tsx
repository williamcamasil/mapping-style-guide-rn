import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Flag: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M11.097 12.903v1.786a.9.9 0 0 0 .903.903h4.152a.898.898 0 0 0 .854-1.188l-.501-1.501.5-1.511a.901.901 0 0 0-.853-1.188h-3.25m-5.397 2.699H12a.9.9 0 0 0 .903-.903V9.301A.9.9 0 0 0 12 8.398H8.398h.01a.9.9 0 0 0-.903.903v3.602Zm0 0v6.89M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Flag.defaultProps = {
  height: 24,
  width: 24,
};

export default Flag;
