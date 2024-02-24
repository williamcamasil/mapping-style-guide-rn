import { ColorValue, ViewStyle } from 'react-native';

import Color from 'color';

import { AppThemeType } from '../../theme/default';
import { ColorPaletesType } from '../../tokens/colors';
import { LoadingPropsType } from '../Loading';

const getBackgroundColor = (
  theme: AppThemeType,
  backgroundColor?: ColorValue,
): ColorValue => {
  const color = backgroundColor || theme.colors.neutralWhite;

  return Color(color).alpha(theme.opacities.intense).hsl().toString();
};

export const getLoadingBackgroundColor = (
  theme: AppThemeType,
  variant?: string,
  loadingBackgroundColor?: ColorPaletesType,
) => {
  if (loadingBackgroundColor) return theme.colors[loadingBackgroundColor];

  if (variant === 'secondary') {
    return theme.colors.secondary600;
  }
  return theme.colors.neutralGray100;
};

export const getContainerStyle = (loadingText?: string): ViewStyle => {
  if (!loadingText) {
    return {
      justifyContent: 'center',
      alignItems: 'center',
    };
  }
  return {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  };
};

export const getLoadingContainerMarginStyle = (theme: AppThemeType, loadingText?: string): ViewStyle => {
  if (!loadingText) return {};
  return {
    marginTop: theme.spacings.sLarge,
    marginLeft: theme.spacings.sLarge,
    marginBottom: theme.spacings.lLarge,
  };
};

export const getTextColor = (variant?: string, loadingTextColor?: ColorPaletesType): ColorPaletesType => {
  if (loadingTextColor) return loadingTextColor;

  if (variant === 'secondary') {
    return 'neutralWhite';
  }
  return 'neutralGray700';
};

export const getLinearGradientColors = (
  theme: AppThemeType,
  variant?: string,
  backgroundColor?: ColorValue,
  customGradientBackgroundColors?: string[],
): string[] => {
  if (customGradientBackgroundColors) return customGradientBackgroundColors;
  const translucentColor = getBackgroundColor(theme, backgroundColor).toString();
  const defaultValue = [translucentColor, translucentColor];
  if (backgroundColor) return defaultValue;

  switch (variant) {
    case 'secondary':
      return [theme.colors.secondary600, theme.colors.secondaryMain];
    case 'white':
      return [theme.colors.neutralWhite, theme.colors.neutralWhite];
    default:
      return [translucentColor, translucentColor];
  }
};

export const getLoadingColor = (variant?: string, loadingColor?: LoadingPropsType['color']) => {
  if (loadingColor) return loadingColor;

  if (variant === 'secondary') {
    return 'neutralWhite';
  }
  return 'neutralGray600';
};
