import { TextStyle } from 'react-native';

import { AppThemeType } from '../../theme/default';
import { ColorPaletesType, FontWeightType, LineHeightType } from '../../tokens';
import { calcLineHeight } from '../../utils/typography';

export type TextVariantType =
  // heading
  'headingDisplay' |
  'headingXLarge' |
  'headingLarge' |
  'headingMedium' |
  'headingSmall' |
  // paragraph regular
  'subtitle' |
  'body' |
  'bodySmall' |
  'caption' |
  // small
  'small' |
  'smallCaps' |
  // one line
  'oneLineHuge' |
  'oneLineLarge' |
  'oneLineMedium' |
  'oneLineSmall' |
  'oneLineCaption' |
  'oneLineSemibold' |
  'oneLineBoldHuge' |
  'oneLineBoldExtraLarge' |
  'oneLineBoldLarge' |
  'oneLineBoldMedium' |
  'oneLineBoldSmall';

const getHeadingStyles = (theme: AppThemeType, lineHeight: number | null) => ({
  headingDisplay: {
    ...theme.typography.weights.bold,
    fontSize: theme.typography.sizes.huge,
    lineHeight: calcLineHeight(theme.typography.sizes.huge, lineHeight ?? theme.typography.lineHeights.medium),
  },
  headingXLarge: {
    ...theme.typography.weights.bold,
    fontSize: theme.typography.sizes.XXXL,
    lineHeight: calcLineHeight(theme.typography.sizes.XXXL, lineHeight ?? theme.typography.lineHeights.medium),
  },
  headingLarge: {
    ...theme.typography.weights.bold,
    fontSize: theme.typography.sizes.XXL,
    lineHeight: calcLineHeight(theme.typography.sizes.XXL, lineHeight ?? theme.typography.lineHeights.large),
  },
  headingMedium: {
    ...theme.typography.weights.bold,
    fontSize: theme.typography.sizes.XL,
    lineHeight: calcLineHeight(theme.typography.sizes.XL, lineHeight ?? theme.typography.lineHeights.medium),
  },
  headingSmall: {
    ...theme.typography.weights.bold,
    fontSize: theme.typography.sizes.large,
    lineHeight: calcLineHeight(theme.typography.sizes.large, lineHeight ?? theme.typography.lineHeights.medium),
  },
});

const getSmallStyles = (theme: AppThemeType, lineHeight: number | null) => ({
  small: {
    ...theme.typography.weights.bold,
    fontSize: theme.typography.sizes.XS,
    lineHeight: calcLineHeight(14, lineHeight ?? theme.typography.lineHeights.medium),
  },
  smallCaps: {
    ...theme.typography.weights.bold,
    fontSize: theme.typography.sizes.XXXS,
    lineHeight: calcLineHeight(theme.typography.sizes.XXXS, lineHeight ?? theme.typography.lineHeights.medium),
    textTransform: 'uppercase' as TextStyle['textTransform'],
  },
});

