import { AppThemeType } from '../../theme/default';

export const getButtonStyles = (selected: boolean, theme: AppThemeType) => {
  if (selected) {
    return {
      backgroundColor: theme.colors.primary100,
      borderColor: theme.colors.primary300,
    };
  }
  return {
    backgroundColor: 'transparent',
    borderColor: theme.colors.neutralGray300,
  };
};
