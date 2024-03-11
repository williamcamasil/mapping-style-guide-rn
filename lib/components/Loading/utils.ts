import { ColorValue } from 'react-native';

import Color from 'color';

import { AppThemeType } from '../../theme/default';
import { ColorPaletesType } from '../../tokens';

export function getCircleBackgroundColor(
  theme: AppThemeType,
  color: ColorPaletesType,
): ColorValue | undefined {
  return theme.colors[color];
}

export function getCircleBorderColor(
  theme: AppThemeType,
  color: ColorPaletesType,
): ColorValue | undefined {
  const colorValue = theme.colors[color];

  return Color(colorValue).alpha(0.6).hsl().toString();
}
