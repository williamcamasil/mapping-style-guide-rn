import { AppThemeType } from '../../theme/default';

export const INPUT_TOKEN_HEIGHT = 64;

export const isCurrentEmptyInputFocused = (
  focused: boolean,
  enteredNumbers: number,
  index: number,
) => focused && enteredNumbers === index;

export const getInputBorderColor = (
  index: number,
  enteredNumbers: number,
  focused: boolean,
  theme: AppThemeType,
  error?: boolean,
  value?: string,
) => {
  if (error) return theme.colors.feedbackError400;
  if (value) return theme.colors.neutralGray300;
  if (isCurrentEmptyInputFocused(focused, enteredNumbers, index)) return theme.colors.neutralGray400;
  return theme.colors.neutralGray300;
};
