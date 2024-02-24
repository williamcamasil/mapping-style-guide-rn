import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';

import InformationContent from '.';
import { Images } from '../../assets';
import Text from '../Text';

describe('InformationContent', () => {
  it('Should render InformationContent without Description', async () => {
    const result = render(<InformationContent
      header={<Images.DialogClose />}
      title="Title"
      primaryButtonName="Primary Button"
      secondaryButtonName="Secondary Button"
      onPressPrimary={jest.fn}
      onPressSecondary={jest.fn}
    />);

    expect(result.queryByTestId('information-content-description')).toBe(null);
  });

  it('Should render InformationContent whitout secondary button', async () => {
    const result = render(<InformationContent
      header={<Images.DialogClose />}
      title="Title"
      description="Description"
      primaryButtonName="Secondary Button"
      onPressPrimary={jest.fn}
    />);

    expect(result.queryByTestId('information-content-secondary-button')).toBe(null);

  });

  it('Should rcall function on button', async () => {
    const primaryButtonClick = jest.fn();
    const result = render(<InformationContent
      header={<Images.DialogClose />}
      title="Title"
      description="Description"
      primaryButtonName="Secondary Button"
      onPressPrimary={primaryButtonClick}
    />);

    fireEvent.press(result.getByTestId('information-content-primary-button'));

    expect(primaryButtonClick).toBeCalled();

  });

  it('Should render InformationContent with link action', async () => {
    const result = render(<InformationContent
      header={<Images.DialogClose />}
      title="Title"
      description="Description"
      linkActionName="Link action"
      onPressLinkAction={jest.fn}
    />);

    expect(result.queryByTestId('information-content-secondary-button')).toBe(null);

  });
});

describe('InformationContent snapshot', () => {
  it('default', () => {
    const infoStep = render(
      <InformationContent
        header={<Images.DialogClose />}
        title="Title"
        description="Description"
        primaryButtonName="Primary Button"
        secondaryButtonName="Secondary Button"
        onPressPrimary={jest.fn}
        onPressSecondary={jest.fn}
        linkActionName="Link action"
        onPressLinkAction={jest.fn}
      />,
    ).toJSON();

    expect(infoStep).toMatchSnapshot();
  });

  it('only primary button', () => {
    const infoStep = render(
      <InformationContent
        title="Title"
        primaryButtonName="Primary Button"
        onPressPrimary={jest.fn}
      />,
    ).toJSON();

    expect(infoStep).toMatchSnapshot();
  });

  it('only link action', () => {
    const infoStep = render(
      <InformationContent
        title="Title"
        linkActionName="Link action"
        onPressLinkAction={jest.fn}
      />,
    ).toJSON();

    expect(infoStep).toMatchSnapshot();
  });

  it('with Children', () => {
    const infoStep = render(
      <InformationContent
        title="Title"
        onPressLinkAction={jest.fn}
      >
        <Text variant="body">Mock children</Text>
      </InformationContent>,
    ).toJSON();

    expect(infoStep).toMatchSnapshot();
  });
});
