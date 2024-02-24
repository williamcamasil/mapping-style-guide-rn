import React from 'react';
import { View } from 'react-native';

import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { createForm } from 'final-form';
import { useDidMount } from 'mapping-context-rn';

import Form from '.';
import Button from '../Button';
import InputText from '../InputText';
import {
  getFieldErrorState, hasValue, setFieldTouched, setFormFieldTouched,
} from './utils';
import wrapForm from './wrapForm';

describe('InputText.Field', () => {
  it('snapshot', () => {
    const result = render(
      <Form
        onSubmit={jest.fn()}
      >
        {() => (
          <InputText.Field
            name="inputName"
            label="Input label"
            help="Error message"
          />
        )}
      </Form>,
    );

    const tree = result.toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('invalid', () => {
    const form = createForm({
      onSubmit: jest.fn(),
      initialValues: {
        inputName: '',
      },
    });

    render(
      <Form
        onSubmit={jest.fn()}
        form={form}
      >
        {() => (
          <InputText.Field
            name="inputName"
            label="Input label"
            required
            validate={() => 'Erro'}
          />
        )}
      </Form>,
    );

    expect(form.getFieldState('inputName')?.invalid).toBeTruthy();
  });

  it('active', () => {
    const form = createForm({
      onSubmit: jest.fn(),
      initialValues: {
        inputName: '',
      },
    });

    const result = render(
      <Form
        onSubmit={jest.fn()}
        form={form}
      >
        {() => (
          <InputText.Field
            name="inputName"
            label="Input label"
            help="Error message"
            required
            validate={() => 'Erro'}
          />
        )}
      </Form>,
    );

    fireEvent(result.getByTestId('rn-text-input'), 'focus');

    expect(form.getFieldState('inputName')?.active).toBeTruthy();

    fireEvent(result.getByTestId('rn-text-input'), 'blur');

    expect(form.getFieldState('inputName')?.touched).toBeTruthy();
  });

  it('wrapped', async () => {
    const handleSubmitPress = jest.fn();

    const MyScreen = wrapForm(({ handleSubmit, form }) => {
      useDidMount(() => {
        form.initialize({
          inputName: 'foo-bar',
        });
      });

      return (
        <>
          <InputText.Field
            testID="form-input-text"
            name="inputName"
            label="Input label"
            required
            validate={() => undefined}
          />
          <Button
            testID="form-button"
            onPress={handleSubmit(values => handleSubmitPress(values))}
          >
            Enviar
          </Button>
        </>
      );
    });

    const result = render(
      <MyScreen />,
    );

    await result.findByDisplayValue('foo-bar');

    fireEvent.press(result.getByTestId('form-button'));

    await waitFor(() => {
      expect(handleSubmitPress).toBeCalledWith({ inputName: 'foo-bar' });
    });
  });

  it('wrapped optional invalid', () => {
    const form = createForm({
      onSubmit: jest.fn(),
    });

    const MyScreen = wrapForm(
      () => (
        <InputText.Field
          name="inputName"
          label="Input label"
          required={false}
          validate={value => (value !== 'foo-bar' ? 'error' : undefined)}
        />
      ),
      {
        form,
      },
    );

    const result = render(
      <MyScreen />,
    );

    expect(form.getState().valid).toBeTruthy();

    const textInput = result.getByTestId('rn-text-input');

    fireEvent(textInput, 'focus');
    fireEvent(textInput, 'changeText', 'abcd');
    fireEvent(textInput, 'blur');

    expect(form.getState().invalid).toBeTruthy();
  });

  it('Should set the inputName2 field as touched', async () => {
    const MyScreen = wrapForm(
      ({ form }) => {
        const handleSetTouched = () => {
          setFormFieldTouched(form, 'inputName2', true);
        };

        return (
          <View>
            <InputText.Field
              name="inputName"
              label="Input label"
              required
              validate={value => (value !== 'foo-bar' ? 'Input label is touched' : undefined)}
            />
            <InputText.Field
              name="inputName2"
              label="Input label 2"
              required
              validate={value => (value !== 'foo-bar' ? 'Input label 2 is touched' : undefined)}
            />
            <Button testID="set-touched-button" onPress={handleSetTouched}>Test</Button>
          </View>
        );
      },
    );

    const result = render(
      <MyScreen />,
    );

    expect(result.queryByText('Input label is touched')).toBeNull();
    expect(result.queryByText('Input label 2 is touched')).toBeNull();

    fireEvent.press(result.getByTestId('set-touched-button'));

    await result.findByText('Input label 2 is touched');
    expect(result.queryByText('Input label is touched')).toBeNull();
  });

  it('Should merge the wrapForm options, customMutator and setFieldTouched should exist', async () => {
    const MyScreen = wrapForm(
      ({ form }) => {
        const handleSetTouched = () => {
          form.mutators.customMutator();
          setFormFieldTouched(form, 'inputName2', true);
        };

        return (
          <View>
            <InputText.Field
              name="inputName"
              label="Input label"
              required
              validate={value => (value !== 'foo-bar' ? 'Input label is touched' : undefined)}
            />
            <InputText.Field
              name="inputName2"
              label="Input label 2"
              required
              validate={value => (value !== 'foo-bar' ? 'Input label 2 is touched' : undefined)}
            />
            <Button testID="set-touched-button" onPress={handleSetTouched}>Test</Button>
          </View>
        );
      },
      {
        mutators: {
          customMutator: () => {},
        },
      },
    );

    const result = render(
      <MyScreen />,
    );

    expect(result.queryByText('Input label 2 is touched')).toBeNull();

    fireEvent.press(result.getByTestId('set-touched-button'));

    await result.findByText('Input label 2 is touched');
  });

  it('wrapped submit', async () => {
    const handleFormSubmit = jest.fn();

    const MyScreen = wrapForm(({ handleSubmit }) => (
      <>
        <InputText.Field
          name="inputName"
          label="Input label"
        />
        <Button testID="button-submit" onPress={handleSubmit(handleFormSubmit)}>
          Enviar
        </Button>
      </>
    ));

    const result = render(
      <MyScreen />,
    );

    fireEvent.press(result.getByTestId('button-submit'));

    await waitFor(() => {
      expect(handleFormSubmit).toBeCalled();
    });
  });

});

describe('Utils', () => {
  it('hasValue', () => {
    expect(hasValue(undefined)).toBeFalsy();
    expect(hasValue(null)).toBeFalsy();
    expect(hasValue('')).toBeFalsy();
    expect(hasValue({})).toBeFalsy();
    expect(hasValue([])).toBeFalsy();

    expect(hasValue(0)).toBeTruthy();
    expect(hasValue(1)).toBeTruthy();
    expect(hasValue('a')).toBeTruthy();
    expect(hasValue({
      key: 'key',
      label: 'label',
    })).toBeTruthy();
    expect(hasValue(new Date())).toBeTruthy();
    expect(hasValue(new Date(0))).toBeTruthy();
    expect(hasValue(false)).toBeTruthy();
    expect(hasValue(true)).toBeTruthy();
  });

  it('getFieldErrorState showError', () => {
    expect(getFieldErrorState(true, false).showError).toBeFalsy();
    expect(getFieldErrorState(false, false).showError).toBeFalsy();
    expect(getFieldErrorState(false, true).showError).toBeFalsy();
    expect(getFieldErrorState(true, true).showError).toBeTruthy();
  });

  it('getFieldErrorState help message', () => {
    expect(getFieldErrorState(false, false, 'Validation error', 'Submission error', 'Help message')).toEqual({
      showError: false,
      message: 'Help message',
    });
  });

  it('getFieldErrorState validation error', () => {
    expect(getFieldErrorState(true, true, 'Validation error', undefined, 'Help message')).toEqual({
      showError: true,
      message: 'Validation error',
    });
  });

  it('getFieldErrorState submission error', () => {
    expect(getFieldErrorState(true, true, undefined, 'Submission error', 'Help message')).toEqual({
      showError: true,
      message: 'Submission error',
    });
  });

  it('getFieldErrorState validation and submission error', () => {
    expect(getFieldErrorState(true, true, 'Validation error', 'Submission error', 'Help message')).toEqual({
      showError: true,
      message: 'Validation error',
    });
  });

  it('should set field from states as touched', () => {
    const field1: any = {};
    const fields: any = { field1 };
    const state: any = { fields };
    setFieldTouched(['field1', true], state);
    expect(field1.touched).toBe(true);
  });

  it('should set field from states as not touched', () => {
    const field1: any = { touched: true };
    const fields: any = { field1 };
    const state: any = { fields };
    setFieldTouched(['field1', false], state);
    expect(field1.touched).toBe(false);
  });

  it('should not set field from states as touched, field is undefined', () => {
    const field1: any = {};
    const fields: any = { field1 };
    const state: any = { fields };
    setFieldTouched(['field2', true], state);
    expect(fields.field2?.touched).toBeUndefined();
  });
});
