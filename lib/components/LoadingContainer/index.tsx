import React from 'react';
import {
  ColorValue, StyleSheet, View, ViewProps,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { useViewStyles } from '../../hooks';
import { useTextStyles } from '../../hooks/useStyles/index';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import { ColorPaletesType } from '../../tokens';
import Loading, { LoadingPropsType } from '../Loading';
import Text from '../Text';
import {
  getLoadingBackgroundColor,
  getLoadingContainerMarginStyle,
  getContainerStyle,
  getTextColor,
  getLinearGradientColors,
  getLoadingColor,
} from './utils';

export type LoadingContainerVariantType = 'secondary' | 'white' | 'default';

export type LoadingContainerPropsType = ViewProps & {
  theme: AppThemeType;
  visible?: boolean;
  backgroundColor?: ColorValue;
  loadingBackgroundColor?: ColorPaletesType;
  loadingColor?: LoadingPropsType['color'];
  loadingCircleSize?: LoadingPropsType['circleSize'];
  loadingText?: string;
  loadingTextColor?: ColorPaletesType;
  customGradientBackgroundColors?: string[];
  variant?: LoadingContainerVariantType;
};

const startLinearGradient = { x: 1, y: 0 };
const endLinearGradient = { x: 1, y: 1 };

const LoadingContainer: React.FC<LoadingContainerPropsType> = ({
  loadingColor,
  loadingCircleSize,
  loadingBackgroundColor,
  loadingText,
  loadingTextColor,
  variant,
  visible,
  theme,
  backgroundColor,
  customGradientBackgroundColors,
  style,
  ...others
}) => {
  const containerStyles = useViewStyles(() => [
    StyleSheet.absoluteFill,
    getContainerStyle(loadingText),
    style,
  ], [loadingText, style]);

  const loadingTextStyles = useTextStyles(() => [
    {
      fontSize: theme.typography.sizes.XXXL,
      marginLeft: theme.spacings.sLarge,
      lineHeight: theme.typography.sizes.huge,
    },
  ], [theme]);

  const loadingContainer = useViewStyles(() => [
    {
      backgroundColor: getLoadingBackgroundColor(theme, variant, loadingBackgroundColor),
      padding: theme.spacings.sSmall,
      borderRadius: theme.borders.radius.medium,
    },
    getLoadingContainerMarginStyle(theme, loadingText),
  ], [variant, theme, loadingBackgroundColor, loadingText]);

  function renderLoadingText() {
    if (!loadingText) return null;
    return (
      <Text
        color={getTextColor(variant, loadingTextColor)}
        style={loadingTextStyles}
        weight="bold"
      >
        {loadingText}
      </Text>
    );
  }

  if (!visible) return null;

  return (
    <LinearGradient
      testID="loading-container"
      {...others}
      colors={getLinearGradientColors(theme, variant, backgroundColor, customGradientBackgroundColors)}
      start={startLinearGradient}
      end={endLinearGradient}
      style={containerStyles}
    >
      {renderLoadingText()}
      <View style={loadingContainer}>
        <Loading
          color={getLoadingColor(variant, loadingColor)}
          circleSize={loadingCircleSize}
        />
      </View>
    </LinearGradient>
  );
};

LoadingContainer.defaultProps = {
  visible: true,
  variant: 'default',
};

export default withTheme(LoadingContainer);
