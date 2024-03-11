import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Supermarket: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m7.409 14.246.88-.186-.88.186ZM19.47 8.243l-.873-.218.873.218Zm-1.348 5.392.873.219-.873-.219Zm-1.741 1.505-.09-.896.09.896Zm-6.816.682.089.896-.089-.896ZM5.224 4l.88-.19a.9.9 0 0 0-.88-.71V4ZM3.5 3.1a.9.9 0 1 0 0 1.8V3.1Zm13.35 16.274a.9.9 0 1 0 1.8 0h-1.8Zm.525-.374v-.9h-.004l.004.9Zm0 .75v-.9h-.004l.004.9Zm1.275-.375a.9.9 0 1 0-1.8 0h1.8Zm-10.8-.001a.9.9 0 1 0 1.8 0h-1.8ZM8.375 19v-.9h-.004l.004.9Zm0 .75v-.9h-.004l.004.9Zm1.275-.375a.9.9 0 1 0-1.8 0h1.8Zm-1.36-5.316L6.753 6.813l-1.76.374 1.535 7.245 1.76-.373ZM5.873 7.9H18.5V6.1H5.874v1.8Zm12.626 0a.1.1 0 0 1 .097.125l1.746.436A1.9 1.9 0 0 0 18.5 6.1v1.8Zm.097.125-1.348 5.392 1.746.436 1.348-5.392-1.746-.436Zm-1.348 5.391a1.1 1.1 0 0 1-.958.829l.18 1.79a2.9 2.9 0 0 0 2.524-2.181l-1.746-.438Zm-.958.829-6.816.682.18 1.79 6.816-.681-.18-1.792Zm-6.815.681a1.1 1.1 0 0 1-1.186-.866l-1.762.372a2.9 2.9 0 0 0 3.126 2.286l-.178-1.792ZM6.754 6.81l-.65-3-1.76.382.65 3 1.76-.382ZM5.224 3.1H3.5v1.8h1.724V3.1ZM18.65 19.374c0-.707-.574-1.274-1.275-1.274v1.8a.526.526 0 0 1-.525-.526h1.8ZM17.37 18.1c-.7.003-1.27.571-1.27 1.276h1.8c0 .29-.235.523-.52.524l-.01-1.8Zm-1.27 1.276c0 .703.571 1.277 1.28 1.274l-.01-1.8a.526.526 0 0 1 .53.526h-1.8Zm1.275 1.274c.704 0 1.275-.57 1.275-1.275h-1.8c0-.29.235-.525.525-.525v1.8ZM9.65 19.374c0-.707-.574-1.274-1.275-1.274v1.8a.526.526 0 0 1-.525-.526h1.8ZM8.37 18.1c-.7.003-1.27.571-1.27 1.276h1.8c0 .29-.235.523-.52.524l-.01-1.8ZM7.1 19.376c0 .703.571 1.277 1.28 1.274l-.01-1.8a.526.526 0 0 1 .53.526H7.1Zm1.275 1.274c.704 0 1.275-.57 1.275-1.275h-1.8c0-.29.235-.525.525-.525v1.8Z"
      fill={color}
    />
  </Svg>
);

Supermarket.defaultProps = {
  height: 24,
  width: 24,
};

export default Supermarket;
