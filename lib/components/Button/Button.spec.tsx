import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

import { within, render, fireEvent } from '@testing-library/react-native';

import Button from '.';
import { Icons } from '../../assets';
import { DefaultTheme } from '../../theme';
import Loading from '../Loading';
import Text from '../Text';
import { getSizeStyle, getTextColor, getVariantStyle } from './utils';

describe('Button', () => {
  it('Button pressed', () => {
    const onPressMock = jest.fn();
    const testIdMock = 'test-id-mock';

    const result = render(
      <Button onPress={onPressMock} testID={testIdMock}>
        Clique me
      </Button>,
    );

    const button = result.getByTestId(testIdMock);

    fireEvent.press(button);

    expect(onPressMock).toBeCalled();
  });

  it('Button disabled pressed', () => {
    const onPressMock = jest.fn();
    const testIdMock = 'test-id-mock';

    const result = render(
      <Button onPress={onPressMock} disabled testID={testIdMock}>
        Clique me
      </Button>,
    );

    const button = result.getByTestId(testIdMock);

    fireEvent.press(button);

    expect(onPressMock).not.toBeCalled();
  });

  it('Button loading renders correctly', () => {
    const onPress = jest.fn();
    const testRenderer = render(
      <Button onPress={onPress} loading>
        Clique me
      </Button>,
    );

    expect(testRenderer.UNSAFE_getByType(Loading)).toBeDefined();
  });

  it('Button loading pressed', () => {
    const onPressMock = jest.fn();
    const testIdMock = 'test-id-mock';

    const result = render(
      <Button onPress={onPressMock} loading testID={testIdMock}>
        Clique me
      </Button>,
    );

    const button = result.getByTestId(testIdMock);

    fireEvent.press(button);

    expect(onPressMock).not.toBeCalled();
  });

  it('Should render Icon component', () => {
    const textToRender = '';

    const result = render(
      <Button
        disabled
        onPress={jest.fn()}
        variant="containedPrimary"
        size="large"
        loading={false}
        Icon={Icons.Small.Right}
        block={false}
      >
        {textToRender}
      </Button>,
    );

    const containerComponent = result.getByTestId('container-icon');
    const iconComponent = within(containerComponent).UNSAFE_getByType(Icons.Small.Right);

    expect(iconComponent).toBeTruthy();
    expect(() => {
      result.UNSAFE_getByType(Text);
    }).toThrowError();
  });

  it('Should render Icon component with text in children', () => {
    const textToRender = 'Clique aqui';

    const result = render(
      <Button
        disabled
        onPress={jest.fn()}
        variant="containedPrimary"
        size="large"
        loading={false}
        Icon={Icons.Small.Right}
        block={false}
      >
        {textToRender}
      </Button>,
    );

    const containerComponent = result.getByTestId('container-icon');
    const TextComponent = result.getByTestId('text-with-icon');
    const iconComponent = within(containerComponent).UNSAFE_getByType(Icons.Small.Right);

    expect(iconComponent).toBeTruthy();
    expect(TextComponent).toBeTruthy();
  });

  it('Should text to render component with prop block true', () => {
    const textToRender = '';

    const result = render(
      <Button
        disabled
        onPress={jest.fn()}
        variant="containedPrimary"
        size="large"
        loading={false}
        Icon={Icons.Small.Right}
      >
        {textToRender}
      </Button>,
    );

    const buttonComponent = result.getByTestId('container-button');

    const viewStyled = StyleSheet.flatten(buttonComponent.props.style);

    expect(viewStyled).not.toHaveProperty('flexDirection', 'row');
  });

  it('Should text to render component with prop block false', () => {
    const textToRender = '';

    const result = render(
      <Button
        disabled
        onPress={jest.fn()}
        variant="containedPrimary"
        size="large"
        loading={false}
        Icon={Icons.Small.Right}
        block={false}
      >
        {textToRender}
      </Button>,
    );

    const buttonComponent = result.getByTestId('container-button');

    const viewStyled = StyleSheet.flatten(buttonComponent.props.style);

    expect(viewStyled).toHaveProperty('flexDirection', 'row');
  });
});

