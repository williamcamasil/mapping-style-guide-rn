import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Pause: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M13.1 15a.9.9 0 1 0 1.8 0h-1.8Zm1.8-6a.9.9 0 1 0-1.8 0h1.8Zm-5.8 6a.9.9 0 1 0 1.8 0H9.1Zm1.8-6a.9.9 0 1 0-1.8 0h1.8Zm4 6V9h-1.8v6h1.8Zm-4 0V9H9.1v6h1.8Zm9.2-3a8.1 8.1 0 0 1-8.1 8.1v1.8c5.468 0 9.9-4.432 9.9-9.9h-1.8ZM12 20.1A8.1 8.1 0 0 1 3.9 12H2.1c0 5.468 4.432 9.9 9.9 9.9v-1.8ZM3.9 12A8.1 8.1 0 0 1 12 3.9V2.1c-5.468 0-9.9 4.432-9.9 9.9h1.8ZM12 3.9a8.1 8.1 0 0 1 8.1 8.1h1.8c0-5.468-4.432-9.9-9.9-9.9v1.8Z"
      fill={color}
    />
  </Svg>
);

Pause.defaultProps = {
  height: 24,
  width: 24,
};

export default Pause;
