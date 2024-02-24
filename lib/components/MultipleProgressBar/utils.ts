
import { ViewStyle } from 'react-native';

import { AppThemeType } from '../../theme';
import { ColorPaletesType } from '../../tokens';

export type MultipleProgressPropsType = {
  colorGradient: [ColorPaletesType, ColorPaletesType];
  value: number;
};

const firstProgressStyles = (theme: AppThemeType): ViewStyle => ({
  borderTopRightRadius: theme.spacings.sZero,
  borderBottomRightRadius: theme.spacings.sZero,
  marginRight: 3,
});

const lastProgressStyles = (theme: AppThemeType): ViewStyle => ({
  borderTopLeftRadius: theme.spacings.sZero,
  borderBottomLeftRadius: theme.spacings.sZero,
});

const middleProgressStyles = (theme: AppThemeType): ViewStyle => ({
  ...firstProgressStyles(theme),
  ...lastProgressStyles(theme),
});

export const getProgressStyles = (theme: AppThemeType, index: number, length: number): ViewStyle | undefined => {
  if (length === 1) return undefined;

  if (index === 0) {
    return firstProgressStyles(theme);
  }

  if (length === (index + 1)) {
    return lastProgressStyles(theme);
  }

  return middleProgressStyles(theme);
};
