import React from 'react';

import { render } from '@testing-library/react-native';

import HelpMessage from '.';

describe('HelpMessage snapshot', () => {
  it('default', () => {
    const tree = render(
      <HelpMessage
        error={false}
        disabled={false}
      >
        Mensagem de ajuda
      </HelpMessage>,
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('empty', () => {
    const tree = render(
      <HelpMessage
        error={false}
        disabled={false}
      >
        {null}
      </HelpMessage>,
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('error', () => {
    const tree = render(
      <HelpMessage
        error
        disabled={false}
      >
        Mensagem de ajuda
      </HelpMessage>,
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('disabled', () => {
    const tree = render(
      <HelpMessage
        error={false}
        disabled
      >
        Mensagem de ajuda
      </HelpMessage>,
    )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
