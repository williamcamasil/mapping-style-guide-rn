import React from 'react';
import { View } from 'react-native';

import { useViewStyles } from '../../hooks';
import { AppThemeType, withTheme } from '../../theme';
import { getCircleStatusStyle } from './utils';

type CirclePasswordPropType = {
  theme: AppThemeType;
  index: number;
  value: number;
  focused: boolean;
};

const CirclePassword: React.FC<CirclePasswordPropType> = ({
  theme, index, value, focused,
}) => {

  const circleViewStyle = useViewStyles(() => [
    {
      width: theme.spacings.sSmall,
      height: theme.spacings.sSmall,
      borderRadius: theme.spacings.sSmall / 2,
      backgroundColor: theme.colors.neutralWhite,
      borderColor: theme.colors.neutralGray400,
      borderWidth: theme.borders.width.thin,
    },
    getCircleStatusStyle(theme, index, value, focused),
  ], [index, focused, theme, value]);

  return (
    <View
      testID={`circle-touchable-${index}`}
      pointerEvents="none"
      style={circleViewStyle}
    />
  );
};

export default withTheme(CirclePassword);
