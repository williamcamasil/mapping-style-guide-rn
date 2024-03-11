import { AppThemeType } from '../../theme';

export function getDisabledTouchabledStyle(theme: AppThemeType, disabled?: boolean) {
  if (!disabled) return null;

  return {
    backgroundColor: theme.colors.neutralGray200,
  };
}

export function getBackgroundColorEllipse(theme: AppThemeType, disabled?: boolean) {
  if (disabled) return theme.colors.neutralGray300;

  return theme.colors.neutralWhite;
}
