import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Billing: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m12.429 21.6 1.794-2.923h5.556c1.226 0 2.221-.965 2.221-2.154V5.754c0-1.19-.995-2.154-2.223-2.154H4.223C2.995 3.6 2 4.564 2 5.754v10.769c0 1.189.995 2.154 2.223 2.154h4.444M12 8.137V7.5m0 7.4v.636m-1.657-1.86c.247.405.669.684 1.18.684h1.046a1.34 1.34 0 0 0 .325-2.641l-1.79-.45a1.34 1.34 0 0 1 .326-2.64h1.047c.509 0 .93.28 1.177.684"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Billing.defaultProps = {
  height: 24,
  width: 24,
};

export default Billing;
