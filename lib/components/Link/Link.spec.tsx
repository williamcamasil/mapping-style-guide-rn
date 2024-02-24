import React from 'react';

import {
  fireEvent, render, within,
} from '@testing-library/react-native';

import Link from '.';
import { Icons } from '../../assets';
import { DefaultTheme } from '../../theme';
import Spacer from '../Spacer';
import Text from '../Text';

describe('link snapshot', () => {
  it('default', () => {
    const tree = render(
      <Link testID="touchable-link" onPress={() => null} variant="highlightedPrimary" size="small">
        Click me
      </Link>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('disabled', () => {
    const tree = render(
      <Link testID="touchable-link" disabled onPress={() => null} variant="highlightedPrimary" size="small">
        Click me
      </Link>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('should match snapshot of the text variant', () => {
    const tree = render(
      <Link testID="touchable-link" onPress={() => null} variant="text">
        Click me
      </Link>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('should match snapshot of the disabled text variant', () => {
    const tree = render(
      <Link testID="touchable-link" onPress={() => null} variant="text" disabled>
        Click me
      </Link>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('should match snapshot of the text variant with changed color', () => {
    const tree = render(
      <Link testID="touchable-link" onPress={() => null} variant="text" textColor="secondaryMain">
        Click me
      </Link>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
  it('should match snapshot of the text variant with changed size', () => {
    const tree = render(
      <Link testID="touchable-link" onPress={() => null} variant="text" style={{ fontSize: 14 }}>
        Click me
      </Link>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('link', () => {
  it('renders correctly', () => {
    render(
      <Link testID="touchable-link" onPress={() => null} variant="highlightedPrimary" size="small">
        Click me
      </Link>,
    );
  });

  it('testing link action', () => {
    const mockFunction = jest.fn();
    const tree = render(
      <Link
        testID="touchable-link"
        onPress={mockFunction}
        variant="highlightedPrimary"
        size="small"
      >
        Click me
      </Link>,
    );

    const primaryLinkInstance = tree.getByTestId('touchable-link');

    fireEvent.press(primaryLinkInstance);

    expect(mockFunction).toHaveBeenCalled();
  });

  it('testing link action disabled', () => {
    const mockFunction = jest.fn();
    const tree = render(
      <Link
        testID="touchable-link"
        disabled
        onPress={(mockFunction)}
        variant="highlightedPrimary"
        size="small"
      >
        Click me
      </Link>,
    );

    const primaryLinkInstance = tree.getByTestId('touchable-link');

    fireEvent.press(primaryLinkInstance);

    expect(mockFunction).not.toHaveBeenCalled();
  });

  it('testing link disabled', () => {
    const tree = render(
      <Link
        testID="touchable-link"
        disabled
        onPress={() => {}}
        variant="highlightedPrimary"
        size="small"
      >
        Click me
      </Link>,
    );
    const primaryLinkInstance = tree.getByTestId('touchable-link').props;
    expect(primaryLinkInstance.accessibilityState).toHaveProperty('disabled', true);
  });

  it('testing variant highlightedPrimary', () => {
    const mockFunction = jest.fn();

    const tree = render(
      <Link
        testID="touchable-link"
        onPress={mockFunction}
        variant="highlightedPrimary"
        size="large"
      >
        Click me
      </Link>,
    );

    const textComponent = within(tree.getByTestId('touchable-link')).UNSAFE_getByType(Text);

    expect(textComponent.props).toHaveProperty('color', 'primary700');
    expect(textComponent.props).toHaveProperty('variant', 'small');
  });

  it('testing variant highlightedSecondary', () => {
    const mockFunction = jest.fn();

    const tree = render(
      <Link
        testID="touchable-link"
        onPress={mockFunction}
        variant="highlightedSecondary"
        size="small"
      >
        Click me
      </Link>,
    );

    const textComponent = within(tree.getByTestId('touchable-link')).UNSAFE_getByType(Text);

    expect(textComponent.props).toHaveProperty('color', 'neutralGray500');
    expect(textComponent.props).toHaveProperty('variant', 'small');
  });

  it('testing variant primary', () => {
    const mockFunction = jest.fn();

    const tree = render(
      <Link
        testID="touchable-link"
        onPress={mockFunction}
        variant="primary"
        size="large"
      >
        Click me
      </Link>,
    );

    const textComponent = within(tree.getByTestId('touchable-link')).UNSAFE_getByType(Text);

    expect(textComponent.props).toHaveProperty('color', 'primary700');
    expect(textComponent.props).toHaveProperty('variant', 'body');
  });

  it('testing variant secondary', () => {
    const mockFunction = jest.fn();

    const tree = render(
      <Link
        testID="touchable-link"
        onPress={mockFunction}
        variant="secondary"
        size="large"
      >
        Click me
      </Link>,
    );

    const textComponent = within(tree.getByTestId('touchable-link')).UNSAFE_getByType(Text);

    expect(textComponent.props).toHaveProperty('color', 'neutralGray600');
    expect(textComponent.props).toHaveProperty('variant', 'body');
  });

  it('testing variant primary e test small', () => {
    const mockFunction = jest.fn();

    const tree = render(
      <Link
        testID="touchable-link"
        onPress={mockFunction}
        variant="primary"
        size="small"
      >
        Click me
      </Link>,
    );

    const textComponent = within(tree.getByTestId('touchable-link')).UNSAFE_getByType(Text);

    expect(textComponent.props).toHaveProperty('color', 'primaryMain');
    expect(textComponent.props).toHaveProperty('variant', 'small');
  });

  it('testing variant smallSecondary', () => {
    const mockFunction = jest.fn();

    const tree = render(
      <Link
        testID="touchable-link"
        onPress={mockFunction}
        variant="secondary"
        size="small"
      >
        Click me
      </Link>,
    );

    const textComponent = within(tree.getByTestId('touchable-link')).UNSAFE_getByType(Text);

    expect(textComponent.props).toHaveProperty('color', 'neutralGray500');
    expect(textComponent.props).toHaveProperty('variant', 'small');
  });

  it('testing with icon component', () => {
    const mockFunction = jest.fn();

    const tree = render(
      <Link
        testID="touchable-link"
        onPress={mockFunction}
        variant="highlightedPrimary"
        size="small"
        Icon={Icons.Thin.Key}
      >
        Click me
      </Link>,
    );

    const primaryLinkInstance = within(tree.getByTestId('touchable-link'));

    const iconComponent = primaryLinkInstance.UNSAFE_getByType(Icons.Thin.Key);
    const textComponent = primaryLinkInstance.UNSAFE_getByType(Text);
    const spaceComponent = primaryLinkInstance.UNSAFE_getByType(Spacer);

    expect(iconComponent).toBeDefined();
    expect(textComponent).toBeDefined();
    expect(spaceComponent).toBeDefined();
  });

  it('testing with icon component and variant primary', () => {
    const mockFunction = jest.fn();

    const tree = render(
      <Link
        testID="touchable-link"
        onPress={mockFunction}
        variant="primary"
        size="large"
        Icon={Icons.Thin.Key}
      >
        Click me
      </Link>,
    );

    const primaryLinkInstance = within(tree.getByTestId('touchable-link'));

    const iconComponent = primaryLinkInstance.UNSAFE_getByType(Icons.Thin.Key);
    const textComponent = primaryLinkInstance.UNSAFE_getByType(Text);
    const spaceComponent = primaryLinkInstance.UNSAFE_getByType(Spacer);

    expect(iconComponent).toBeDefined();
    expect(textComponent).toBeDefined();
    expect(spaceComponent).toBeDefined();
    expect(iconComponent.props).toHaveProperty('width', DefaultTheme.spacings.sMedium);
    expect(iconComponent.props).toHaveProperty('height', DefaultTheme.spacings.sMedium);
    expect(spaceComponent.props).toHaveProperty('size', DefaultTheme.spacings.sNano);
  });

  it('testing with icon component and variant secondary', () => {
    const mockFunction = jest.fn();

    const tree = render(
      <Link
        testID="touchable-link"
        onPress={mockFunction}
        variant="secondary"
        size="large"
        Icon={Icons.Thin.Key}
      >
        Click me
      </Link>,
    );

    const primaryLinkInstance = within(tree.getByTestId('touchable-link'));

    const iconComponent = primaryLinkInstance.UNSAFE_getByType(Icons.Thin.Key);
    const textComponent = primaryLinkInstance.UNSAFE_getByType(Text);
    const spaceComponent = primaryLinkInstance.UNSAFE_getByType(Spacer);

    expect(iconComponent).toBeDefined();
    expect(textComponent).toBeDefined();
    expect(spaceComponent).toBeDefined();
    expect(iconComponent.props).toHaveProperty('width', DefaultTheme.spacings.sMedium);
    expect(iconComponent.props).toHaveProperty('height', DefaultTheme.spacings.sMedium);
    expect(spaceComponent.props).toHaveProperty('size', DefaultTheme.spacings.sNano);
  });

  it('testing with icon component and variant primary e size small', () => {
    const mockFunction = jest.fn();

    const tree = render(
      <Link
        testID="touchable-link"
        onPress={mockFunction}
        variant="primary"
        size="small"
        Icon={Icons.Thin.Key}
      >
        Click me
      </Link>,
    );

    const primaryLinkInstance = within(tree.getByTestId('touchable-link'));

    const iconComponent = primaryLinkInstance.UNSAFE_getByType(Icons.Thin.Key);
    const textComponent = primaryLinkInstance.UNSAFE_getByType(Text);
    const spaceComponent = primaryLinkInstance.UNSAFE_getByType(Spacer);

    expect(iconComponent).toBeDefined();
    expect(textComponent).toBeDefined();
    expect(spaceComponent).toBeDefined();
    expect(iconComponent.props).toHaveProperty('width', DefaultTheme.spacings.sXS);
    expect(iconComponent.props).toHaveProperty('height', DefaultTheme.spacings.sXS);
    expect(spaceComponent.props).toHaveProperty('size', DefaultTheme.spacings.sQuark);
  });

  it('testing with icon component and variant smallSecondary', () => {
    const mockFunction = jest.fn();

    const tree = render(
      <Link
        testID="touchable-link"
        onPress={mockFunction}
        variant="secondary"
        size="small"
        Icon={Icons.Thin.Key}
      >
        Click me
      </Link>,
    );

    const primaryLinkInstance = within(tree.getByTestId('touchable-link'));

    const iconComponent = primaryLinkInstance.UNSAFE_getByType(Icons.Thin.Key);
    const textComponent = primaryLinkInstance.UNSAFE_getByType(Text);
    const spaceComponent = primaryLinkInstance.UNSAFE_getByType(Spacer);

    expect(iconComponent).toBeDefined();
    expect(textComponent).toBeDefined();
    expect(spaceComponent).toBeDefined();
    expect(iconComponent.props).toHaveProperty('width', DefaultTheme.spacings.sXS);
    expect(iconComponent.props).toHaveProperty('height', DefaultTheme.spacings.sXS);
    expect(spaceComponent.props).toHaveProperty('size', DefaultTheme.spacings.sQuark);
  });

  it('testing Link with custom textColor', () => {
    const mockFunction = jest.fn();
    const result = render(
      <Link
        testID="touchable-link"
        onPress={mockFunction}
        textColor="feedbackSuccess500"
        size="small"
        Icon={Icons.Thin.Key}
      >
        Click me
      </Link>,
    );

    expect(result.getByTestId('touchable-link').props?.style.borderColor).toEqual(DefaultTheme.colors.feedbackSuccess500);
    expect(result.getByTestId('link-text').props?.style.color).toEqual(DefaultTheme.colors.feedbackSuccess500);
    expect(result.toJSON()).toMatchSnapshot();
  });
});
