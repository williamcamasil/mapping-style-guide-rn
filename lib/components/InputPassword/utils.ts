import { StyleProp, ViewStyle } from 'react-native';

import { AppThemeType } from '../../theme/default';
import { ColorPaletesType } from '../../tokens';

export const INPUT_PASSWORD_HEIGHT = 64;

export const getCircleStatusStyle = (
  theme: AppThemeType,
  index: number,
  enteredNumbers: number,
  focused: boolean,
): ViewStyle | null => {
  if (!enteredNumbers && !focused) return null;

  // Circle focused
  if (index === enteredNumbers && focused) {
    return {
      backgroundColor: theme.colors.neutralGray200,
      borderColor: theme.colors.neutralGray600,
    };
  }

  // Circle filled
  if (index < enteredNumbers) {
    return {
      backgroundColor: theme.colors.primaryMain,
      borderWidth: theme.borders.width.thick,
      borderColor: theme.colors.neutralGray200,
    };
  }

  return null;
};

export const isCurrentEmptyTextFocused = (
  focused: boolean,
  enteredNumbers: number,
  index: number,
) => focused && enteredNumbers === index;

export const getTextPasswordColor = (
  index: number,
  enteredNumbers: number,
  focused: boolean,
  value?: string,
): ColorPaletesType => {
  if (value) return 'neutralGray600';
  if (isCurrentEmptyTextFocused(focused, enteredNumbers, index)) return 'neutralGray800';
  return 'neutralGray400';
};

export function getContentCirclesStyles(
  stretch: boolean | undefined,
  maxLength: number,
  theme: AppThemeType,
): StyleProp<ViewStyle> {

  if (stretch) {
    return {
      width: undefined,
      flex: 1,
      justifyContent: 'space-between',
    };
  }
  const circleSize = theme.spacings.sSmall;
  const circleSpacing = theme.spacings.sXS;
  const quantitySpacings = maxLength - 1;

  return {
    width: maxLength * circleSize + quantitySpacings * circleSpacing,
    flex: 0,
    justifyContent: 'flex-start',
  };
}
