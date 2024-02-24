import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Planet: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M12 3a9 9 0 0 1 9 9m-9-9a9 9 0 0 0-9 9m9-9a2.11 2.11 0 0 1 1.83 1.06 15.63 15.63 0 0 1 0 15.88A2.11 2.11 0 0 1 12 21m0-18a2.11 2.11 0 0 0-1.83 1.06 15.63 15.63 0 0 0 0 15.88A2.11 2.11 0 0 0 12 21m9-9a9 9 0 0 1-9 9m9-9H3m9 9a9 9 0 0 1-9-9"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Planet.defaultProps = {
  height: 24,
  width: 24,
};

export default Planet;
