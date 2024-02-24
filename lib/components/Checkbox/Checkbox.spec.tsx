import React from 'react';

import { fireEvent, render } from '@testing-library/react-native';
import { createForm } from 'final-form';

import Checkbox from '.';
import Form from '../Form';

describe('checkbox snapshot', () => {
  it('Should render checkbox', () => {
    const tree = render(
      <Checkbox onChecked={() => null}>
        Clique aqui
      </Checkbox>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render checkbox with secondary background', () => {
    const tree = render(
      <Checkbox onChecked={() => null} variant="secondary">
        Clique aqui
      </Checkbox>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render checkbox disabled', () => {
    const tree = render(
      <Checkbox disabled onChecked={() => null}>
        Clique aqui
      </Checkbox>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render checkbox disabled with secondary background', () => {
    const tree = render(
      <Checkbox disabled onChecked={() => null} variant="secondary">
        Clique aqui
      </Checkbox>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render checkbox with error', () => {
    const tree = render(
      <Checkbox error onChecked={() => null}>
        Clique aqui
      </Checkbox>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render checkbox with error and secondary background', () => {
    const tree = render(
      <Checkbox error onChecked={() => null} variant="secondary">
        Clique aqui
      </Checkbox>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render checkbox checked', () => {
    const tree = render(
      <Checkbox checked onChecked={() => null}>
        Clique aqui
      </Checkbox>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render checkbox checked with secondary background', () => {
    const tree = render(
      <Checkbox checked onChecked={() => null} variant="secondary">
        Clique aqui
      </Checkbox>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render checkbox checked and with error', () => {
    const tree = render(
      <Checkbox checked error onChecked={() => null}>
        Clique aqui
      </Checkbox>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render checkbox using form', () => {
    const result = render(
      <Form
        onSubmit={jest.fn()}
      >
        {() => (
          <Checkbox.Field
            name="checkboxName"
          >
            Clique aqui
          </Checkbox.Field>
        )}
      </Form>,
    );

    const tree = result.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('Checkbox events', () => {
  it('Should test checkbox action', () => {
    const mockFunction = jest.fn();
    const tree = render(
      <Checkbox
        onChecked={mockFunction}
        testID="touchable-checkbox"
      >
        Clique aqui
      </Checkbox>,
    );

    const primaryLinkInstance = tree.getByTestId('touchable-checkbox');

    fireEvent.press(primaryLinkInstance);

    expect(mockFunction).toHaveBeenCalled();
  });

  it('Should test checkbox action checked', () => {
    const mockFunction = jest.fn();
    const tree = render(
      <Checkbox
        onChecked={mockFunction}
        checked
        testID="touchable-checkbox"
      >
        Clique aqui
      </Checkbox>,
    );

    const primaryLinkInstance = tree.getByTestId('touchable-checkbox');

    fireEvent.press(primaryLinkInstance);

    expect(mockFunction).toHaveBeenCalled();
  });

  it('Should test checkbox action disable', () => {
    const mockFunction = jest.fn();
    const tree = render(
      <Checkbox
        onChecked={mockFunction}
        disabled
        testID="touchable-checkbox"
      >
        Clique aqui
      </Checkbox>,
    );

    const primaryLinkInstance = tree.getByTestId('touchable-checkbox');

    fireEvent.press(primaryLinkInstance);

    expect(mockFunction).not.toHaveBeenCalled();
  });

  it('Should test checkbox returning checked value', () => {
    const mockFunction = jest.fn();
    const tree = render(
      <Checkbox
        onChecked={mockFunction}
        checked={false}
        testID="touchable-checkbox"
      >
        Clique aqui
      </Checkbox>,
    );

    const primaryLinkInstance = tree.getByTestId('touchable-checkbox');

    fireEvent.press(primaryLinkInstance);

    expect(mockFunction).toHaveBeenCalledWith(true);
  });

  it('Should test checkbox returning unchecked value', () => {
    const mockFunction = jest.fn();
    const tree = render(
      <Checkbox
        onChecked={mockFunction}
        checked
        testID="touchable-checkbox"
      >
        Clique aqui
      </Checkbox>,
    );

    const primaryLinkInstance = tree.getByTestId('touchable-checkbox');

    fireEvent.press(primaryLinkInstance);

    expect(mockFunction).toHaveBeenCalledWith(false);
  });
});

describe('Checkbox.Field', () => {
  it('Should test form invalid', () => {
    const form = createForm({
      onSubmit: jest.fn(),
    });

    render(
      <Form
        onSubmit={jest.fn()}
        form={form}
      >
        {() => (
          <Checkbox.Field
            name="checkboxName"
            required
            validate={checked => (checked ? undefined : 'Erro')}
            testID="checkbox-field"
          >
            Clique aqui
          </Checkbox.Field>
        )}
      </Form>,
    );

    expect(form.getState().invalid).toBeTruthy();
  });

  it('Should test form valid', () => {
    const form = createForm({
      onSubmit: jest.fn(),
    });

    const result = render(
      <Form
        onSubmit={jest.fn()}
        form={form}
      >
        {() => (
          <Checkbox.Field
            name="checkboxName"
            required
            validate={checked => (checked ? undefined : 'Erro')}
            testID="checkbox-field"
          >
            Clique aqui
          </Checkbox.Field>
        )}
      </Form>,
    );

    const checkbox = result.getByTestId('checkbox-field');

    fireEvent.press(checkbox);

    expect(form.getState().valid).toBeTruthy();
  });
});
