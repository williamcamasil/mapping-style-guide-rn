import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

type BikePropsType = SvgProps;

const Bike: React.FC<BikePropsType> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 32 32"
    {...others}
  >
    <Path
      d="M6.704 19.368 10.742 8m.48 2.514h3.923c2.192 0 3.922 1.75 3.922 3.826H9.838m15.458 5.028-2.884-2.732m-10.266 2.842h3c.346 0 .807-.219 1.038-.438l6.364-7.507h4.68M2.667 19.368c0 2.174 1.807 3.936 4.037 3.936s4.038-1.762 4.038-3.936c0-2.173-1.808-3.935-4.038-3.935-2.23 0-4.037 1.762-4.037 3.935Zm18.592 0c0 2.174 1.807 3.936 4.037 3.936s4.038-1.762 4.038-3.936c0-2.173-1.808-3.935-4.038-3.935-2.23 0-4.037 1.762-4.037 3.935ZM4.262 12.937h1.154c1.038 0 1.961-.875 1.961-1.858 0-.984-.923-1.859-1.961-1.859H4.262v3.717Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Bike.defaultProps = {
  width: 32,
  height: 32,
};

export default Bike;
