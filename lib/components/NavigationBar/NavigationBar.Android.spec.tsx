import React from 'react';

import renderer from 'react-test-renderer';

import NavigationBar from '.';

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const Platform = jest.requireActual(
    'react-native/Libraries/Utilities/Platform',
  );
  Platform.OS = 'android';
  return Platform;
});

describe('NavigationBar android snapshots', () => {
  it('should match snapshot default', () => {
    const tree = renderer
      .create(<NavigationBar
        title="Teste de título"
        statusBarTranslucent={false}
        statusBarBackgroundColor="#ff0000"
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should match snapshot with custom status bar', () => {
    const tree = renderer
      .create(<NavigationBar
        title="Teste de título"
        statusBarTranslucent={false}
        statusBarBackgroundColor="#ff0000"
      />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
