import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Pix: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m5.758 6.66-2.88 2.88a3 3 0 0 0 0 4.24l2.88 2.88 3.49-3.49a4.008 4.008 0 0 1 5.66 0l3.49 3.49 2.88-2.88a3 3 0 0 0 0-4.24l-2.9-2.88-3.48 3.48a4.008 4.008 0 0 1-5.66 0l-3.48-3.48Zm0 0 .65-.66 2.83-2.83a4.008 4.008 0 0 1 5.66 0L17.728 6l.67.66-3.49 3.49a4.008 4.008 0 0 1-5.66 0l-3.49-3.49Zm9.14 6.51a4.008 4.008 0 0 0-5.66 0l-3.49 3.49 3.49 3.49a4.008 4.008 0 0 0 5.66 0l3.49-3.49-3.49-3.49Z"
      stroke={color}
      strokeWidth={1.8}
      strokeMiterlimit={10}
    />
  </Svg>
);

Pix.defaultProps = {
  height: 24,
  width: 24,
};

export default Pix;
