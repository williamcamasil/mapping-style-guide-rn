import React from 'react';

import { render } from '@testing-library/react-native';

import Dialog from '.';
import Button from '../Button';
import Text from '../Text';
import SampleHeaderSvg from './sample-header.svg';

describe('Dialog snapshot', () => {
  it('default', () => {
    const tree = render(
      <Dialog
        isFocused
        visible
      >
        <Dialog.Header>
          <SampleHeaderSvg />
        </Dialog.Header>
        <Dialog.Title>
          Title
        </Dialog.Title>
        <Dialog.Message>
          Lorem ipsum is placeholder text commonly used in the graphic
        </Dialog.Message>
        <Dialog.ExtraText>
          Extra text
        </Dialog.ExtraText>
        <Dialog.Actions>
          <Button onPress={() => null}>
            Action 1
          </Button>
          <Button onPress={() => null}>
            Action 2
          </Button>
        </Dialog.Actions>
      </Dialog>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('not dismissible', () => {
    const tree = render(
      <Dialog
        isFocused
        visible
        dismissible={false}
      >
        <Dialog.Title>
          Title
        </Dialog.Title>
        <Dialog.Message>
          Lorem ipsum is placeholder text commonly used in the graphic
        </Dialog.Message>
      </Dialog>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('centered', () => {
    const tree = render(
      <Dialog
        isFocused
        visible
      >
        <Dialog.Title centered>
          Title
        </Dialog.Title>
        <Dialog.Message centered>
          Lorem ipsum is placeholder text commonly used in the graphic
        </Dialog.Message>
      </Dialog>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('invisible', () => {
    const tree = render(
      <Dialog
        isFocused={false}
        visible={false}
      >
        <Dialog.Title>
          Title
        </Dialog.Title>
        <Dialog.Message>
          Lorem ipsum is placeholder text commonly used in the graphic
        </Dialog.Message>
      </Dialog>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('empty', () => {
    const tree = render(
      <Dialog
        isFocused
        visible
      >
        <Dialog.Header />
        <Dialog.Message />
        <Dialog.Title />
        <Dialog.ExtraText />
        <Dialog.Actions />
      </Dialog>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('invalid actions', () => {
    (global as any).__DEV__ = true;

    expect(() => {
      render(
        <Dialog
          isFocused
          visible
        >
          <Dialog.Actions>
            <Text>
              Teste
            </Text>
          </Dialog.Actions>
        </Dialog>,
      );
    }).toThrowError();

    (global as any).__DEV__ = false;

    const result = render(
      <Dialog
        isFocused
        visible
      >
        <Dialog.Actions>
          <Text>
            Teste
          </Text>
          Teste
        </Dialog.Actions>
      </Dialog>,
    );

    expect(result).toBeDefined();
  });
});
