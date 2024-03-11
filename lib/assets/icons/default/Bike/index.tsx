import * as React from 'react';

import Svg, { G, Path, SvgProps } from 'react-native-svg';

type BikePropsType = SvgProps;

const Bike: React.FC<BikePropsType> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <G clipPath="url(#a)">
      <Path
        d="M5.028 14.526 8.056 6m.36 1.886h2.942c1.644 0 2.942 1.312 2.942 2.87H7.38m11.593 3.77-2.163-2.05m-7.7 2.132h2.25c.26 0 .606-.164.779-.328l4.773-5.63h3.51M2 14.526c0 1.63 1.356 2.952 3.028 2.952 1.673 0 3.028-1.322 3.028-2.952s-1.355-2.951-3.028-2.951C3.356 11.575 2 12.896 2 14.526Zm13.944 0c0 1.63 1.355 2.952 3.028 2.952 1.672 0 3.028-1.322 3.028-2.952s-1.356-2.951-3.028-2.951c-1.673 0-3.028 1.321-3.028 2.951ZM3.197 9.703h.865c.778 0 1.47-.656 1.47-1.394 0-.738-.692-1.394-1.47-1.394h-.865v2.788Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

Bike.defaultProps = {
  width: 24,
  height: 24,
};

export default Bike;
