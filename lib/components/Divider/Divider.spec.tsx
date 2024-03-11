import React from 'react';

import { render } from '@testing-library/react-native';

import Divider from '.';

describe('Divider', () => {
  it('renders correctly', () => {
    render(
      <Divider />,
    );
  });
});

describe('Divider snapshot', () => {
  it('default', () => {
    const tree = render(
      <Divider />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('marings', () => {
    const tree = render(
      <Divider
        marginTop={1}
        marginLeft={2}
        marginBottom={3}
        marginRight={4}
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
