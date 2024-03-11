import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

const CopyAndPaste: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M5 16h-.556A1.445 1.445 0 0 1 3 14.556V4.444C3 3.647 3.647 3 4.444 3h10.111C15.353 3 16 3.647 16 4.444V5m3.556 16H9.444A1.445 1.445 0 0 1 8 19.556V9.444C8 8.647 8.647 8 9.444 8h10.111C20.353 8 21 8.647 21 9.444v10.111c0 .798-.647 1.445-1.444 1.445Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

CopyAndPaste.defaultProps = {
  width: 24,
  height: 24,
};

export default CopyAndPaste;
