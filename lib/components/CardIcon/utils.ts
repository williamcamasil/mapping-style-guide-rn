import { ColorValue } from 'react-native';

import { AppThemeType } from '../../theme/default';
import { CardVariantType } from '../Card/utils';

export const getIconColor = (
  theme: AppThemeType,
  customColor?: ColorValue,
  variant?: CardVariantType,
): ColorValue | string => {
  if (customColor) return customColor;

  if (variant === 'highlighted100') {
    return theme.colors.neutralWhite;
  }

  return theme.colors.primaryMain;
};
