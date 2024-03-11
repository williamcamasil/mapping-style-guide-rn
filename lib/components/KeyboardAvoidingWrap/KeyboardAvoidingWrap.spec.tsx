import React from 'react';

import { render } from '@testing-library/react-native';

import KeyboardAvoidingWrap from '.';
import Text from '../Text';

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const Platform = jest.requireActual(
    'react-native/Libraries/Utilities/Platform',
  );
  Platform.OS = 'ios';
  return Platform;
});

describe('KeyboardAvoidingWrap Snapshot', () => {
  it('default ios', () => {
    const tree = render(
      <KeyboardAvoidingWrap>
        <Text>Snapshot IOS</Text>
      </KeyboardAvoidingWrap>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
