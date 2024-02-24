import React from 'react';

import {
  render,
} from '@testing-library/react-native';

import IconWithBackground from '.';
import { Icons } from '../../assets';
import { DefaultTheme } from '../../theme';

describe('IconWithBackground snapshot', () => {
  it('default', () => {
    const tree = render(
      <IconWithBackground
        Icon={Icons.Default.Airplane}
        iconColor={DefaultTheme.colors.primaryMain}
        iconSize={24}
        backgroundColor={DefaultTheme.colors.primary200}
        backgroundSize={36}
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
