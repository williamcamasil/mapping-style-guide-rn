import * as React from 'react';

import Svg, { Path, SvgProps } from 'react-native-svg';

const Search: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m21 21-4.34-4.34m-.003-11.317A8 8 0 1 1 5.343 16.657 8 8 0 0 1 16.657 5.343Z"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Search.defaultProps = {
  width: 24,
  height: 24,
};

export default Search;
