import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const RG: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m9.5 12.5.149-.714c.156-.748.84-1.286 1.634-1.286h1.434c.795 0 1.478.538 1.634 1.286l.149.714M10 17h4m-3 2.5h2m-5 2.056h8a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v11.556a4 4 0 0 0 4 4Zm5.06-16.117a1.5 1.5 0 1 1-2.121 2.122 1.5 1.5 0 0 1 2.122-2.122Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

RG.defaultProps = {
  height: 24,
  width: 24,
};

export default RG;
