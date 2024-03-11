import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Protection: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="m15.656 9.661-4.219 4.255-2.53-2.553M21 10.861c0 5.152-3.84 9.97-9 11.139-5.16-1.17-9-5.987-9-11.14V6.815c0-.922.552-1.752 1.398-2.1l5.625-2.322a5.176 5.176 0 0 1 3.954 0l5.625 2.322A2.27 2.27 0 0 1 21 6.814v4.047Z"
    />
  </Svg>
);

Protection.defaultProps = {
  height: 24,
  width: 24,
};

export default Protection;
