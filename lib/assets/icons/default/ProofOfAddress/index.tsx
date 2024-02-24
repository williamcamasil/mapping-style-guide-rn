import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const ProofOfAddress: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M13.94 15.595v4.05-.01c-.01.74.6 1.35 1.34 1.35h4.5l-.01-.001c.74 0 1.35-.61 1.35-1.35v-4m.88.706-3.94-3.16a.903.903 0 0 0-1.13-.01l-3.94 3.15M8 15.5h2m-2-4h6m-6-4h8M11 21H6l-.01-.001c-1.11-.01-2-.9-2-2.01v-14c-.01-1.11.89-2.01 1.99-2.01h12-.01c1.1-.01 2 .89 2 1.99v6"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

ProofOfAddress.defaultProps = {
  height: 24,
  width: 24,
};

export default ProofOfAddress;
