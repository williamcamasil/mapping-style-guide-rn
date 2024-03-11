import { ViewStyle } from 'react-native';

import { AppThemeType } from '../../theme/default';
import { ColorPaletesType } from '../../tokens';

export type ButtonVariantType =
  'containedPrimary' |
  'containedSecondary' |
  'outlinedPrimary' |
  'outlinedSecondary' |
  'text';

export type ButtonSizeType =
  'large' |
  'medium' |
  'small';

export const getVariantStyle = (
  theme: AppThemeType,
  variant?: ButtonVariantType,
  disabled?: boolean | null,
): ViewStyle => {
  switch (variant) {
    case 'containedSecondary':
      return {
        backgroundColor: disabled ? theme.colors.primary100 : theme.colors.primary200,
        borderWidth: theme.borders.width.none,
      };
    case 'outlinedPrimary':
      return {
        backgroundColor: 'transparent',
        borderWidth: theme.borders.width.thin,
        borderColor: disabled ? theme.colors.primary100 : theme.colors.primary600,
      };
    case 'outlinedSecondary':
      return {
        backgroundColor: 'transparent',
        borderWidth: theme.borders.width.thin,
        borderColor: disabled ? theme.colors.neutralGray100 : theme.colors.neutralGray300,
      };
    case 'text':
      return {
        backgroundColor: disabled ? theme.colors.neutralGray100 : 'transparent',
        borderWidth: theme.borders.width.none,
      };
    case 'containedPrimary':
    default:
      return {
        backgroundColor: disabled ? theme.colors.primary100 : theme.colors.primaryMain,
        borderWidth: theme.borders.width.none,
      };
  }
};

export const getTextColor = (
  variant?: ButtonVariantType,
  disabled?: boolean | null,
): ColorPaletesType => {
  switch (variant) {
    case 'containedSecondary':
      return disabled ? 'primary300' : 'primaryMain';
    case 'outlinedPrimary':
      return disabled ? 'primary300' : 'primaryMain';
    case 'outlinedSecondary':
      return disabled ? 'neutralGray200' : 'neutralGray600';
    case 'text':
      return disabled ? 'neutralGray400' : 'neutralGray500';
    case 'containedPrimary':
    default:
      return disabled ? 'primary300' : 'neutralWhite';
  }
};

export const getSizeStyle = (theme: AppThemeType, size?: ButtonSizeType, hasText?: boolean): ViewStyle => {
  switch (size) {
    case 'large':
      return {
        height: 64,
        minWidth: 64,
        paddingHorizontal: hasText ? theme.spacings.sXL : undefined,
      };
    case 'small':
      return {
        height: 30,
        minWidth: 30,
        paddingHorizontal: hasText ? theme.spacings.sXS : undefined,
      };
    case 'medium':
    default:
      return {
        height: 48,
        minWidth: 48,
        paddingHorizontal: hasText ? theme.spacings.sMedium : undefined,
      };
  }
};

export const getStylesToBlock = (block: boolean | undefined): ViewStyle | null => {
  if (block) return null;

  return {
    flexDirection: 'row',
  };
};
