import React from 'react';

import Svg, {
  ClipPath, Defs, G, Path, SvgProps,
} from 'react-native-svg';

type DownloadPropsType = SvgProps;

const Download: React.FC<DownloadPropsType> = ({
  color,
  ...others
}) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...others}
  >
    <G
      clipPath="url(#a)"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M12 17V3M21 17a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4" />
      <Path d="m16.999 12-5.001 5.001-5-5.001" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

Download.defaultProps = {
  width: 24,
  height: 24,
};

export default Download;
