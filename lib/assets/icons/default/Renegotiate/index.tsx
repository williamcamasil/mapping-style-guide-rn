import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Renegotiate: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M4.424 4.406v2.387h2.389m-2.145 0A8.98 8.98 0 0 1 12 3a9 9 0 0 1 9 9c0 .539-.056 1.064-.147 1.576m-1.277 6.018v-2.387h-2.389m2.145 0A8.98 8.98 0 0 1 12 21a9 9 0 0 1-9-9c0-.539.056-1.064.147-1.576m8.763-1.287V8.5m0 6.364v.636m0-.636-.477.001c-.511 0-.933-.279-1.18-.684m1.657.683.569.001a1.34 1.34 0 0 0 .325-2.641l-1.79-.45a1.34 1.34 0 0 1 .326-2.639h1.047c.509 0 .931.279 1.177.683"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Renegotiate.defaultProps = {
  height: 24,
  width: 24,
};

export default Renegotiate;
