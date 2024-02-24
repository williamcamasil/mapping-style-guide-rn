import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Plus: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M12 9.167v5.666M9.167 12h5.666m.945 8.5H8.222A4.722 4.722 0 0 1 3.5 15.778V8.222A4.722 4.722 0 0 1 8.222 3.5h7.556A4.722 4.722 0 0 1 20.5 8.222v7.556a4.722 4.722 0 0 1-4.722 4.722Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Plus.defaultProps = {
  height: 24,
  width: 24,
};

export default Plus;
