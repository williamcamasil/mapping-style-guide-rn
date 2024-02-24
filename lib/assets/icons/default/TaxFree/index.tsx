import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const TaxFree: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m7.045 4.496 1.446 2.19m8.464 12.818-1.446-2.19m-5.243-3.025c.258.423.7.714 1.233.714h1.096a1.404 1.404 0 0 0 .342-2.766l-1.874-.47A1.405 1.405 0 0 1 11.404 9H12.5c.533 0 .975.292 1.233.714M12 8v1m0 7v-1m8.863-4.563a9 9 0 1 1-17.727 3.125 9 9 0 0 1 17.727-3.125Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

TaxFree.defaultProps = {
  height: 24,
  width: 24,
};

export default TaxFree;
