import * as React from 'react';

import Svg, {
  SvgProps,
  Path,
  G,
  Circle,
} from 'react-native-svg';

type LockPropsType = SvgProps;

const Lock: React.FC<LockPropsType> = ({ color, ...others }) => (
  <Svg
    viewBox="0 0 64 64"
    fill="none"
    {...others}
  >
    <G opacity={0.4}>
      <Circle cx={32} cy={32} r={32} fill={color} fillOpacity={0.2} />
      <Circle cx={32} cy={32} r={31.5} stroke={color} strokeOpacity={0.2} />
    </G>
    <G opacity={0.4}>
      <Circle cx={32} cy={32} r={20} fill={color} fillOpacity={0.4} />
      <Circle cx={32} cy={32} r={19.5} stroke={color} strokeOpacity={0.5} />
    </G>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M28.443 25.944a3.55 3.55 0 0 1 3.556-3.544 3.55 3.55 0 0 1 3.556 3.544v3.534h-7.112v-3.534Zm-1 3.534v-3.534a4.55 4.55 0 0 1 4.556-4.544 4.55 4.55 0 0 1 4.556 4.544v3.534h.515A2.525 2.525 0 0 1 39.598 32v7.077A2.525 2.525 0 0 1 37.07 41.6H26.929a2.525 2.525 0 0 1-2.529-2.522V32a2.525 2.525 0 0 1 2.529-2.522h.514ZM25.4 32c0-.84.683-1.522 1.529-1.522h10.14c.846 0 1.529.682 1.529 1.522v7.077c0 .84-.682 1.522-1.528 1.522H26.929a1.525 1.525 0 0 1-1.529-1.522V32Z"
      fill="#F7F7F8"
    />
    <Path
      d="M37.068 41.1H26.927a2.025 2.025 0 0 1-2.029-2.023V32c0-1.117.908-2.022 2.029-2.022h10.14c1.121 0 2.029.905 2.029 2.022v7.077a2.025 2.025 0 0 1-2.028 2.022Z"
      fill="#F7F7F8"
    />
  </Svg>
);

Lock.defaultProps = {
  width: 64,
  height: 64,
};

export default Lock;
