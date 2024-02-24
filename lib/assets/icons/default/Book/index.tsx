import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Book: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M17 18.9a.9.9 0 1 0 0-1.8v1.8ZM6 17.1a.9.9 0 1 0 0 1.8v-1.8ZM21.9 5a.9.9 0 1 0-1.8 0h1.8ZM17 17.1H6v1.8h11v-1.8ZM3.9 18V6H2.1v12h1.8Zm0-12c0-1.16.94-2.1 2.1-2.1V2.1A3.9 3.9 0 0 0 2.1 6h1.8ZM6 3.9h10V2.1H6v1.8Zm10 0A1.1 1.1 0 0 1 17.1 5h1.8A2.9 2.9 0 0 0 16 2.1v1.8ZM17.1 5v9h1.8V5h-1.8Zm0 9a.1.1 0 0 1-.1.1v1.8a1.9 1.9 0 0 0 1.9-1.9h-1.8Zm-.1.1H6v1.8h11v-1.8Zm-11 0A3.9 3.9 0 0 0 2.1 18h1.8c0-1.16.94-2.1 2.1-2.1v-1.8ZM2.1 18A3.9 3.9 0 0 0 6 21.9v-1.8A2.1 2.1 0 0 1 3.9 18H2.1ZM6 21.9h13v-1.8H6v1.8Zm13 0a2.9 2.9 0 0 0 2.9-2.9h-1.8a1.1 1.1 0 0 1-1.1 1.1v1.8Zm2.9-2.9V5h-1.8v14h1.8Z"
      fill={color}
    />
  </Svg>
);

Book.defaultProps = {
  height: 24,
  width: 24,
};

export default Book;
