import * as React from 'react';

import Svg, {
  SvgProps, G, Path, Defs, ClipPath,
} from 'react-native-svg';

const File: React.FC<SvgProps> = ({
  color,
  ...others
}) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <G clipPath="url(#a)">
      <Path
        d="M8 13h8m-8 4h8m4-9h-4a1 1 0 0 1-1-1V3M8 9h3M6 3h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 20 7.828V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

File.defaultProps = {
  width: 24,
  height: 24,
};

export default File;
