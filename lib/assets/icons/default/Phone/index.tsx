import React from 'react';

import Svg, {
  Path, SvgProps,
} from 'react-native-svg';

type PhonePropsType = SvgProps;

const Phone: React.FC<PhonePropsType> = ({
  color,
  ...others
}) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M9.375 3v2.025c0 .372.252.675.563.675h3.374c.311 0 .563-.303.563-.675V3m-3.51 15.188h2.52M8.25 3H15a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 15 21H8.25A2.25 2.25 0 0 1 6 18.75V5.25A2.25 2.25 0 0 1 8.25 3Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Phone.defaultProps = {
  width: 24,
  height: 24,
};

export default Phone;
