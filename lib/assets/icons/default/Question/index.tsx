import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Question: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M12.35 13.679v-.44c0-.498.413-.886.883-1.05A2.69 2.69 0 1 0 9.66 9.65m2.707 6.941v.009M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      stroke={color}
      strokeWidth={1.8}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Question.defaultProps = {
  height: 24,
  width: 24,
};

export default Question;
