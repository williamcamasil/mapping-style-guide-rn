import React, { ComponentType } from 'react';
import {
  StyleProp,
  StyleSheet, TouchableOpacity, View, ViewStyle,
} from 'react-native';

import { SvgProps } from 'react-native-svg';

import { Icons } from '../../assets';
import { useViewStyles } from '../../hooks/useStyles';
import { AppThemeType, withTheme } from '../../theme';
import { ColorPaletesType } from '../../tokens';
import Spacer from '../Spacer';
import Text, { TextPropTypes, TextVariantType } from '../Text';

export type MenuOptionPropsType<IconProps extends SvgProps = SvgProps> = {
  theme: AppThemeType;
  children: TextPropTypes['children'];
  onPress?: () => void;
  disabled?: boolean;
  Icon?: ComponentType<IconProps>;
  testID?: string;
  textColor?: ColorPaletesType;
  textVariant?: TextVariantType;
  iconColor?: ColorPaletesType;
  rightContent?: React.ReactNode;
  description?: string;
  descriptionColor?: ColorPaletesType;
  descriptionVariant?: TextVariantType;
  descriptionNumberOfLines?: number;
  containerStyle?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerIcon: {
    height: '100%',
    alignItems: 'flex-start',
  },
  content: {
    flex: 1,
  },
});

const MenuOption: React.FC<MenuOptionPropsType> = ({
  onPress,
  Icon,
  testID,
  textColor,
  textVariant,
  iconColor,
  rightContent,
  description,
  children,
  theme,
  disabled,
  descriptionColor,
  descriptionVariant,
  descriptionNumberOfLines,
  containerStyle,
}) => {
  const containerStyles = useViewStyles(() => [
    styles.container,
    {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.neutralGray200,
      paddingVertical: theme.spacings.sMedium,
      paddingLeft: theme.spacings.sXXS,
    },
    containerStyle,
  ], [containerStyle, theme.colors.neutralGray200, theme.spacings.sMedium, theme.spacings.sXXS]);

  const arrowContainerStyles = useViewStyles(() => [
    {
      paddingRight: theme.spacings.sXXS,
    },
  ], [theme]);

  const containerIconStyles = useViewStyles(() => [
    styles.containerIcon,
    {
      paddingRight: theme.spacings.sXXS,
      paddingTop: theme.spacings.sQuark,
    },
  ], [theme]);

  const renderIcon = () => {
    if (!Icon) return null;
    return (
      <View style={containerIconStyles} testID="icon">
        <Icon color={theme.colors[iconColor ?? 'primaryMain']} />
      </View>
    );
  };

  const renderDescription = () => {
    if (!description) return null;
    return (
      <View>
        <Spacer size={theme.spacings.sQuark} />
        <Text
          variant={descriptionVariant}
          color={descriptionColor}
          lineHeight="medium"
          numberOfLines={descriptionNumberOfLines}
        >
          {description}
        </Text>
      </View>
    );
  };

  const renderOption = () => {
    if (rightContent) return rightContent;

    return (
      <View style={arrowContainerStyles}>
        <Icons.Small.Right color={theme.colors.neutralGray500} />
      </View>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={theme.opacities.intense}
      onPress={onPress}
      disabled={!onPress || disabled}
      testID={testID}
      style={containerStyles}
    >

      {renderIcon()}
      <View style={styles.content}>
        <Text
          weight="bold"
          variant={textVariant}
          theme={theme}
          color={textColor}
        >
          {children}
        </Text>
        {renderDescription()}
      </View>
      {renderOption()}
    </TouchableOpacity>
  );
};

MenuOption.defaultProps = {
  textColor: 'neutralGray700',
  textVariant: 'body',
  descriptionColor: 'neutralGray600',
  descriptionVariant: 'caption',
};

export default withTheme(MenuOption);
