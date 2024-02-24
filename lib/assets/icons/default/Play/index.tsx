import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Play: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M17.83 10.884 7.22 4.157c-.73-.462-1.62.152-1.62 1.117v13.452c0 .966.89 1.58 1.62 1.117l10.61-6.727c.761-.48.761-1.75 0-2.232Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Play.defaultProps = {
  height: 24,
  width: 24,
};

export default Play;
