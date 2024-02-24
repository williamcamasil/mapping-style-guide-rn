import { ViewStyle } from 'react-native';

import { Icons } from '../../assets';
import { AppThemeType } from '../../theme/default';
import { ColorPaletesType } from '../../tokens';

export type AlertVariantType =
  'success' |
  'info' |
  'warning' |
  'error';

export const getVariantColorStyle = (variant?: AlertVariantType): ColorPaletesType => {
  switch (variant) {
    case 'warning':
      return 'feedbackAlert500';
    case 'error':
      return 'feedbackError500';
    case 'info':
      return 'neutralGray600';
    case 'success':
    default:
      return 'feedbackSuccess500';
  }
};

export const getDefaultIcon = (variant?: AlertVariantType) => {
  switch (variant) {
    case 'success':
      return Icons.Default.Success;
    case 'info':
      return Icons.Default.Information;
    case 'warning':
    case 'error':
    default:
      return Icons.Default.Warning;
  }
};

export const getAlertStyle = (
  theme: AppThemeType,
  variant?: AlertVariantType,
): ViewStyle => {

  switch (variant) {
    case 'warning':
      return {
        backgroundColor: theme.colors.feedbackAlert100,
      };
    case 'error':
      return {
        backgroundColor: theme.colors.feedbackError100,
      };
    case 'info':
      return {
        backgroundColor: theme.colors.neutralGray100,
      };
    case 'success':
    default:
      return {
        backgroundColor: theme.colors.feedbackSuccess100,
      };
  }
};
