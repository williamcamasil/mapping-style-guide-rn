import * as React from 'react';

import Svg, { SvgProps, Path } from 'react-native-svg';

const ListShield: React.FC<SvgProps> = ({ color, ...others }) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <Path
      d="M13 9H17M12 21H8C6.67392 21 5.40215 20.4732 4.46447 19.5355C3.52678 18.5979 3 17.3261 3 16V8C3 6.67392 3.52678 5.40215 4.46447 4.46447C5.40215 3.52678 6.67392 3 8 3H16C17.3261 3 18.5979 3.52678 19.5355 4.46447C20.4732 5.40215 21 6.67392 21 8V11M7 8.726L7.919 9.554L9.769 7.888M7 13.726L7.919 14.554L9.769 12.888M14 15.6953V16.6853C14 17.5759 14.2718 18.4453 14.7791 19.1773C15.2864 19.9093 16.0049 20.4691 16.8388 20.7818L17.3464 20.9721C17.4454 21.0092 17.5546 21.0092 17.6536 20.9721L18.1612 20.7818C18.995 20.4691 19.7136 19.9093 20.2209 19.1773C20.7282 18.4453 21 17.576 21 16.6854V15.6954C21 15.5089 20.9404 15.3273 20.83 15.1771C20.7195 15.0268 20.564 14.9158 20.386 14.8602L17.761 14.0399C17.5911 13.9868 17.4089 13.9868 17.239 14.0399L14.614 14.8602C14.436 14.9158 14.2805 15.0268 14.17 15.1771C14.0596 15.3273 14 15.5089 14 15.6953Z"
      stroke={color}
      strokeWidth={1.8}
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Svg>
);

ListShield.defaultProps = {
  height: 24,
  width: 24,
};

export default ListShield;