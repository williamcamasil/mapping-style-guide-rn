import React from 'react';

import { render } from '@testing-library/react-native';

import AlertErrorModal from '.';

describe('AlertErrorModal snapshot', () => {
  it('Should render with extraText error', () => {
    const tree = render(
      <AlertErrorModal
        isFocused
        visible
        loading
        title="Title"
        description="Lorem ipsum is placeholder text commonly used in the graphic"
        errorCode="j23g4j23h4g"
        primaryButtonName="Primary Action"
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should render without extraText error', () => {
    const tree = render(
      <AlertErrorModal
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
});

