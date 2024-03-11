import { TextStyle } from 'react-native';

import { AppThemeType } from '../../theme/default';
import { ColorPaletesType, SpacingValueType } from '../../tokens';
import { TextVariantType } from '../Text';

export type LinkVariantType =
  'highlightedPrimary'
  | 'highlightedSecondary'
  | 'primary'
  | 'secondary'
  | 'text';

export type LinkSizeType = 'large' | 'small';

export const getTextColor = (
  textColor?: ColorPaletesType,
  variant?: LinkVariantType,
  disabled?: boolean,
  size?: LinkSizeType,
): ColorPaletesType => {
  if (disabled) return 'neutralGray300';
  if (textColor) return textColor;

  const isSmall = size === 'small';

  switch (variant) {
    case 'secondary':
    case 'highlightedSecondary':
      return isSmall ? 'neutralGray500' : 'neutralGray600';
    case 'highlightedPrimary':
    case 'primary':
    default:
      return isSmall ? 'primaryMain' : 'primary700';
  }
};

export function getTextSize(variant?: LinkVariantType, size?: LinkSizeType): TextVariantType {
  if (variant === 'highlightedPrimary' || variant === 'highlightedSecondary' || size === 'small') {
    return 'small';
  }

  return 'body';
}

export function getVariantSpaceSize(theme: AppThemeType, size?: LinkSizeType): SpacingValueType {
  switch (size) {
    case 'small':
      return theme.spacings.sQuark;
    case 'large':
    default:
      return theme.spacings.sNano;
  }
}

export function getIconSize(theme: AppThemeType, size?: LinkSizeType): SpacingValueType {
  switch (size) {
    case 'small':
      return theme.spacings.sXS;
    case 'large':
    default:
      return theme.spacings.sMedium;
  }
}

function getBorderColor(
  theme: AppThemeType,
  variant: LinkVariantType,
  textColor?: ColorPaletesType,
  disabled?: boolean,
) {
  if (disabled) return theme.colors.neutralGray300;
  if (textColor) return theme.colors[textColor];

  switch (variant) {
    case 'highlightedPrimary':
      return theme.colors.primary700;
    case 'highlightedSecondary':
    default:
      return theme.colors.neutralGray500;
  }
}

export function getVariantLinkStyle(
  theme: AppThemeType,
  textColor?: ColorPaletesType,
  variant?: LinkVariantType,
  disabled?: boolean,
): TextStyle | null {
  switch (variant) {
    case 'text':
      return {
        textDecorationLine: 'underline',
        color: theme.colors[getTextColor(textColor, variant, disabled)],
      };
    case 'highlightedPrimary':
    case 'highlightedSecondary':
      return {
        borderBottomWidth: theme.borders.width.thin,
        paddingBottom: theme.spacings.sNano,
        borderColor: getBorderColor(theme, variant, textColor, disabled),
      };
    default:
      return null;
  }
}
