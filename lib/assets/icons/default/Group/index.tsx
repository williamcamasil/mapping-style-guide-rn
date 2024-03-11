import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Group: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M22 19v-1.096a2.5 2.5 0 0 0-2.5-2.5h-.8M2 19v-1.096a2.5 2.5 0 0 1 2.5-2.5h.801M17.339 21v-4.601a3.5 3.5 0 0 0-3.5-3.5H10.16a3.5 3.5 0 0 0-3.5 3.5V21M19.792 9.524a2.023 2.023 0 1 1-2.86 2.86 2.023 2.023 0 0 1 2.86-2.86Zm-5.59-4.612a3.115 3.115 0 1 1-4.405 4.406 3.115 3.115 0 0 1 4.405-4.406ZM7.07 9.524a2.023 2.023 0 1 1-2.861 2.86 2.023 2.023 0 0 1 2.86-2.86Z"
      stroke={color}
      strokeWidth={1.8}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Group.defaultProps = {
  height: 24,
  width: 24,
};

export default Group;
