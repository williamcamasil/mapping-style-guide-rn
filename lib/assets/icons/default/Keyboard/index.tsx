import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Keyboard: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M8.5 16.5h7m-3.25-4h-.01c-.01.13-.12.24-.26.24a.263.263 0 0 1-.25-.26c0-.14.11-.25.24-.25h-.01c.13-.01.25.11.25.24m-3.96.03h-.01c-.01.13-.12.24-.26.24a.263.263 0 0 1-.25-.26c0-.14.11-.25.24-.25h-.01c.13-.01.25.11.25.24m8.04.03h-.01c-.01.13-.12.24-.26.24a.263.263 0 0 1-.25-.26c0-.14.11-.25.24-.25h-.01c.13-.01.25.11.25.24m.04-3.97h-.01c-.01.13-.12.24-.26.24a.263.263 0 0 1-.25-.26c0-.14.11-.25.24-.25h-.01c.13-.01.25.11.25.24m-3.96.03h-.01c-.01.13-.12.24-.26.24a.263.263 0 0 1-.25-.26c0-.14.11-.25.24-.25h-.01c.13-.01.25.11.25.24m-3.96.03h-.01c-.01.13-.12.24-.26.24a.263.263 0 0 1-.25-.26c0-.14.11-.25.24-.25h-.01c.13-.01.25.11.25.24M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Z"
    />
  </Svg>
);

Keyboard.defaultProps = {
  height: 24,
  width: 24,
};

export default Keyboard;
