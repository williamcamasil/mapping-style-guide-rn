import 'react-native';
import React from 'react';

import { render } from '@testing-library/react-native';

import BottomSheet from '.';
import Button from '../Button';
import SampleHeaderSvg from '../Dialog/sample-header.svg';

describe('BottomSheet', () => {
  it('snapshot', () => {
    const tree = render(
      <BottomSheet
        isFocused
        visible
      >
        <BottomSheet.Header>
          <SampleHeaderSvg />
        </BottomSheet.Header>
        <BottomSheet.Title>
          Title
        </BottomSheet.Title>
        <BottomSheet.Message>
          Lorem ipsum is placeholder text commonly used in the graphic
        </BottomSheet.Message>
        <BottomSheet.Actions>
          <Button onPress={() => null}>
            Action 1
          </Button>
          <Button onPress={() => null}>
            Action 2
          </Button>
        </BottomSheet.Actions>
      </BottomSheet>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('snapshot invisible', () => {
    const tree = render(
      <BottomSheet
        isFocused={false}
        visible={false}
      >
        <BottomSheet.Title>
          Title
        </BottomSheet.Title>
        <BottomSheet.Message>
          Lorem ipsum is placeholder text commonly used in the graphic
        </BottomSheet.Message>
        <BottomSheet.Actions>
          <Button onPress={() => null}>
            Action 1
          </Button>
        </BottomSheet.Actions>
      </BottomSheet>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('snapshot dismissible false', () => {
    const tree = render(
      <BottomSheet
        isFocused
        visible
        dismissible={false}
      >
        <BottomSheet.Title>
          Title
        </BottomSheet.Title>
        <BottomSheet.Message>
          Lorem ipsum is placeholder text commonly used in the graphic
        </BottomSheet.Message>
        <BottomSheet.Actions>
          <Button onPress={() => null}>
            Action 1
          </Button>
        </BottomSheet.Actions>
      </BottomSheet>,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
