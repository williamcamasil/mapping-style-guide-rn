import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

const Clock = ({ color, ...others }: SvgProps) => (
  <Svg
    viewBox="0 0 12 12"
    fill="none"
    {...others}
  >
    <Path
      d="M6.716 1.533a4.497 4.497 0 11-5.182 5.183m0-1.5c.047-.282.12-.555.218-.817m1.346-1.9c-.218.18-.419.38-.6.6m2.718-1.566a4.448 4.448 0 00-.817.22M6.195 3.5v2.695H4"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Clock.defaultProps = {
  height: 12,
  width: 12,
};

export default Clock;
