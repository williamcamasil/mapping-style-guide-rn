import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Justice: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M5.529 5.176H18.47M12.054 4v13.765M5.638 5.177l-3.05 6.47H8.47l-2.832-6.47Zm12.941 0-3.05 6.47h5.883l-2.833-6.47ZM2 11.646c.11.588.618 1.883 1.765 2.353h3.419c.551-.274 1.698-1.13 1.875-2.353H2Zm13.53 8.47c-.12-.587-.523-1.882-1.766-2.352h-3.53c-.597.274-1.573 1.13-1.764 2.353h7.06Zm-.589-8.47c.11.588.618 1.883 1.765 2.353h3.419c.552-.274 1.698-1.13 1.875-2.353h-7.059Z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

Justice.defaultProps = {
  height: 24,
  width: 24,
};

export default Justice;
