import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Shorten: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    viewBox="0 0 16 16"
    fill="none"
    {...others}
  >
    <Path
      d="M12 9a1 1 0 1 0 0-2v2ZM4 7a1 1 0 0 0 0 2V7Zm8 0H4v2h8V7Z"
      fill={color}
    />
  </Svg>
);

Shorten.defaultProps = {
  height: 16,
  width: 16,
};

export default Shorten;
