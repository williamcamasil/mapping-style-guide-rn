import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';
import { createForm } from 'final-form';

import InputTextArea from '.';
import Form from '../Form';

describe('inputTextArea snapshot', () => {
  it('should match default snapshot', () => {
    const tree = render(
      <InputTextArea
        label="Text area label"
        value=""
      />,
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should match error snapshot', () => {
    const tree = render(
      <InputTextArea
        label="Text area label"
        value=""
        error
        help="Error message"
      />,
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('tests with inputTextArea Field', () => {
  it('should valid inputTextArea', async () => {
    const form = createForm({
      onSubmit: jest.fn(),
    });

    const component = render(
      <Form
        onSubmit={jest.fn()}
        form={form}
      >
        {() => (
          <InputTextArea.Field
            testID="text-area-input"
            name="InputTextArea"
            label="Text area"
            required
            validate={value => (value?.length === 6 ? undefined : 'Erro')}
          />
        )}
      </Form>,
    );

    expect(form.getState().valid).toBeFalsy();

    const inputTextArea = component.getByTestId('text-area-input');
    fireEvent(inputTextArea, 'changeText', '123456');

    expect(form.getState().valid).toBeTruthy();
  });
});
