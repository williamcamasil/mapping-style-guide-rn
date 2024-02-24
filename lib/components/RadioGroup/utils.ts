import { ViewStyle } from 'react-native';

import { RadioImgPropsType } from '../../assets/images/RadioImg';
import { AppThemeType } from '../../theme/default';
import { ColorPaletesType } from '../../tokens';

export type RadioGroupVariantType = 'defaultPrimary'
| 'shapedPrimary'
| 'defaultSecondary';

export const getTextWeight = (
  selected: boolean,
  disabled?: boolean,
  error?: boolean,
) => (selected && !disabled && !error ? 'bold' : 'regular');

export const getInputWidth = (stacked?: boolean) => {
  if (stacked) return '100%';
  return undefined;
};

export const getInputMargin = (theme: AppThemeType, stacked?: boolean) => {
  if (stacked) {
    return {
      marginBottom: theme.spacings.sXS,
    };
  }
  return {
    marginHorizontal: theme.spacings.sNano,
    marginBottom: theme.spacings.sXS,
  };
};

export const getContainerMargin = (theme: AppThemeType, stacked?: boolean) => {
  if (!stacked) {
    return { marginHorizontal: -theme.spacings.sNano };
  }
  return {};
};

const getPrimaryTextColor = (
  variant?: RadioGroupVariantType,
  error?: boolean,
  disabled?: boolean,
) => {
  if (disabled) return 'neutralGray300';
  if (error && variant === 'shapedPrimary') return 'neutralGray500';
  if (error) return 'feedbackError400';

  return 'neutralGray600';
};

const getSecondaryTextColor = (
  selected: boolean,
  error?: boolean,
  disabled?: boolean,
) => {
  if (disabled) return 'secondary500';
  if (error) return 'feedbackError300';
  if (selected) return 'neutralWhite';

  return 'secondary200';
};

export const getTextColor = (
  selected: boolean,
  variant?: RadioGroupVariantType,
  error?: boolean,
  disabled?: boolean,
): ColorPaletesType => {
  if (variant === 'defaultSecondary') {
    return getSecondaryTextColor(selected, error, disabled);
  }
  return getPrimaryTextColor(variant, error, disabled);
};

const getSecondaryMarkerStyle = (theme: AppThemeType, error?: boolean, disabled?: boolean, selected?: boolean) => {
  if (disabled) {
    return (
      {
        backgroundColor: 'transparent',
        borderColor: theme.colors.secondary500,
        borderWidth: theme.borders.width.thin,
        checkColor: 'transparent',
        selected,
      }
    );
  }

  if (error) {
    return (
      {
        backgroundColor: 'transparent',
        borderColor: theme.colors.feedbackError300,
        borderWidth: theme.borders.width.thin,
        checkColor: selected ? theme.colors.feedbackError300 : 'transparent',
        selected,
      }
    );
  }

  if (selected) {
    return (
      {
        backgroundColor: theme.colors.primaryMain,
        borderColor: theme.colors.secondary600,
        borderWidth: theme.borders.width.thick,
        checkColor: theme.colors.primaryMain,
        selected,
      }
    );
  }

  return (
    {
      backgroundColor: theme.colors.secondary700,
      borderColor: theme.colors.primaryMain,
      borderWidth: theme.borders.width.thin,
      checkColor: theme.colors.secondary700,
      selected,
    }
  );
};

const getPrimaryMarkerStyle = (theme: AppThemeType, error?: boolean, disabled?: boolean, selected?: boolean) => {
  if (disabled) {
    return (
      {
        backgroundColor: 'transparent',
        borderColor: theme.colors.neutralGray200,
        borderWidth: theme.borders.width.thin,
        checkColor: 'transparent',
        selected,
      }
    );
  }

  if (error) {
    return (
      {
        backgroundColor: 'transparent',
        borderColor: theme.colors.feedbackError400,
        borderWidth: theme.borders.width.thin,
        checkColor: selected ? theme.colors.feedbackError400 : 'transparent',
        selected,
      }
    );
  }

  if (selected) {
    return (
      {
        backgroundColor: theme.colors.neutralWhite,
        borderColor: theme.colors.neutralGray200,
        borderWidth: theme.borders.width.thick,
        checkColor: theme.colors.primaryMain,
        selected,
      }
    );
  }

  return (
    {
      backgroundColor: theme.colors.neutralGray100,
      borderColor: theme.colors.primaryMain,
      borderWidth: theme.borders.width.thin,
      checkColor: theme.colors.neutralGray100,
      selected,
    }
  );
};

export const getMarkerStyle = (
  theme: AppThemeType,
  variant?: RadioGroupVariantType,
  error?: boolean,
  disabled?: boolean,
  selected?: boolean,
): RadioImgPropsType => {
  if (variant === 'defaultSecondary') {
    return getSecondaryMarkerStyle(theme, error, disabled, selected);
  }
  return getPrimaryMarkerStyle(theme, error, disabled, selected);
};

const getPrimaryBorderColor = (
  theme: AppThemeType,
  error?: boolean,
  disabled?: boolean,
) => {
  if (disabled) return theme.colors.neutralGray100;
  if (error) return theme.colors.feedbackError400;
  return theme.colors.neutralGray200;
};

export const getContainerStyle = (
  theme: AppThemeType,
  variant?: RadioGroupVariantType,
  error?: boolean,
  disabled?: boolean,
): ViewStyle => {
  if (variant !== 'shapedPrimary') return {};
  return {
    borderWidth: theme.borders.width.thin,
    borderRadius: theme.borders.radius.medium,
    padding: theme.spacings.sMedium,
    borderColor: getPrimaryBorderColor(theme, error, disabled),
  };
};
