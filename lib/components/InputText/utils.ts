import { TextStyle, ViewStyle, Platform } from 'react-native';

import { AppThemeType } from '../../theme/default';
import { ColorPaletesType } from '../../tokens';
import { calcLineHeight } from '../../utils/typography';

const getBorder = (theme: AppThemeType, focused: boolean, disabled?: boolean, textArea?: boolean) => {
  if (textArea) return null;

  return {
    borderColor: focused ? theme.colors.neutralGray400 : theme.colors.neutralGray300,
    borderRadius: theme.borders.radius.medium,
    borderWidth: disabled ? theme.borders.width.none : theme.borders.width.thin,
  };
};

export const getViewStyle = (
  theme: AppThemeType,
  height: number,
  focused: boolean,
  hasValue: boolean,
  textArea?: boolean,
  disabled?: boolean,
): ViewStyle => ({
  height,
  backgroundColor: disabled ? theme.colors.neutralGray100 : theme.colors.neutralWhite,
  ...getBorder(theme, focused, disabled, textArea),
  paddingLeft: !textArea ? theme.spacings.sSmall : theme.spacings.sZero,
  paddingTop: Platform.select({
    android: hasValue ? height / 2 : undefined,
    ios: hasValue ? height / 2 : 4,
  }),
  paddingBottom: Platform.select({
    android: hasValue ? height / 8 : undefined,
    ios: hasValue ? height / 16 : 0,
  }),
});

const getTextColor = (focused?: boolean, disabled?: boolean): ColorPaletesType => {
  if (disabled) return 'neutralGray500';

  if (focused) return 'neutralGray700';

  return 'neutralGray600';
};

export const getTextStyle = (
  theme: AppThemeType,
  focused: boolean,
  hasValue: boolean,
  disabled?: boolean,
): TextStyle => {
  const fontSize = hasValue ? theme.typography.sizes.medium : theme.typography.sizes.small;
  return {
    ...(hasValue ? theme.typography.weights.bold : theme.typography.weights.regular),
    fontSize,
    letterSpacing: theme.typography.letterSpaces.default,
    lineHeight: calcLineHeight(fontSize, theme.typography.lineHeights.small),
    color: theme.colors[getTextColor(focused, disabled)],
  };
};

export const getErrorStyle = (theme: AppThemeType, error?: boolean): ViewStyle | null => {
  if (!error) return null;

  return {
    borderColor: theme.colors.feedbackError400,
  };
};

export const getActionStyle = (secureTextEntry?: boolean): ViewStyle | null => {
  if (!secureTextEntry) return null;

  return {
    paddingRight: 50,
  };
};

export const getTextLabelColor = (focused?: boolean, error?: boolean, textArea?: boolean): ColorPaletesType => {
  if (error && textArea) {
    return 'feedbackError400';
  }

  return focused ? 'neutralGray600' : 'neutralGray500';
};

export const INPUT_TEXT_HEIGHT = 64;
