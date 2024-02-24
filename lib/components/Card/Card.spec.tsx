import React from 'react';
import { ViewStyle } from 'react-native';

import { render, fireEvent } from '@testing-library/react-native';

import { Card } from '..';

import { DefaultTheme } from '../../theme';
import { getCardCustomBorderStyle, getCardSizeStyle, getCardVariantStyle } from './utils';

describe('card snapshot', () => {
  it('default', () => {
    const tree = render(
      <Card />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('card small', () => {
    const tree = render(
      <Card size="small" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('card no shadow', () => {
    const tree = render(
      <Card showShadow={false} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('card custow arrow color', () => {
    const tree = render(
      <Card showArrow arrowColor="red" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('card arrow highlighted100', () => {
    const tree = render(
      <Card showArrow variant="highlighted100" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('card big', () => {
    const tree = render(
      <Card size="big" />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('card disabled', () => {
    const tree = render(
      <Card disabled />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('card type highlighted50', () => {
    const result = render(
      <Card variant="highlighted50" />,
    );

    const card = result.getByTestId('card-touchable');

    expect(card).toBeDefined();
    expect(card.props?.style.borderWidth).toEqual(DefaultTheme.borders.width.thin);
    expect(card.props?.style.borderColor).toEqual(DefaultTheme.colors.primary700);
    expect(result.toJSON()).toMatchSnapshot();
  });

  it('card type highlighted100', () => {
    const result = render(
      <Card variant="highlighted100" />,
    );

    const card = result.getByTestId('card-touchable');

    expect(card).toBeDefined();
    expect(card.props?.style.borderWidth).toEqual(DefaultTheme.borders.width.thin);
    expect(card.props?.style.borderColor).toEqual(DefaultTheme.colors.primary600);
    expect(card.props?.style.backgroundColor).toEqual(DefaultTheme.colors.primaryMain);
    expect(result.toJSON()).toMatchSnapshot();
  });

  it('card with custom style', () => {
    const result = render(
      <Card style={{ borderWidth: 1, borderColor: DefaultTheme.colors.primary700 }} />,
    );

    const card = result.getByTestId('card-touchable');

    expect(card).toBeDefined();
    expect(card.props?.style.borderWidth).toEqual(1);
    expect(card.props?.style.borderColor).toEqual(DefaultTheme.colors.primary700);
    expect(result.toJSON()).toMatchSnapshot();
  });
});

describe('Card events', () => {
  it('onPress enabled', () => {
    const handlePress = jest.fn();

    const result = render(
      <Card
        onPress={handlePress}
      >
        Card mock
      </Card>,
    );

    const touchable = result.getByTestId('card-touchable');

    fireEvent.press(touchable);

    expect(handlePress).toHaveBeenCalled();
  });

  it('onPress disabled', () => {
    const handlePress = jest.fn();

    const result = render(
      <Card
        onPress={handlePress}
        disabled
      >
        Card mock
      </Card>,
    );

    const touchable = result.getByTestId('card-touchable');

    fireEvent.press(touchable);

    expect(handlePress).not.toHaveBeenCalled();
  });

  it('show on loading', async () => {
    const handlePress = jest.fn();

    const result = render(
      <Card
        onPress={handlePress}
        loading
      >
        Card mock
      </Card>,
    );

    const touchables = result.queryByTestId('card-touchable');

    const shimmerId = result.getByTestId('shimmer-id');

    expect(shimmerId).toBeTruthy();
    expect(touchables).toBeNull();
  });
});

describe('utils', () => {
  it('getCardSizeStyle Big', () => {
    const sizeStyleMock: ViewStyle = {
      minHeight: 128,
      padding: 20,
    };

    const sizeStyle = getCardSizeStyle(DefaultTheme, 'big');

    expect(sizeStyle).toEqual(sizeStyleMock);
  });

  it('getCardSizeStyle Small', () => {
    const sizeStyleMock: ViewStyle = {
      width: 135,
      padding: 16,
      height: 120,
    };

    const sizeStyle = getCardSizeStyle(DefaultTheme, 'small');

    expect(sizeStyle).toEqual(sizeStyleMock);
  });

  it('getCardTypeStyle default', () => {
    const cardTypeStyle = getCardVariantStyle(DefaultTheme, 'default');

    expect(cardTypeStyle).toEqual(null);
  });

  it('getCardTypeStyle highlighted50', () => {
    const cardTypeStyleMock: ViewStyle = {
      borderWidth: DefaultTheme.borders.width.thin,
      borderColor: DefaultTheme.colors.primary700,
    };

    const cardTypeStyle = getCardVariantStyle(DefaultTheme, 'highlighted50');

    expect(cardTypeStyle).toEqual(cardTypeStyleMock);
  });

  it('getCardTypeStyle highlighted100', () => {
    const cardTypeStyleMock: ViewStyle = {
      borderWidth: DefaultTheme.borders.width.thin,
      borderColor: DefaultTheme.colors.primary600,
      backgroundColor: DefaultTheme.colors.primaryMain,
    };

    const cardTypeStyle = getCardVariantStyle(DefaultTheme, 'highlighted100');

    expect(cardTypeStyle).toEqual(cardTypeStyleMock);
  });

  it('getCardCustomBorderStyle with custom borderColor param', () => {
    const borderColor: string = DefaultTheme.colors.feedbackAlert400;

    const cardBorderStyleMock: ViewStyle = {
      borderWidth: DefaultTheme.borders.width.thin,
      borderColor,
    };

    const cardBorderStyle = getCardCustomBorderStyle(DefaultTheme, borderColor);

    expect(cardBorderStyle).toEqual(cardBorderStyleMock);
  });

  it('getCardCustomBorderStyle with border param undefined', () => {
    const cardBorderStyle = getCardCustomBorderStyle(DefaultTheme);

    expect(cardBorderStyle).toBeNull();
  });
});
