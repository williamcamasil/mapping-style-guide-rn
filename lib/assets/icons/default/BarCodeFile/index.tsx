import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const BarCodeFile: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M20 8h-4a1 1 0 0 1-1-1V3M7.5 13v4m3-3v3m3-3v3m3-4v4M6 3h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 20 7.828V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
      stroke={color}
      strokeWidth={1.8}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

BarCodeFile.defaultProps = {
  height: 24,
  width: 24,
};

export default BarCodeFile;
