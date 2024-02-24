import { AppThemeType } from '../../theme';

export const getButtonColor = (
  pressed?: boolean,
) => {
  if (pressed) return 'feedbackSuccess500';

  return 'primaryMain';
};

export const getIconColor = (
  theme: AppThemeType,
  pressed?: boolean,
) => {
  if (pressed) return theme.colors.feedbackSuccess500;

  return theme.colors.primaryMain;
};
