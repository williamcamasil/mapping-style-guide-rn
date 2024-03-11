
import React, { PropsWithChildren, ComponentType, FunctionComponent } from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { SvgProps } from 'react-native-svg';

import { useTextStyles, useViewStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import Text from '../Text';
import {
  AlertVariantType,
  getVariantColorStyle,
  getAlertStyle,
  getDefaultIcon,
} from './utils';

export type AlertPropsType<IconProps extends SvgProps = SvgProps> = PropsWithChildren & {
  theme: AppThemeType;
  testID?: string;
  variant?: AlertVariantType;
  description?: string;
  hideIcon?: boolean;
  Icon?: ComponentType<IconProps>;
  iconColor?: ColorValue;
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  alert: {
    flexDirection: 'row',
  },
  icon: {
    alignSelf: 'center',
  },
  textContent: {
    flexDirection: 'row',
    flexShrink: 1,
  },
});

const Alert: FunctionComponent<AlertPropsType> = ({
  children,
  theme,
  testID,
  variant,
  description,
  hideIcon,
  Icon,
  iconSize,
  iconColor,
  style,
}) => {

  const variantColor = getVariantColorStyle(variant);

  const alertStyle = useViewStyles(() => [
    {
      borderRadius: theme.borders.radius.medium,
      padding: theme.spacings.sXS,
    },
    getAlertStyle(theme, variant),
    styles.alert,
    style,
  ], [style, theme, variant]);

  const textContentStyle = useViewStyles(() => [
    {
      marginLeft: theme.spacings.sXS,
    },
    styles.textContent,
  ], [theme.spacings.sXS]);

  const textStyle = useTextStyles(() => [
    {
      color: theme.colors[variantColor],
    },
  ], [theme.colors, variantColor]);

  const renderIcon = (): JSX.Element | React.ReactNode => {
    const color = iconColor ? iconColor : theme.colors[variantColor];
    if (hideIcon) { return null; }
    if (Icon) return <Icon testID="alert-custom-icon" width={iconSize} height={iconSize} color={color} />;

    const DefaultIcon = getDefaultIcon(variant);

    return <DefaultIcon testID="alert-icon" color={color} />;
  };

  const renderDescription = (): JSX.Element | React.ReactNode => {
    if (description) return <Text testID="alert-description" variant="caption" style={textStyle}>{description}</Text>;
    return children;
  };

  return (
    <View style={alertStyle} testID={testID}>
      <View style={styles.icon}>
        {renderIcon()}
      </View>
      <View style={textContentStyle}>
        {renderDescription()}
      </View>
    </View>
  );
};

export default withTheme(Alert);
