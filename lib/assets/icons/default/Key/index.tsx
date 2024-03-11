import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Key: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M8 10.41V5.5a2.5 2.5 0 1 1 5 0v.572m0 0a5 5 0 0 1 5 5c0 .625-.128 1.217-.338 1.768l3.044 3.04a1 1 0 0 1 .294.708V18a1 1 0 0 1-1 1h-1.417c-.264 0-.518-.105-.706-.292l-3.009-3.005a4.96 4.96 0 0 1-1.868.369 4.972 4.972 0 0 1-2.838-.89M13 6.073a4.94 4.94 0 0 0-2.176.518m-4.82 8.678a4.971 4.971 0 0 1-1.539-1.038 5 5 0 0 1 0-7.071 5 5 0 0 1 7.071 0 5 5 0 0 1 0 7.071 4.975 4.975 0 0 1-1.532 1.034l.003 4.237a1 1 0 0 1-.293.708l-.998.998a.999.999 0 0 1-1.414 0L6.3 20.205a1 1 0 0 1-.293-.706l-.003-4.231Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Key.defaultProps = {
  height: 24,
  width: 24,
};

export default Key;
