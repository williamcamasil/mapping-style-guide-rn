import React from 'react';

import Svg, {
  Circle,
  SvgProps,
} from 'react-native-svg';

import { AppThemeType, withTheme } from '../../../theme';
import { ColorPaletesType } from '../../../tokens';

type BulletPointPropsType = SvgProps & {
  color: ColorPaletesType;
  theme: AppThemeType;
};

const BulletPoint: React.FC<BulletPointPropsType> = ({
  color,
  theme,
  ...others
}) => (
  <Svg
    fill="none"
    viewBox="0 0 8 8"
    {...others}

  >
    <Circle cx={4} cy={4} r={4} fill={theme.colors[color]} />
  </Svg>
);

BulletPoint.defaultProps = {
  width: 8,
  height: 8,
  color: 'neutralGray400',
};

export default withTheme(BulletPoint);
