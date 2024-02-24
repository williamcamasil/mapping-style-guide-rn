import React from 'react';
import { View } from 'react-native';

import renderer from 'react-test-renderer';

import Container from '.';

describe('Container snapshot', () => {
  it('fill parent', () => {
    const tree = renderer
      .create(
        <Container fillParent>
          <View />
        </Container>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('dont fill parent', () => {
    const tree = renderer
      .create(
        <Container fillParent={false}>
          <View />
        </Container>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('centered', () => {
    const tree = renderer
      .create(
        <Container centered>
          <View />
        </Container>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('horizontal', () => {
    const tree = renderer
      .create(
        <Container horizontal>
          <View />
        </Container>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('horizontal centered', () => {
    const tree = renderer
      .create(
        <Container horizontal centered>
          <View />
        </Container>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('blockActions', () => {
    const tree = renderer
      .create(
        <Container blockActions>
          <View />
        </Container>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('justifyContent and alignItems', () => {
    const tree = renderer
      .create(
        <Container justifyContent="center" alignItems="flex-end">
          <View />
        </Container>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
