import React from 'react';

import { render } from '@testing-library/react-native';

import HintList from '.';
import Text from '../Text';

describe('HintList', () => {
  it('Should match default HintList snapshot', () => {
    const result = render(
      <HintList
        bulletPointColor="neutralGray400"
        hintList={[
          'hint 1',
          'hint 2',
        ]}
      />,
    ).toJSON();

    expect(result).toMatchSnapshot();
  });

  it('Should match custom HintList snapshot', () => {
    const result = render(
      <HintList
        bulletPointColor="neutralGray400"
        hintList={[
          'hint 1',
          'hint 2',
        ]}
        isBold={false}
        spacing="sXXS"
      />,
    ).toJSON();

    expect(result).toMatchSnapshot();
  });

  it('Should match custom HintList snapshot with prop bulletPointAlignCenter', () => {
    const result = render(
      <HintList
        bulletPointColor="neutralGray400"
        hintList={[
          'hint 1',
          'hint 2',
          (<Text weight="bold">Hint 3</Text>),
        ]}
        isBold={false}
        spacing="sXXS"
        bulletPointAlignCenter={false}
      />,
    ).toJSON();

    expect(result).toMatchSnapshot();
  });

});