describe('Button snapshot', () => {
  it('default', () => {
    const tree = render(<Button onPress={() => null}>Clique me</Button>).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Button small', () => {
    const tree = render(
      <Button onPress={() => null} size="small">
        Clique me
      </Button>,
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Button medium', () => {
    const tree = render(
      <Button onPress={() => null} size="medium">
        Clique me
      </Button>,
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Button large', () => {
    const tree = render(
      <Button onPress={() => null} size="large">
        Clique me
      </Button>,
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('Utils', () => {
  it('getVariantStyle containedPrimary not disabled', () => {
    const variantStyleMock: ViewStyle = {
      backgroundColor: DefaultTheme.colors.primaryMain,
      borderWidth: DefaultTheme.borders.width.none,
    };

    const variantStyle = getVariantStyle(DefaultTheme, 'containedPrimary', false);

    expect(variantStyle).toEqual(variantStyleMock);
  });

  it('getVariantStyle containedPrimary disabled', () => {
    const variantStyleMock: ViewStyle = {
      backgroundColor: DefaultTheme.colors.primary100,
      borderWidth: DefaultTheme.borders.width.none,
    };

    const variantStyle = getVariantStyle(DefaultTheme, 'containedPrimary', true);

    expect(variantStyle).toEqual(variantStyleMock);
  });

  it('getVariantStyle containedSecondary not disabled', () => {
    const variantStyleMock: ViewStyle = {
      backgroundColor: DefaultTheme.colors.primary200,
      borderWidth: DefaultTheme.borders.width.none,
    };

    const variantStyle = getVariantStyle(DefaultTheme, 'containedSecondary', false);

    expect(variantStyle).toEqual(variantStyleMock);
  });

  it('getVariantStyle containedSecondary disabled', () => {
    const variantStyleMock: ViewStyle = {
      backgroundColor: DefaultTheme.colors.primary100,
      borderWidth: DefaultTheme.borders.width.none,
    };

    const variantStyle = getVariantStyle(DefaultTheme, 'containedSecondary', true);

    expect(variantStyle).toEqual(variantStyleMock);
  });

  it('getVariantStyle outlinedPrimary not disabled', () => {
    const variantStyleMock: ViewStyle = {
      backgroundColor: 'transparent',
      borderWidth: DefaultTheme.borders.width.thin,
      borderColor: DefaultTheme.colors.primary600,
    };

    const variantStyle = getVariantStyle(DefaultTheme, 'outlinedPrimary', false);

    expect(variantStyle).toEqual(variantStyleMock);
  });

  it('getVariantStyle outlinedPrimary disabled', () => {
    const variantStyleMock: ViewStyle = {
      backgroundColor: 'transparent',
      borderWidth: DefaultTheme.borders.width.thin,
      borderColor: DefaultTheme.colors.primary100,
    };

    const variantStyle = getVariantStyle(DefaultTheme, 'outlinedPrimary', true);

    expect(variantStyle).toEqual(variantStyleMock);
  });

  it('getVariantStyle outlinedSecondary not disabled', () => {
    const variantStyleMock: ViewStyle = {
      backgroundColor: 'transparent',
      borderWidth: DefaultTheme.borders.width.thin,
      borderColor: DefaultTheme.colors.neutralGray300,
    };

    const variantStyle = getVariantStyle(DefaultTheme, 'outlinedSecondary', false);

    expect(variantStyle).toEqual(variantStyleMock);
  });

  it('getVariantStyle outlinedSecondary disabled', () => {
    const variantStyleMock: ViewStyle = {
      backgroundColor: 'transparent',
      borderWidth: DefaultTheme.borders.width.thin,
      borderColor: DefaultTheme.colors.neutralGray100,
    };

    const variantStyle = getVariantStyle(DefaultTheme, 'outlinedSecondary', true);

    expect(variantStyle).toEqual(variantStyleMock);
  });

  it('getVariantStyle text not disabled', () => {
    const variantStyleMock: ViewStyle = {
      backgroundColor: 'transparent',
      borderWidth: DefaultTheme.borders.width.none,
    };

    const variantStyle = getVariantStyle(DefaultTheme, 'text', false);

    expect(variantStyle).toEqual(variantStyleMock);
  });

  it('getVariantStyle text disabled', () => {
    const variantStyleMock: ViewStyle = {
      backgroundColor: DefaultTheme.colors.neutralGray100,
      borderWidth: DefaultTheme.borders.width.none,
    };

    const variantStyle = getVariantStyle(DefaultTheme, 'text', true);

    expect(variantStyle).toEqual(variantStyleMock);
  });

  it('getTextColor containedSecondary not disabled', () => {
    const textColor = getTextColor('containedSecondary', false);

    expect(textColor).toEqual('primaryMain');
  });

  it('getTextColor containedSecondary disabled', () => {
    const textColor = getTextColor('containedSecondary', true);

    expect(textColor).toEqual('primary300');
  });

  it('getTextColor outlinedPrimary not disabled', () => {
    const textColor = getTextColor('outlinedPrimary', false);

    expect(textColor).toEqual('primaryMain');
  });

  it('getTextColor outlinedPrimary disabled', () => {
    const textColor = getTextColor('outlinedPrimary', true);

    expect(textColor).toEqual('primary300');
  });

  it('getTextColor outlinedSecondary not disabled', () => {
    const textColor = getTextColor('outlinedSecondary', false);

    expect(textColor).toEqual('neutralGray600');
  });

  it('getTextColor outlinedSecondary disabled', () => {
    const textColor = getTextColor('outlinedSecondary', true);

    expect(textColor).toEqual('neutralGray200');
  });

  it('getTextColor text not disabled', () => {
    const textColor = getTextColor('text', false);

    expect(textColor).toEqual('neutralGray500');
  });

  it('getTextColor text disabled', () => {
    const textColor = getTextColor('text', true);

    expect(textColor).toEqual('neutralGray400');
  });

  it('getTextColor containedPrimary not disabled', () => {
    const textColor = getTextColor('containedPrimary', false);

    expect(textColor).toEqual('neutralWhite');
  });

  it('getTextColor containedPrimary disabled', () => {
    const textColor = getTextColor('containedPrimary', true);

    expect(textColor).toEqual('primary300');
  });

  it('getSizeStyle large', () => {
    const sizeStyleMock: ViewStyle = {
      height: 64,
      minWidth: 64,
      paddingHorizontal: 32,
    };

    const sizeStyle = getSizeStyle(DefaultTheme, 'large', true);

    expect(sizeStyle).toEqual(sizeStyleMock);

    const sizeStyleNoText = getSizeStyle(DefaultTheme, 'large', false);

    expect(sizeStyleNoText.paddingHorizontal).toEqual(undefined);
  });

  it('getSizeStyle small', () => {
    const sizeStyleMock: ViewStyle = {
      height: 30,
      minWidth: 30,
      paddingHorizontal: 16,
    };

    const sizeStyle = getSizeStyle(DefaultTheme, 'small', true);

    expect(sizeStyle).toEqual(sizeStyleMock);

    const sizeStyleNoText = getSizeStyle(DefaultTheme, 'small', false);

    expect(sizeStyleNoText.paddingHorizontal).toEqual(undefined);
  });

  it('getSizeStyle medium', () => {
    const sizeStyleMock: ViewStyle = {
      height: 48,
      minWidth: 48,
      paddingHorizontal: 24,
    };

    const sizeStyle = getSizeStyle(DefaultTheme, 'medium', true);

    expect(sizeStyle).toEqual(sizeStyleMock);

    const sizeStyleNoText = getSizeStyle(DefaultTheme, 'medium', false);

    expect(sizeStyleNoText.paddingHorizontal).toEqual(undefined);
  });
});
