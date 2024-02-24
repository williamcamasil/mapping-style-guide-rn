import React from 'react';

import renderer from 'react-test-renderer';

import Spacer from '.';

describe('Spacer snapshot', () => {
  it('default', () => {
    const tree = renderer
      .create(
        <Spacer size={28} />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
