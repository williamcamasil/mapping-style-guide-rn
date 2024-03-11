import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';
import { createForm } from 'final-form';

import InputToken from '.';
import Form from '../Form';
import { isCurrentEmptyInputFocused } from './utils';

describe('tests with InputToken', () => {
  it('should save InputToken snapshot', () => {
    const result = render(
      <InputToken
        maxLength={6}
        value=""
        error={false}
      />,
    ).toJSON();

    expect(result).toMatchSnapshot();
  });

  it('should onFocus on InputToken', () => {
    const result = render(
      <InputToken
        maxLength={6}
        value=""
        error={false}
      />,
    );

    const input = result.getByTestId('rn-text-input');
    fireEvent(input, 'focus');

    expect(result.toJSON).toMatchSnapshot();
  });

  it('should onChange on InputToken', () => {
    const onChangeMock = jest.fn();
    const result = render(
      <InputToken
        maxLength={6}
        onChange={onChangeMock}
        value=""
        error={false}
      />,
    );

    fireEvent(result.getByTestId('rn-text-input'), 'changeText', '123');

    expect(onChangeMock).toBeCalledWith('123');
  });

  it('should onChange on InputToken and return error', () => {
    const onChangeMock = jest.fn();
    const result = render(
      <InputToken
        maxLength={4}
        onChange={onChangeMock}
        value=""
        error
      />,
    );

    fireEvent(result.getByTestId('rn-text-input'), 'changeText', '1234');

    expect(onChangeMock).toBeCalledWith('1234');
  });

  it('should remove text indicator after removing focus from input', () => {
    const onChangeMock = jest.fn();
    const result = render(
      <InputToken
        maxLength={6}
        onChange={onChangeMock}
        value="123"
        error={false}
      />,
    );

    const rnTextInput = result.getByTestId('rn-text-input');

    fireEvent(rnTextInput, 'focus');
    fireEvent(rnTextInput, 'changeText', '123');
    fireEvent(rnTextInput, 'blur');

    const textView = result.queryByText('|');

    expect(textView).toBeNull();
    expect(result.toJSON).toMatchSnapshot();
  });
});

describe('tests with InputToken Utils', () => {
  it('should call isCurrentEmptyInputFocused', () => {
    const resultFocused = isCurrentEmptyInputFocused(true, 6, 6);
    expect(resultFocused).toBeTruthy();

    const resultUnfocused = isCurrentEmptyInputFocused(false, 6, 6);
    expect(resultUnfocused).toBeFalsy();

    const resultFocusedMoreEntryNumbers = isCurrentEmptyInputFocused(false, 6, 1);
    expect(resultFocusedMoreEntryNumbers).toBeFalsy();
  });
});

describe('tests with InputToken Field', () => {
  it('should valid inputToken', async () => {
    const form = createForm({
      onSubmit: jest.fn(),
    });

    const component = render(
      <Form
        onSubmit={jest.fn()}
        form={form}
      >
        {() => (
          <InputToken.Field
            name="InputToken"
            maxLength={6}
            required
            validate={value => (value?.length === 6 ? undefined : 'Erro')}
          />
        )}
      </Form>,
    );

    expect(form.getState().valid).toBeFalsy();

    const inputSelect = component.getByTestId('rn-text-input');
    fireEvent(inputSelect, 'changeText', '123456');

    expect(form.getState().valid).toBeTruthy();
  });
});
