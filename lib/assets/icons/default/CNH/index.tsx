import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const CNH: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m5 15.5.149-.714c.156-.748.84-1.286 1.634-1.286h1.434c.795 0 1.478.538 1.634 1.286L10 15.5M14 9h5m-5 3h3m-3 3h1M5 21h14a4 4 0 0 0 4-4V7a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4ZM8.56 8.44a1.5 1.5 0 1 1-2.12 2.12 1.5 1.5 0 0 1 2.12-2.12Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

CNH.defaultProps = {
  height: 24,
  width: 24,
};

export default CNH;
