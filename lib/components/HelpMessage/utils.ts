import { ColorPaletesType } from '../../tokens';

export const getTextColor = (error?: boolean, disabled?: boolean): ColorPaletesType => {
  if (disabled) return 'neutralGray500';

  if (error) return 'feedbackError400';

  return 'neutralGray600';
};
