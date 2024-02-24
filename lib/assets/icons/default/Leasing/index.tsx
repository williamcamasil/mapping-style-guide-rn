import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Leasing: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M17.048 19.86h-.97l-.01-.001c-.27-.01-.53.05-.77.16l-3.88 1.76m1.552-5.359 1 .91-.01-.01c.61.55.65 1.5.1 2.11-.04.03-.07.06-.1.09l-2.14 1.95v-.01c-.71.64-1.78.64-2.49 0l-1.29-1.17a1.97 1.97 0 0 0-1.14-.5M3 10.71l7.93-6.81v-.01c.61-.53 1.51-.53 2.12 0l7.93 6.8m-1.27-1.08v-5.8c0-.46-.37-.82-.82-.82h-2.47c-.46 0-.82.36-.82.81v2.28M21 14h-2.51c-.83 0-1.5.67-1.5 1.5v4c0 .82.67 1.49 1.5 1.49h2.49M3 21h2.5-.01c.82 0 1.5-.68 1.5-1.5v-4.01c0-.83-.68-1.5-1.5-1.5H2.98m14.52.37-3.16-1.4c-.57-.25-1.23-.2-1.75.14l-2.41 1.55v-.01c-.65.41-.83 1.27-.41 1.91a1.374 1.374 0 0 0 1.74.49l1.43-.67M6.918 15l2.22-.81h-.01c.51-.18 1.07-.13 1.54.15"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Leasing.defaultProps = {
  height: 24,
  width: 24,
};

export default Leasing;
