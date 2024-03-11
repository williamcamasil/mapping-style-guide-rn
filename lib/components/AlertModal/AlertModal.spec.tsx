import React from 'react';

import { render, fireEvent, act } from '@testing-library/react-native';

import AlertModal from '.';
import Text from '../Text';

describe('AlertModal snapshot', () => {
  it('default', () => {
    const tree = render(
      <AlertModal
        isFocused
        visible
        header={(
          <Text>Header</Text>
        )}
        title="Title"
        description="Lorem ipsum is placeholder text commonly used in the graphic"
        primaryButtonName="Primary Action"
        onPressPrimary={jest.fn()}
        secondaryButtonName="Secondary Action"
        onPressSecondary={jest.fn()}
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('centered', () => {
    const tree = render(
      <AlertModal
        isFocused
        visible
        centered
        header={(
          <Text>Header</Text>
        )}
        title="Title"
        description="Lorem ipsum is placeholder text commonly used in the graphic"
        primaryButtonName="Primary Action"
        onPressPrimary={jest.fn()}
        secondaryButtonName="Secondary Action"
        onPressSecondary={jest.fn()}
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('bottomSheet', () => {
    const tree = render(
      <AlertModal
        isFocused
        visible
        header={(
          <Text>Header</Text>
        )}
        title="Title"
        description="Lorem ipsum is placeholder text commonly used in the graphic"
        primaryButtonName="Primary Action"
        secondaryButtonName="Secondary Action"
        variant="bottomSheet"
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('basic', () => {
    const tree = render(
      <AlertModal
        isFocused
        visible
        title="Title"
        description="Lorem ipsum is placeholder text commonly used in the graphic"
        primaryButtonName="Primary Action"
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('with loading', () => {
    const tree = render(
      <AlertModal
        isFocused
        visible
        loading
        title="Title"
        description="Lorem ipsum is placeholder text commonly used in the graphic"
        primaryButtonName="Primary Action"
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render with extraText text', () => {
    const tree = render(
      <AlertModal
        isFocused
        visible
        loading
        title="Title"
        description="Lorem ipsum is placeholder text commonly used in the graphic"
        extraText="Código: j23g4j23h4g"
        primaryButtonName="Primary Action"
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('AlertModal events', () => {
  it('testing primary button action', () => {
    const mockFunction = jest.fn();
    const tree = render(
      <AlertModal
        isFocused
        visible
        title="Title"
        description="Lorem ipsum is placeholder text commonly used in the graphic"
        primaryButtonName="Primary Action"
        onPressPrimary={mockFunction}
      />,
    );

    const buttonInstance = tree.getByTestId('alert-modal-primary-button');
    fireEvent.press(buttonInstance);

    expect(mockFunction).toHaveBeenCalled();
  });

  it('testing secondary button action', () => {
    const mockFunction = jest.fn();
    const tree = render(
      <AlertModal
        isFocused
        visible
        title="Title"
        description="Lorem ipsum is placeholder text commonly used in the graphic"
        primaryButtonName="Primary Action"
        secondaryButtonName="Secondary Action"
        onPressSecondary={mockFunction}
      />,
    );

    const buttonInstance = tree.getByTestId('alert-modal-secondary-button');
    fireEvent.press(buttonInstance);

    expect(mockFunction).toHaveBeenCalled();
  });

  it('should auto close dialog without callback', () => {
    const mockFunction = jest.fn();
    const tree = render(
      <AlertModal
        isFocused
        visible
        title="Title"
        description="Lorem ipsum is placeholder text commonly used in the graphic"
        primaryButtonName="Primary Action"
        secondaryButtonName="Secondary Action"
        onDismiss={mockFunction}
      />,
    );

    const buttonInstance = tree.getByTestId('alert-modal-secondary-button');
    fireEvent.press(buttonInstance);

    expect(mockFunction).toHaveBeenCalled();
  });

  it('should not auto close modal with autoDismiss=false', async () => {
    const mockOnDismiss = jest.fn();

    let dismissCallback: undefined | (() => void);

    const tree = render(
      <AlertModal
        isFocused
        visible
        title="Title"
        description="Lorem ipsum is placeholder text commonly used in the graphic"
        primaryButtonName="Primary Action"
        secondaryButtonName="Secondary Action"
        autoDismiss={false}
        onPressSecondary={event => {
          dismissCallback = event.dismiss;
        }}
        onDismiss={mockOnDismiss}
      />,
    );

    const buttonInstance = tree.getByTestId('alert-modal-secondary-button');
    fireEvent.press(buttonInstance);

    expect(dismissCallback).toBeDefined();

    expect(mockOnDismiss).not.toBeCalled();

    // falso negativo de eslint https://github.com/testing-library/eslint-plugin-testing-library/discussions/685
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => {
      dismissCallback?.();
    });

    expect(mockOnDismiss).toHaveBeenCalled();
  });
});

