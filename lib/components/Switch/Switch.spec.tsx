import React from 'react';
import { StyleSheet } from 'react-native';

import {
  fireEvent, render,
} from '@testing-library/react-native';
import { createForm } from 'final-form';
import { Form } from 'react-final-form';

import Switch from '.';
import DefaultTheme from '../../theme/default';

describe('Switch snapshot', () => {
  it('switch true', () => {
    const tree = render(
      <Switch checked onChecked={jest.fn} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('switch false', () => {
    const tree = render(
      <Switch checked={false} onChecked={jest.fn} />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('form', () => {
    const result = render(
      <Form
        onSubmit={jest.fn()}
      >
        {() => (
          <Switch.Field
            name="switchField"
          />
        )}
      </Form>,
    );

    const tree = result.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('Switch', () => {
  it('renders correctly', () => {
    render(
      <Switch checked={false} onChecked={jest.fn} />,
    );
  });

  it('should verify if switch is select false', () => {
    const result = render(
      <Switch testID="switch-id" checked={false} onChecked={jest.fn} />,
    );

    const switchComponent = result.getByTestId('switch-id');
    const switchStyle = StyleSheet.flatten(switchComponent.props.style);

    const ellipseComponent = result.getByTestId('switch-ellipse-view');
    const ellipseStyle = StyleSheet.flatten(ellipseComponent.props.style);

    const valueTransform = [{ translateX: 0 }];

    expect(switchStyle).toHaveProperty('backgroundColor', 'rgba(225, 226, 228, 1)');
    expect(ellipseStyle).toHaveProperty('backgroundColor', DefaultTheme.colors.neutralWhite);
    expect(ellipseStyle).toHaveProperty('transform', valueTransform);

  });

  it('should verify if switch is select true', () => {
    const result = render(
      <Switch testID="switch-id" checked onChecked={jest.fn} />,
    );

    const switchComponent = result.getByTestId('switch-id');
    const switchStyle = StyleSheet.flatten(switchComponent.props.style);

    const ellipseComponent = result.getByTestId('switch-ellipse-view');
    const ellipseStyle = StyleSheet.flatten(ellipseComponent.props.style);

    const valueTransform = [{ translateX: 20 }];

    expect(switchStyle).toHaveProperty('backgroundColor', 'rgba(1, 49, 136, 1)');
    expect(ellipseStyle).toHaveProperty('backgroundColor', DefaultTheme.colors.neutralWhite);
    expect(ellipseStyle).toHaveProperty('transform', valueTransform);
  });

  it('should verify if switch is disabled', () => {
    const handlePress = jest.fn();

    const result = render(
      <Switch testID="switch-id" checked disabled onChecked={handlePress} />,
    );

    const switchComponent = result.getByTestId('switch-id');
    const switchStyle = StyleSheet.flatten(switchComponent.props.style);

    const ellipseComponent = result.getByTestId('switch-ellipse-view');
    const ellipseStyle = StyleSheet.flatten(ellipseComponent.props.style);

    fireEvent.press(switchComponent);

    expect(handlePress).not.toBeCalled();

    expect(switchStyle).toHaveProperty('backgroundColor', DefaultTheme.colors.neutralGray200);
    expect(ellipseStyle).toHaveProperty('backgroundColor', DefaultTheme.colors.neutralGray300);
  });

  it('should verify click in switch and call event handlePress', () => {
    const handlePress = jest.fn();

    const result = render(
      <Switch testID="switch-id" checked onChecked={handlePress} />,
    );

    const switchComponent = result.getByTestId('switch-id');

    fireEvent.press(switchComponent);

    expect(handlePress).toBeCalled();
  });
});

describe('Switch.Field', () => {
  it('form valid', () => {
    const form = createForm({
      onSubmit: jest.fn(),
    });

    const result = render(
      <Form
        onSubmit={jest.fn()}
        form={form}
      >
        {() => (
          <Switch.Field
            name="switchname"
            required
            validate={checked => (checked ? undefined : 'Erro')}
            testID="switch-field"
          />
        )}
      </Form>,
    );

    const checkbox = result.getByTestId('switch-field');

    fireEvent.press(checkbox);

    expect(form.getState().valid).toBeTruthy();
  });
});
