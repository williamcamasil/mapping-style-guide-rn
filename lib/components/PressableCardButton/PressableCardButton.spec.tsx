import 'react-native';
import React from 'react';

import {
  render, fireEvent,
} from '@testing-library/react-native';

import PressableCardButton from '.';
import { Icons } from '../../assets';

describe('PressableCardButton Component', () => {
  it('should render button with text Copiar código de barras and press button and text change to Código copiado', () => {
    const mockFunction = jest.fn();
    const result = render(
      <PressableCardButton
        title={'Copiar código\nde barras'}
        pressedTitle={'Código\ncopiado'}
        Icon={Icons.Default.Copy}
        PressedIcon={Icons.Default.Success}
        onPress={mockFunction}
        testID="copy-button"
      />,
    );

    expect(result.getByText('Copiar código\nde barras')).toBeDefined();

    const copyButton = result.getByTestId('copy-button');
    fireEvent.press(copyButton);

    expect(mockFunction).toHaveBeenCalled();
    expect(result.getByText('Código\ncopiado')).toBeDefined();
  });

  it('should render button with text Baixar boleto and press button and text change to Boleto baixado', () => {
    const mockFunction = jest.fn();
    const result = render(
      <PressableCardButton
        title={'Baixar\nboleto'}
        pressedTitle={'Boleto\nbaixado'}
        Icon={Icons.Default.Copy}
        PressedIcon={Icons.Default.Success}
        onPress={mockFunction}
        testID="download-button"
      />,
    );

    expect(result.getByText('Baixar\nboleto')).toBeDefined();

    const copyButton = result.getByTestId('download-button');
    fireEvent.press(copyButton);

    expect(mockFunction).toHaveBeenCalled();
    expect(result.getByText('Boleto\nbaixado')).toBeDefined();
  });
});

describe('PressableCardButton snapshots', () => {
  it('default copy button', () => {
    const mockFunction = jest.fn();
    const result = render(
      <PressableCardButton
        title={'Copiar código\nde barras'}
        pressedTitle={'Código\ncopiado'}
        Icon={Icons.Default.Copy}
        PressedIcon={Icons.Default.Success}
        onPress={mockFunction}
      />,
    ).toJSON();

    expect(result).toMatchSnapshot();
  });

  it('default download button', () => {
    const mockFunction = jest.fn();
    const result = render(
      <PressableCardButton
        title={'Baixar\nboleto'}
        pressedTitle={'Boleto\nbaixado'}
        Icon={Icons.Default.Copy}
        PressedIcon={Icons.Default.Success}
        onPress={mockFunction}
      />,
    ).toJSON();

    expect(result).toMatchSnapshot();
  });
});
