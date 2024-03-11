import React from 'react';

import { within, render, fireEvent } from '@testing-library/react-native';

import InputText from '.';
import { Icons } from '../../assets';
import { DefaultTheme } from '../../theme';

describe('InputText snapshot', () => {
  it('empty', () => {
    const tree = render(
      <InputText
        label="Input label"
        value=""
      />,
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('default', () => {
    const tree = render(
      <InputText
        label="Input label"
        value="Input value"
        help="Help message"
      />,
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('disabled', () => {
    const tree = render(
      <InputText
        label="Input label"
        value="Input value"
        help="Help message"
        disabled
      />,
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('readOnly', () => {
    const tree = render(
      <InputText
        label="Input label"
        value="Input value"
        help="Help message"
        readOnly
      />,
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('error', () => {
    const tree = render(
      <InputText
        label="Input label"
        value="Input value"
        error
        help="Error message"
      />,
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('focused', () => {
    const result = render(
      <InputText
        label="Input label"
        value="Input value"
        error
        help="Error message"
      />,
    );

    fireEvent(result.getByTestId('rn-text-input'), 'focus');

    const tree = result.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('secureTextEntry', () => {
    const result = render(<InputText label="Input label" value="Input value" secureTextEntry />);

    const tree = result.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('action', () => {
    const result = render(<InputText
      label="Input label"
      value="Input value"
      action={(
        <InputText.Action
          Icon={Icons.Small.Down}
          size={16}
          color={DefaultTheme.colors.neutralGray500}
          onPress={jest.fn()}
        />
      )}
    />);

    const tree = result.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('InputText events', () => {
  it('onFocus & onBlur', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    const result = render(
      <InputText
        label="Input label"
        value=""
        onFocus={handleFocus}
        onBlur={handleBlur}
      />,
    );

    const nativeInput = result.getByTestId('rn-text-input');

    fireEvent(nativeInput, 'focus');

    expect(handleFocus).toBeCalled();

    fireEvent(nativeInput, 'blur');

    expect(handleBlur).toBeCalled();
  });

  it('onChange', () => {
    const handleChange = jest.fn();

    const result = render(
      <InputText
        label="Input label"
        value=""
        onChange={handleChange}
      />,
    );

    fireEvent(result.getByTestId('rn-text-input'), 'changeText', 'type text');

    expect(handleChange).toBeCalledWith('type text');
  });

  it('onChange disabled', () => {
    const handleChange = jest.fn();

    const result = render(
      <InputText
        label="Input label"
        value=""
        onChange={handleChange}
        disabled
      />,
    );

    fireEvent(result.getByTestId('rn-text-input'), 'changeText', 'type text');

    expect(handleChange).not.toBeCalled();
  });

  it('Should verify if password is active', () => {
    const result = render(<InputText label="Input label" value="" secureTextEntry />);

    const element = result.getByTestId('rn-text-input');

    expect(element.props.secureTextEntry).toBe(true);
  });

  it('Should click in button buttonShowOrHidden and disable secureTextEntry and should visible showOrHiddenPassword with eyeOff', () => {
    const result = render(<InputText label="Input label" value="" secureTextEntry />);

    const rnTextInput = result.getByTestId('rn-text-input');

    const buttonShowOrHidden = result.getByTestId('show-or-hidden-password-touchable');

    expect(rnTextInput.props.secureTextEntry).toBe(true);

    fireEvent.press(buttonShowOrHidden);

    const icon = within(buttonShowOrHidden).UNSAFE_getByType(Icons.Default.EyeOff);
    expect(icon).toBeTruthy();

    expect(rnTextInput.props.secureTextEntry).toBe(false);
  });

  it('Should click in button buttonShowOrHidden and disable secureTextEntry and after click in button again should visible showOrHiddenPassword with eyeOn', () => {
    const result = render(<InputText label="Input label" value="" secureTextEntry />);

    const rnTextInput = result.getByTestId('rn-text-input');

    const buttonShowOrHidden = result.getByTestId('show-or-hidden-password-touchable');

    expect(rnTextInput.props.secureTextEntry).toBe(true);

    fireEvent.press(buttonShowOrHidden);

    expect(rnTextInput.props.secureTextEntry).toBe(false);
    const iconOff = within(buttonShowOrHidden).UNSAFE_getByType(Icons.Default.EyeOff);
    expect(iconOff).toBeTruthy();

    fireEvent.press(buttonShowOrHidden);

    expect(rnTextInput.props.secureTextEntry).toBe(true);
    const iconOn = within(buttonShowOrHidden).UNSAFE_getByType(Icons.Default.EyeOn);
    expect(iconOn).toBeTruthy();
  });
});
