import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const PasswordShield: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.5 8h.06M12 8h.06m4.44 0h.06M9 13H5a1.999 1.999 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5m-8 4.938v1.131a5 5 0 0 0 3.244 4.682l.58.217a.5.5 0 0 0 .352 0l.58-.217A5 5 0 0 0 21 16.069v-1.131a1 1 0 0 0-.702-.955l-3-.938a1 1 0 0 0-.596 0l-3 .938a1 1 0 0 0-.702.954Z"
    />
  </Svg>
);

PasswordShield.defaultProps = {
  height: 24,
  width: 24,
};

export default PasswordShield;
