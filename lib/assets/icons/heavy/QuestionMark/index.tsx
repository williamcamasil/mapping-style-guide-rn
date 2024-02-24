import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const QuestionMark: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M12.388 13.865v-.49c0-.552.46-.983.982-1.164a2.99 2.99 0 0 0-.982-5.811A2.988 2.988 0 0 0 9.4 9.388m3.007 7.712v.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z"
      stroke={color}
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
QuestionMark.defaultProps = {
  height: 24,
  width: 24,
};

export default QuestionMark;
