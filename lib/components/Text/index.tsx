import React from 'react';
import {
  StyleProp, StyleSheet, Text as RNText, TextProps as RNTextProp, TextStyle,
} from 'react-native';

import { useTextStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import {
  ColorPaletesType, FontWeightType, LineHeightType, Typography,
} from '../../tokens';
import {
  getColorStyle, getVariantStyle, getWeightStyle, TextVariantType,
} from './utils';

export type { TextVariantType } from './utils';

export type TextPropTypes = RNTextProp & {
  theme: AppThemeType;
  style?: StyleProp<TextStyle>;
  color?: ColorPaletesType;
  variant?: TextVariantType;
  weight?: FontWeightType;
  lineHeight?: LineHeightType;
};

const styles = StyleSheet.create({
  text: {
    letterSpacing: Typography.letterSpaces.default,
    flexShrink: 1,
  },
});

const Text: React.FC<TextPropTypes> = ({
  children,
  color,
  theme,
  style,
  variant = 'body',
  weight,
  lineHeight,
  allowFontScaling = false,
  ...others
}) => {

  const textStyles = useTextStyles(() => [
    styles.text,
    getColorStyle(theme, color ?? 'neutralGray600'),
    getVariantStyle(theme, variant, lineHeight),
    getWeightStyle(theme, weight),
    style,
  ], [color, lineHeight, style, theme, variant, weight]);

  return (
    <RNText
      {...others}
      allowFontScaling={allowFontScaling}
      style={textStyles}
    >
      {children}
    </RNText>
  );
};

export default withTheme(Text);
