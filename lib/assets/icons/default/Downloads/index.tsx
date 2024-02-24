import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Downloads: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m12 13.33-1.78-1.77M12 13.33l1.78-1.77M12 13.33V8m4 6.222c0 .982-.796 1.778-1.778 1.778H9.778A1.778 1.778 0 0 1 8 14.222M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Downloads.defaultProps = {
  height: 24,
  width: 24,
};

export default Downloads;
