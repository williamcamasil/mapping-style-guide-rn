import React from 'react';

import { render } from '@testing-library/react-native';

import KeyboardAvoidingWrap from '.';
import Text from '../Text';

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const Platform = jest.requireActual(
    'react-native/Libraries/Utilities/Platform',
  );
  Platform.OS = 'android';
  return Platform;
});

describe('KeyboardAvoidingWrap Snapshot', () => {
  it('default android', () => {
    const tree = render(
      <KeyboardAvoidingWrap>
        <Text>Snapshot Android</Text>
      </KeyboardAvoidingWrap>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
