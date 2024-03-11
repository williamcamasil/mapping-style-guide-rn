import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Edit: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    viewBox="0 0 16 16"
    fill="none"
    {...others}
  >
    <Path
      d="M13.333 7.407v4.741c0 .655-.53 1.185-1.185 1.185H3.852c-.655 0-1.185-.53-1.185-1.185V3.852c0-.655.53-1.185 1.185-1.185H8m-1.778 7.11 1.866-.23a.595.595 0 0 0 .347-.169l4.522-4.522a1.283 1.283 0 0 0-1.814-1.814l-4.48 4.48a.593.593 0 0 0-.168.336l-.273 1.92Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Edit.defaultProps = {
  height: 16,
  width: 16,
};

export default Edit;