const getOneLineStyles = (theme: AppThemeType, lineHeight: number | null) => ({
  oneLineHuge: {
    ...theme.typography.weights.regular,
    fontSize: theme.typography.sizes.XL,
    lineHeight: calcLineHeight(theme.typography.sizes.XL, lineHeight ?? theme.typography.lineHeights.small),
  },
  oneLineLarge: {
    ...theme.typography.weights.regular,
    fontSize: theme.typography.sizes.large,
    lineHeight: calcLineHeight(theme.typography.sizes.large, lineHeight ?? theme.typography.lineHeights.small),
  },
  oneLineMedium: {
    ...theme.typography.weights.regular,
    fontSize: theme.typography.sizes.small,
    lineHeight: calcLineHeight(theme.typography.sizes.small, lineHeight ?? theme.typography.lineHeights.small),
  },
  oneLineSmall: {
    ...theme.typography.weights.regular,
    fontSize: theme.typography.sizes.XS,
    lineHeight: calcLineHeight(theme.typography.sizes.XS, lineHeight ?? theme.typography.lineHeights.small),
  },
  oneLineCaption: {
    ...theme.typography.weights.regular,
    fontSize: theme.typography.sizes.XXS,
    lineHeight: calcLineHeight(theme.typography.sizes.XXS, lineHeight ?? theme.typography.lineHeights.small),
  },
  oneLineSemibold: {
    ...theme.typography.weights.semiBold,
    fontSize: theme.typography.sizes.medium,
    lineHeight: calcLineHeight(theme.typography.sizes.medium, lineHeight ?? theme.typography.lineHeights.small),
  },
  oneLineBoldHuge: {
    ...theme.typography.weights.bold,
    fontSize: theme.typography.sizes.XL,
    lineHeight: calcLineHeight(theme.typography.sizes.XL, lineHeight ?? theme.typography.lineHeights.small),
  },
  oneLineBoldExtraLarge: {
    ...theme.typography.weights.bold,
    fontSize: theme.typography.sizes.large,
    lineHeight: calcLineHeight(theme.typography.sizes.large, lineHeight ?? theme.typography.lineHeights.small),
  },
  oneLineBoldLarge: {
    ...theme.typography.weights.bold,
    fontSize: theme.typography.sizes.medium,
    lineHeight: calcLineHeight(theme.typography.sizes.medium, lineHeight ?? theme.typography.lineHeights.small),
  },
  oneLineBoldMedium: {
    ...theme.typography.weights.bold,
    fontSize: theme.typography.sizes.small,
    lineHeight: calcLineHeight(theme.typography.sizes.small, lineHeight ?? theme.typography.lineHeights.small),
  },
  oneLineBoldSmall: {
    ...theme.typography.weights.bold,
    fontSize: theme.typography.sizes.XS,
    lineHeight: calcLineHeight(theme.typography.sizes.XS, lineHeight ?? theme.typography.lineHeights.small),
  },
});

const getParagraphStyles = (theme: AppThemeType, lineHeight: number | null) => ({
  subtitle: {
    ...theme.typography.weights.regular,
    fontSize: theme.typography.sizes.medium,
    lineHeight: calcLineHeight(theme.typography.sizes.medium, lineHeight ?? theme.typography.lineHeights.large),
  },
  bodySmall: {
    ...theme.typography.weights.regular,
    fontSize: theme.typography.sizes.XS,
    lineHeight: calcLineHeight(theme.typography.sizes.XS, lineHeight ?? theme.typography.lineHeights.large),
  },
  caption: {
    ...theme.typography.weights.regular,
    fontSize: theme.typography.sizes.XXS,
    lineHeight: calcLineHeight(theme.typography.sizes.XXS, lineHeight ?? theme.typography.lineHeights.medium),
  },
  body: {
    ...theme.typography.weights.regular,
    fontSize: theme.typography.sizes.small,
    lineHeight: calcLineHeight(theme.typography.sizes.small, lineHeight ?? theme.typography.lineHeights.large),
  },
});

export function getVariantStyle(
  theme: AppThemeType,
  variant: TextVariantType,
  lineHeightName?: LineHeightType,
): TextStyle {
  const lineHeight = lineHeightName ? theme.typography.lineHeights[lineHeightName] : null;

  const variantStyles: Record<TextVariantType, TextStyle> = {
    // heading
    ...getHeadingStyles(theme, lineHeight),
    // small
    ...getSmallStyles(theme, lineHeight),
    // one line
    ...getOneLineStyles(theme, lineHeight),
    // paragraph
    ...getParagraphStyles(theme, lineHeight),
  };

  return variantStyles[variant];
}

export function getColorStyle(theme: AppThemeType, color: ColorPaletesType): TextStyle | null {
  return {
    color: theme.colors[color],
  };
}

export function getWeightStyle(theme: AppThemeType, weight?: FontWeightType): TextStyle | null {
  if (!weight) { return null; }

  return theme.typography.weights[weight];
}
