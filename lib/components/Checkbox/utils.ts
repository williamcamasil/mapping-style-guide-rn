import { CheckBoxImgPropsType } from '../../assets/images/CheckboxImg';
import { AppThemeType } from '../../theme/default';
import { ColorPaletesType } from '../../tokens';

export type CheckboxVariantType = 'default' | 'secondary';

export const getTextColor = (error?: boolean, variant?: CheckboxVariantType, disabled?: boolean): ColorPaletesType => {
  if (disabled) {
    if (variant === 'secondary') return 'secondary500';
    return 'neutralGray300';
  }

  if (error) {
    if (variant === 'secondary') return 'feedbackError300';
    return 'feedbackError400';
  }

  if (variant === 'secondary') return 'secondary200';

  return 'neutralGray700';
};

const getBackgroundColorStyle = (theme: AppThemeType, variant?: CheckboxVariantType) => {
  if (variant === 'secondary') return theme.colors.secondary700;

  return theme.colors.neutralGray100;
};

const getCheckedBorderColorStyle = (theme: AppThemeType, variant?: CheckboxVariantType) => {
  if (variant === 'secondary') return theme.colors.secondary600;

  return theme.colors.neutralGray200;
};

const getColorStyle = (theme: AppThemeType, error?: boolean, variant?: CheckboxVariantType) => {
  if (error) {
    if (variant === 'secondary') return theme.colors.feedbackError300;
    return theme.colors.feedbackError400;
  }

  return theme.colors.primaryMain;
};

const getDisabledBorderColorStyle = (theme: AppThemeType, variant?: CheckboxVariantType) => {
  if (variant === 'secondary') return theme.colors.secondary500;

  return theme.colors.neutralGray200;
};

export const getBoxStyle = (
  theme: AppThemeType,
  error?: boolean,
  disabled?: boolean,
  checked?: boolean,
  variant?: CheckboxVariantType,
): CheckBoxImgPropsType => {
  if (disabled) {
    return (
      {
        backgroundColor: 'transparent',
        borderColor: getDisabledBorderColorStyle(theme, variant),
        borderWidth: theme.borders.width.thin,
        checkColor: theme.colors.neutralGray200,
        checked,
      }
    );
  }

  if (checked) {
    return (
      {
        backgroundColor: getColorStyle(theme, error, variant),
        borderColor: getCheckedBorderColorStyle(theme, variant),
        borderWidth: theme.borders.width.thick,
        checkColor: theme.colors.neutralWhite,
        checked,
      }
    );
  }

  return (
    {
      backgroundColor: getBackgroundColorStyle(theme, variant),
      borderColor: getColorStyle(theme, error, variant),
      borderWidth: theme.borders.width.thin,
      checkColor: theme.colors.neutralGray100,
      checked,
    }
  );
};
