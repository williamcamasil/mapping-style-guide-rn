import React, { ComponentType } from 'react';
import {
  StyleProp, StyleSheet, TouchableOpacity, TouchableWithoutFeedbackProps, View, ViewStyle,
} from 'react-native';

import { SvgProps } from 'react-native-svg';

import { useViewStyles } from '../../hooks/useStyles';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import Loading from '../Loading';
import Spacer from '../Spacer';
import Text, { TextPropTypes } from '../Text';
import {
  ButtonSizeType,
  ButtonVariantType,
  getSizeStyle,
  getTextColor,
  getVariantStyle,
  getStylesToBlock,
} from './utils';

export type ButtonPropsType<IconProps extends SvgProps = SvgProps> = {
  children?: TextPropTypes['children'];
  onPress: TouchableWithoutFeedbackProps['onPress'];
  style?: StyleProp<ViewStyle>;
  disabled?: TouchableWithoutFeedbackProps['disabled'];
  theme: AppThemeType;
  variant?: ButtonVariantType;
  size?: ButtonSizeType;
  loading?: boolean;
  testID?: string;
  Icon?: ComponentType<IconProps>;
  block?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textColorVariant?: ButtonVariantType;
};

const styles = StyleSheet.create({
  containerIconAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const Button: React.FC<ButtonPropsType> = ({
  children,
  style,
  onPress,
  disabled,
  theme,
  variant,
  size,
  loading,
  testID,
  Icon,
  block,
  containerStyle,
  textColorVariant,
}) => {
  const hasText = Boolean(children);

  const buttonStyles = useViewStyles(
    () => [
      {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.borders.radius.medium,
      },
      getVariantStyle(theme, variant, disabled),
      getSizeStyle(theme, size, hasText),
      style,
    ],
    [disabled, hasText, size, style, theme, variant],
  );

  const containerStyles = useViewStyles(() => [getStylesToBlock(block), containerStyle], [block, containerStyle]);

  const textColor = getTextColor(textColorVariant ? textColorVariant : variant, disabled);

  const renderText = () => {
    if (!hasText) return null;
    return (
      <Text
        testID="text-with-icon"
        variant={size === 'small' ? 'bodySmall' : 'body'}
        weight="bold"
        lineHeight="medium"
        color={textColor}
      >
        {children}
      </Text>
    );
  };

  const renderContent = () => {
    if (loading) {
      return <Loading color={textColor} />;
    }

    if (Icon) {
      return (
        <View testID="container-icon" style={styles.containerIconAndText}>
          <Icon width={32} height={32} color={theme.colors[textColor]} />
          {children ? <Spacer size={theme.spacings.sXXS} /> : null}
          {renderText()}
        </View>
      );
    }

    return renderText();
  };

  return (
    <View testID="container-button" style={containerStyles}>
      <TouchableOpacity
        testID={testID}
        style={buttonStyles}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={theme.opacities.intense}
      >
        {renderContent()}
      </TouchableOpacity>
    </View>
  );
};

Button.defaultProps = {
  disabled: false,
  variant: 'containedPrimary',
  size: 'medium',
  block: true,
};

export default withTheme(Button);
