import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';

import { useViewStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';

export type ContainerPropsType = ViewProps & {
  theme: AppThemeType;
  padding?: ViewStyle['padding'];
  paddingVertical?: ViewStyle['padding'];
  paddingHorizontal?: ViewStyle['padding'];
  paddingLeft?: ViewStyle['padding'];
  paddingRight?: ViewStyle['padding'];
  paddingTop?: ViewStyle['padding'];
  paddingBottom?: ViewStyle['padding'];
  fillParent?: boolean;
  horizontal?: boolean;
  centered?: boolean;
  backgroundColor?: ViewStyle['backgroundColor'];
  blockActions?: boolean;
  justifyContent?: ViewStyle['justifyContent'];
  alignItems?: ViewStyle['alignItems'];
};

const Container: React.FC<ContainerPropsType> = ({
  children,
  style,
  theme,
  padding,
  paddingVertical,
  paddingHorizontal,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  fillParent,
  horizontal,
  centered,
  backgroundColor,
  blockActions,
  justifyContent,
  alignItems,
  ...others
}) => {
  const containerStyles = useViewStyles(() => [
    {
      flex: fillParent ? 1 : undefined,
      flexDirection: horizontal ? 'row' : undefined,
      justifyContent: justifyContent ?? (centered && horizontal ? 'center' : undefined),
      alignItems: alignItems ?? (centered && !horizontal ? 'center' : undefined),
      backgroundColor: backgroundColor || theme.colors.neutralWhite,
      padding,
      paddingVertical,
      paddingHorizontal,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
    },
    style,
  ], [
    backgroundColor,
    centered,
    fillParent,
    horizontal,
    padding,
    paddingBottom,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingVertical,
    style,
    theme.colors.neutralWhite,
    justifyContent,
    alignItems,
  ]);

  return (
    <View pointerEvents={blockActions ? 'none' : 'auto'} style={containerStyles} {...others}>
      {children}
    </View>
  );
};

Container.defaultProps = {
  fillParent: true,
};

export default withTheme(Container);
