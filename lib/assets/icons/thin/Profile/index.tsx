import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

const Profile: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M5 20a4.447 4.447 0 0 1 4.447-4.447h5.106A4.447 4.447 0 0 1 19 20M15.005 5.245a4.25 4.25 0 1 1-6.01 6.01 4.25 4.25 0 0 1 6.01-6.01Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Profile.defaultProps = {
  width: 24,
  height: 24,
};

export default Profile;
