import { ColorValue, ViewStyle } from 'react-native';

import { AppThemeType } from '../../theme/default';

export type CardSizeType =
  'small' |
  'big';

export type CardVariantType =
  'default' |
  'highlighted50' |
  'highlighted100';

export const getCardSizeStyle = (theme: AppThemeType, size?: CardSizeType): ViewStyle => {
  switch (size) {
    case 'small':
      return {
        width: 135,
        height: 120,
        padding: theme.spacings.sXS,
      };
    case 'big':
    default:
      return {
        minHeight: 128,
        padding: theme.spacings.sSmall,
      };
  }
};

export const getCardShadowStyle = (theme: AppThemeType, showShadow?: boolean): ViewStyle | null => {
  if (showShadow) {
    return theme.shadows.level4;
  }

  return {
    borderWidth: theme.borders.width.thin,
    borderColor: theme.colors.neutralGray200,
  };
};

export const getCardVariantStyle = (theme: AppThemeType, cardType?: CardVariantType): ViewStyle | null => {
  switch (cardType) {
    case 'highlighted50':
      return {
        borderWidth: theme.borders.width.thin,
        borderColor: theme.colors.primary700,
      };
    case 'highlighted100':
      return {
        borderWidth: theme.borders.width.thin,
        borderColor: theme.colors.primary600,
        backgroundColor: theme.colors.primaryMain,
      };
    case 'default':
    default:
      return null;
  }
};

export const getCardCustomBorderStyle = (theme: AppThemeType, borderColor?: ColorValue): ViewStyle | null => {
  if (!borderColor) return null;

  return {
    borderWidth: theme.borders.width.thin,
    borderColor,
  };
};

export const getArrowColor = (theme: AppThemeType, variant?: CardVariantType, arrowColor?: ColorValue): ColorValue => {
  if (arrowColor) return arrowColor;

  if (variant === 'highlighted100') return theme.colors.neutralWhite;

  return theme.colors.neutralGray500;
};
