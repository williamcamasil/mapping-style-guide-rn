import * as React from 'react';

import Svg, {
  SvgProps,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

import { AppThemeType } from '../../../theme';

type BtnTakePictureType = SvgProps & {
  theme: AppThemeType;
};

const BtnTakePicture: React.FC<BtnTakePictureType> = ({ theme, ...others }) => (
  <Svg
    viewBox="0 0 96 96"
    fill="none"
    {...others}
  >
    <Circle cx={48} cy={48} r={40} fill={theme.colors.neutralWhite} />
    <Circle
      cx={48}
      cy={48}
      r={44}
      stroke="white"
      strokeOpacity={0.1}
      strokeWidth={8}
    />
    <Circle
      cx={48}
      cy={48}
      r={33}
      stroke="url(#paint0_linear_10850_86516)"
      strokeWidth={2}
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_10850_86516"
        x1={48}
        y1={16}
        x2={48}
        y2={80}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={theme.colors.primaryMain} />
        <Stop offset={1} stopColor={theme.colors.primary600} />
      </LinearGradient>
    </Defs>
  </Svg>
);

BtnTakePicture.defaultProps = {
  width: 96,
  height: 96,
};

export default BtnTakePicture;
