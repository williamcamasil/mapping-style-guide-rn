import { Platform, TextStyle } from 'react-native';

export type FontWeightValuesType = {
  bold: {
    fontFamily: TextStyle['fontFamily'];
    fontWeight: TextStyle['fontWeight'];
  };
  semiBold: {
    fontFamily: TextStyle['fontFamily'];
    fontWeight: TextStyle['fontWeight'];
  };
  regular: {
    fontFamily: TextStyle['fontFamily'];
    fontWeight: TextStyle['fontWeight'];
  };
};

const getFontWeights = () => {
  const platforms: Record<string, FontWeightValuesType> = {
    android: {
      bold: {
        fontFamily: 'AvertaCY-Bold',
        fontWeight: undefined,
      },
      semiBold: {
        fontFamily: 'AvertaCY-Semibold',
        fontWeight: undefined,
      },
      regular: {
        fontFamily: 'AvertaCY-Regular',
        fontWeight: undefined,
      },
    },
    ios: {
      bold: {
        fontFamily: 'Averta CY',
        fontWeight: 'bold',
      },
      semiBold: {
        fontFamily: 'Averta CY',
        fontWeight: '500',
      },
      regular: {
        fontFamily: 'Averta CY',
        fontWeight: 'normal',
      },
    },
  };

  /* istanbul ignore next */
  return Platform.select<FontWeightValuesType>(platforms) ?? platforms.ios;
};

export const Typography = {
  sizes: {
    huge: 48,
    XXXL: 40,
    XXL: 33,
    XL: 27,
    large: 23,
    medium: 19,
    small: 16,
    XS: 14,
    XXS: 13,
    XXXS: 11,
  },
  weights: getFontWeights(),
  lineHeights: {
    /**
     * 100%
     */
    small: 1,
    /**
     * 120%
     */
    medium: 1.2,
    /**
     * 140%
     */
    large: 1.4,
  },
  letterSpaces: {
    default: -0.02,
  },
};

export type TypographyType = typeof Typography;
export type FontSizeType = keyof TypographyType['sizes'];
export type FontWeightType = keyof FontWeightValuesType;
export type LineHeightType = keyof TypographyType['lineHeights'];
export type LetterSpaceType = keyof TypographyType['letterSpaces'];
