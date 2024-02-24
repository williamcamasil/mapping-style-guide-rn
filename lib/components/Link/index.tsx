import React, { ComponentType } from 'react';
import {
  StyleProp, StyleSheet, TouchableOpacity, TouchableOpacityProps, View, ViewStyle, Text as RNText, TextStyle,
} from 'react-native';

import { SvgProps } from 'react-native-svg';

import { useViewStyles } from '../../hooks/useStyles';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import { ColorPaletesType } from '../../tokens';
import Spacer from '../Spacer';
import Text, { TextPropTypes } from '../Text';
import {
  LinkVariantType, getVariantLinkStyle, getTextColor, getVariantSpaceSize, getIconSize, LinkSizeType, getTextSize,
} from './utils';

export type LinkPropsType<IconProps extends SvgProps = SvgProps> = {
  theme: AppThemeType;
  children: TextPropTypes['children'];
  onPress: TouchableOpacityProps['onPress'];
  testID?: string;
  variant?: LinkVariantType;
  size?: LinkSizeType;
  style?: StyleProp<ViewStyle | TextStyle>;
  disabled?: boolean;
  Icon?: ComponentType<IconProps>;
  textColor?: ColorPaletesType;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  containerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const Link: React.FC<LinkPropsType> = ({
  testID,
  children,
  style,
  onPress,
  disabled,
  theme,
  variant,
  Icon,
  size,
  textColor,
}) => {
  const textVariant = getTextSize(variant, size);

  const textColorName = getTextColor(textColor, variant, disabled, size);

  const buttonStyles = useViewStyles(() => [
    getVariantLinkStyle(theme, textColor, variant, disabled),
    style,
  ], [theme, textColor, variant, disabled, style]);

  const renderText = () => (
    <Text testID="link-text" color={textColorName} variant={textVariant} lineHeight="large">
      {children}
    </Text>
  );

  const renderComponent = () => {
    if (Icon) {
      const spaceSize = getVariantSpaceSize(theme, size);
      const iconSize = getIconSize(theme, size);

      return (
        <View style={styles.containerIcon}>
          <Icon width={iconSize} height={iconSize} color={theme.colors[textColorName]} />
          <Spacer size={spaceSize} />
          {renderText()}
        </View>
      );
    }

    return (
      renderText()
    );
  };

  if (variant === 'text') {
    return (
      <RNText
        testID={testID}
        style={buttonStyles}
        onPress={onPress}
        disabled={disabled}
      >
        {children}
      </RNText>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID={testID}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={theme.opacities.intense}
        style={buttonStyles}
      >
        {renderComponent()}
      </TouchableOpacity>
    </View>
  );
};

Link.defaultProps = {
  variant: 'highlightedPrimary',
  size: 'large',
};

export default withTheme(Link);
