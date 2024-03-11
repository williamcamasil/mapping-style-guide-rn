import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';

import { useViewStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import { ColorPaletesType } from '../../tokens';

export type DividerPropsType = ViewProps & {
  theme: AppThemeType;
  color?: ColorPaletesType;
  size?: ViewStyle['height'];
  marginTop?: ViewStyle['margin'];
  marginBottom?: ViewStyle['margin'];
  marginLeft?: ViewStyle['margin'];
  marginRight?: ViewStyle['margin'];
};

const Divider: React.FC<DividerPropsType> = ({
  color,
  size,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  style,
  theme,
  ...others
}) => {
  const dividerStyles = useViewStyles(() => [
    {
      backgroundColor: theme.colors[color ?? 'neutralGray200'],
      height: size,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
    },
    style,
  ], [
    theme.colors,
    color,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    size,
    style,
  ]);

  return (
    <View {...others} style={dividerStyles} />
  );
};

Divider.defaultProps = {
  size: 1,
};

export default withTheme(Divider);
