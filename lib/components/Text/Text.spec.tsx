import React from 'react';
import { StyleSheet, Text as RNText } from 'react-native';

import { render } from '@testing-library/react-native';

import Text from '.';
import { DefaultTheme } from '../../theme';
import { ColorPaletesType, FontWeightType } from '../../tokens';
import { calcLineHeight } from '../../utils/typography';
import {
  getColorStyle, getVariantStyle, getWeightStyle, TextVariantType,
} from './utils';

const variants: TextVariantType[] = [
  // heading
  'headingDisplay',
  'headingXLarge',
  'headingLarge',
  'headingMedium',
  'headingSmall',
  // paragraph regular
  'subtitle',
  'body',
  'bodySmall',
  'caption',
  // small
  'small',
  'smallCaps',
  // one line
  'oneLineHuge',
  'oneLineLarge',
  'oneLineMedium',
  'oneLineSmall',
  'oneLineCaption',
  'oneLineSemibold',
  'oneLineBoldHuge',
  'oneLineBoldExtraLarge',
  'oneLineBoldLarge',
  'oneLineBoldMedium',
  'oneLineBoldSmall',
];

describe('Text', () => {
  it('renders correctly', () => {
    render(
      <Text>
        Hellow World
      </Text>,
    );
  });

  it('test children', () => {
    const testRenderer = render(
      <Text>
        Hellow World
      </Text>,
    );

    expect(testRenderer.UNSAFE_getByType(RNText).props.children).toBe('Hellow World');
  });
});

describe('Text styles', () => {
  it('color undefined', () => {
    const testRenderer = render(
      <Text color={undefined}>
        Hellow World
      </Text>,
    );

    const nativeInstance = testRenderer.UNSAFE_getByType(RNText);
    const nativeStyle = StyleSheet.flatten(nativeInstance.props.style);

    expect(nativeStyle).toHaveProperty('color', '#676D79');
  });

  it('test variant styles on React Native Text', () => {
    const renderTextWithVariant = (children: React.ReactNode, variant: TextVariantType) => {
      const testRenderer = render(
        <Text variant={variant} theme={DefaultTheme}>
          {children}
        </Text>,
      );

      const nativeInstance = testRenderer.UNSAFE_getByType(RNText);
      const nativeStyle = StyleSheet.flatten(nativeInstance.props.style);
      const variantStyles = getVariantStyle(DefaultTheme, variant);

      return {
        nativeStyle,
        variantStyles,
      };
    };

    variants.forEach(variant => {
      const { nativeStyle, variantStyles } = renderTextWithVariant(
        'Hellow World',
        variant,
      );

      expect(nativeStyle)
        .toEqual(expect.objectContaining(variantStyles));
    });
  });

  it('test color styles on React Native Text', () => {
    const renderTextWithColor = (children: React.ReactNode, color: ColorPaletesType) => {
      const testRenderer = render(
        <Text color={color} theme={DefaultTheme}>
          {children}
        </Text>,
      );

      const nativeInstance = testRenderer.UNSAFE_getByType(RNText);
      const nativeStyle = StyleSheet.flatten(nativeInstance.props.style);
      const colorStyles = getColorStyle(DefaultTheme, color);

      return {
        nativeStyle,
        colorStyles,
      };
    };

    const colors = Object.keys(DefaultTheme.colors) as ColorPaletesType[];

    colors.forEach(color => {
      const { nativeStyle, colorStyles } = renderTextWithColor(
        'Hellow World',
        color,
      );

      expect(nativeStyle)
        .toEqual(expect.objectContaining(colorStyles));
    });
  });

  it('test weight styles on React Native Text', () => {
    const renderTextWithWeight = (children: React.ReactNode, weight: FontWeightType) => {
      const testRenderer = render(
        <Text weight={weight} theme={DefaultTheme}>
          {children}
        </Text>,
      );

      const nativeInstance = testRenderer.UNSAFE_getByType(RNText);
      const nativeStyle = StyleSheet.flatten(nativeInstance.props.style);
      const weightStyles = getWeightStyle(DefaultTheme, weight);

      return {
        nativeStyle,
        weightStyles,
      };
    };

    const weights = Object.keys(DefaultTheme.typography.weights) as FontWeightType[];

    weights.forEach(weight => {
      const { nativeStyle, weightStyles } = renderTextWithWeight(
        'Hellow World',
        weight,
      );

      expect(nativeStyle)
        .toEqual(expect.objectContaining(weightStyles));
    });
  });

  it('test custom style', () => {
    const customStyles = {
      backgroundColor: 'red',
      fontSize: 50,
    };
    const testRenderer = render(
      <Text
        style={customStyles}
        variant="small"
      >
        Hellow World
      </Text>,
    );

    const nativeInstance = testRenderer.UNSAFE_getByType(RNText);
    const nativeStyle = StyleSheet.flatten(nativeInstance.props.style);

    expect(nativeStyle).toEqual(expect.objectContaining(customStyles));
  });

  it('test line height', () => {
    const testRenderer = render(
      <Text
        variant="small"
        lineHeight="large"
      >
        Hellow World
      </Text>,
    );

    const nativeInstance = testRenderer.UNSAFE_getByType(RNText);
    const nativeStyle = StyleSheet.flatten(nativeInstance.props.style);

    expect(nativeStyle.lineHeight).toEqual(20);
  });
});

describe('Text snapshot', () => {
  it.each(variants)('should match variant snapshot', variant => {
    const tree = render(
      <Text variant={variant}>
        {variant}
      </Text>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('Should have the default variant as body', () => {
    const withoutVariant = render(
      <Text>
        Default variant
      </Text>,
    ).toJSON();
    const bodyVariant = render(
      <Text variant="body">
        Default variant
      </Text>,
    ).toJSON();

    expect(withoutVariant).toEqual(bodyVariant);
  });
});

describe('Text utils', () => {
  it('lineHeight', () => {
    expect(
      calcLineHeight(DefaultTheme.typography.sizes.small, DefaultTheme.typography.lineHeights.small),
    ).toBe(16);

    expect(
      calcLineHeight(DefaultTheme.typography.sizes.small, 0),
    ).toBeUndefined();
  });
});
