import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';
import { createForm } from 'final-form';

import InputPassword from '.';
import { DefaultTheme } from '../../theme';
import Form from '../Form';
import { getCircleStatusStyle, getTextPasswordColor, isCurrentEmptyTextFocused } from './utils';

describe('InputPassword', () => {
  it('InputPassword snapshot', () => {
    const result = render(
      <InputPassword
        maxLength={6}
        value=""
      />,
    ).toJSON();

    expect(result).toMatchSnapshot();
  });

  it('should render InputPassword with the property stretch', () => {
    const result = render(
      <InputPassword
        maxLength={6}
        value=""
        stretch
      />,
    ).toJSON();

    expect(result).toMatchSnapshot();
  });

  it('should onFocus on inputPassword', () => {
    const result = render(
      <InputPassword
        maxLength={6}
        value=""
      />,
    );

    const input = result.getByTestId('rn-text-input');
    fireEvent(input, 'focus');

    expect(result.toJSON).toMatchSnapshot();
  });

  it('should onChange on inputPassword', () => {
    const onChangeMock = jest.fn();
    const result = render(
      <InputPassword
        maxLength={6}
        onChange={onChangeMock}
        value=""
      />,
    );

    fireEvent(result.getByTestId('rn-text-input'), 'changeText', '123');

    expect(onChangeMock).toBeCalledWith('123');
  });

  it('should onClick on inputPassword circle', () => {
    const result = render(
      <InputPassword
        maxLength={6}
        value=""
      />,
    );

    const circleTouchable = result.getByTestId('circle-touchable-1');
    fireEvent.press(circleTouchable);

    expect(result.toJSON).toMatchSnapshot();
  });

  it('should on click to show password', () => {
    const result = render(
      <InputPassword
        maxLength={6}
        value=""
      />,
    );

    const iconShowPassword = result.getByTestId('btn-icon-show-password');

    fireEvent.press(iconShowPassword);

    expect(result.getByTestId('btn-icon-hide-password')).toBeDefined();
    expect(result.toJSON).toMatchSnapshot();
  });

  it('should change text with visible password', () => {
    const onChangeMock = jest.fn();
    const result = render(
      <InputPassword
        maxLength={6}
        onChange={onChangeMock}
        value=""
      />,
    );

    const iconShowPassword = result.getByTestId('btn-icon-show-password');
    fireEvent.press(iconShowPassword);

    fireEvent(result.getByTestId('rn-text-input'), 'changeText', '123');

    expect(onChangeMock).toBeCalledWith('123');
    expect(result.toJSON).toMatchSnapshot();
  });

  it('should change text focused with visible password', async () => {
    const onChangeMock = jest.fn();
    const result = render(
      <InputPassword
        maxLength={6}
        onChange={onChangeMock}
        value="123"
      />,
    );

    const iconShowPassword = result.getByTestId('btn-icon-show-password');
    fireEvent.press(iconShowPassword);

    const rnTextInput = result.getByTestId('rn-text-input');

    fireEvent(rnTextInput, 'focus');
    fireEvent(rnTextInput, 'changeText', '123');

    const textView = await result.findByText('|');

    expect(textView).toBeDefined();
    expect(result.toJSON).toMatchSnapshot();
  });

  it('should change text focused with visible password and blur', () => {
    const onChangeMock = jest.fn();
    const result = render(
      <InputPassword
        maxLength={6}
        onChange={onChangeMock}
        value="123"
      />,
    );

    const iconShowPassword = result.getByTestId('btn-icon-show-password');
    fireEvent.press(iconShowPassword);

    const rnTextInput = result.getByTestId('rn-text-input');

    fireEvent(rnTextInput, 'focus');
    fireEvent(rnTextInput, 'changeText', '123');
    fireEvent(rnTextInput, 'blur');

    const textView = result.queryByText('|');

    expect(textView).toBeNull();
    expect(result.toJSON).toMatchSnapshot();
  });
});

describe('InputPassword Utils', () => {
  it('should getCircleStatusStyle', () => {
    const result = getCircleStatusStyle(DefaultTheme, 1, 6, false);

    expect(result?.backgroundColor).toEqual(DefaultTheme.colors.primaryMain);
    expect(result?.borderWidth).toEqual(DefaultTheme.borders.width.thick);
    expect(result?.borderColor).toEqual(DefaultTheme.colors.neutralGray200);
  });

  it('should getCircleStatusStyle focused', () => {
    const result = getCircleStatusStyle(DefaultTheme, 5, 4, true);

    expect(result).toBeDefined();

    expect(result?.backgroundColor).toBeUndefined();
    expect(result?.borderColor).toBeUndefined();
  });

  it('should call isCurrentEmptyTextFocused', () => {
    const resultFocused = isCurrentEmptyTextFocused(true, 6, 6);
    expect(resultFocused).toBeTruthy();

    const resultUnfocused = isCurrentEmptyTextFocused(false, 6, 6);
    expect(resultUnfocused).toBeFalsy();

    const resultFocusedMoreEntryNumbers = isCurrentEmptyTextFocused(false, 6, 1);
    expect(resultFocusedMoreEntryNumbers).toBeFalsy();
  });

  it('should getTextPasswordColor', () => {
    const resultValueDefined = getTextPasswordColor(1, 1, false, '1');
    expect(resultValueDefined).toEqual('neutralGray600');

    const resultIsCurrentEmptyTextFocused = getTextPasswordColor(1, 1, true);
    expect(resultIsCurrentEmptyTextFocused).toEqual('neutralGray800');

    const elseResult = getTextPasswordColor(1, 1, false);
    expect(elseResult).toEqual('neutralGray400');
  });
});

describe('InputPassword.Field', () => {
  it('valid', async () => {
    const form = createForm({
      onSubmit: jest.fn(),
    });

    const component = render(
      <Form
        onSubmit={jest.fn()}
        form={form}
      >
        {() => (
          <InputPassword.Field
            name="inputPassword"
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
