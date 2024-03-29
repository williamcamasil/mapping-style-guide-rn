import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const Send: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="m5.323 19.878.379.817-.379-.817Zm14.43-6.699-.38-.816.38.816Zm0-2.36-.38.816.38-.816ZM5.322 4.122l.379-.816-.379.816ZM3.58 5.743l.848-.303-.848.303Zm2.233 6.254.848.302a.9.9 0 0 0 0-.605l-.848.303ZM3.58 18.258l.848.303-.848-.303ZM5.81 11.1a.9.9 0 1 0 0 1.8v-1.8Zm14.69 1.8a.9.9 0 0 0 0-1.8v1.8ZM5.702 20.694l14.43-6.699-.759-1.632-14.429 6.699.758 1.632Zm14.429-6.698c1.693-.786 1.693-3.208 0-3.993l-.758 1.633a.404.404 0 0 1 0 .727l.758 1.633Zm0-3.993L5.702 3.306l-.758 1.632 14.43 6.697.757-1.632ZM5.701 3.306c-1.784-.828-3.614.932-2.968 2.74l1.695-.606a.39.39 0 0 1 .516-.501l.758-1.633Zm-2.968 2.74L4.966 12.3l1.695-.606L4.428 5.44l-1.695.606Zm2.232 5.649-2.233 6.26 1.696.605L6.66 12.3l-1.696-.605Zm-2.232 6.26c-.647 1.808 1.184 3.567 2.969 2.74l-.758-1.633a.39.39 0 0 1-.516-.5l-1.695-.607ZM5.81 12.9H20.5v-1.8H5.81v1.8Z"
      fill={color}
    />
  </Svg>
);

Send.defaultProps = {
  height: 24,
  width: 24,
};

export default Send;
