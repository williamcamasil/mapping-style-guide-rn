import React from 'react';
import { ColorValue, StyleSheet, View } from 'react-native';

import { SvgProps } from 'react-native-svg';

import { useViewStyles } from '../../hooks';
import { AppThemeType, withTheme } from '../../theme';

export type IconWithBackgroundPropsType <IconProps extends SvgProps = SvgProps> = {
  theme: AppThemeType;
  Icon: React.FC<IconProps>;
  iconColor: ColorValue;
  iconSize: number;
  backgroundColor: ColorValue;
  backgroundSize: number;
};

const styles = StyleSheet.create({
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const IconWithBackground: React.FC<IconWithBackgroundPropsType> = ({
  theme, Icon, iconColor, iconSize: size, backgroundColor, backgroundSize,
}) => {
  const iconWrapperStyle = useViewStyles(() => [
    styles.iconWrapper,
    {
      borderRadius: theme.borders.radius.medium,
      backgroundColor,
      width: backgroundSize,
      height: backgroundSize,
    },
  ], [theme, backgroundColor, backgroundSize]);

  return (
    <View style={iconWrapperStyle}>
      <Icon width={size} height={size} color={iconColor} />
    </View>
  );
};

export default withTheme(IconWithBackground);
