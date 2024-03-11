import React, { useState } from 'react';
import {
  Text,
} from 'react-native';

import { render, act } from '@testing-library/react-native';
// @ts-ignore
import BackHandlerMock from 'react-native/Libraries/Utilities/__mocks__/BackHandler';

import Modal from '.';
import { renderModal } from './test-utils';

jest.mock('react-native/Libraries/Utilities/Platform', () => {
  const Platform = jest.requireActual(
    'react-native/Libraries/Utilities/Platform',
  );
  Platform.OS = 'android';
  return Platform;
});

describe('Modal snapshots', () => {
  it('should render with skipStatusBarAndroid', () => {
    const tree = render(
      <Modal
        isFocused
        modalKey="abc"
        visible
        skipStatusBarAndroid
      >
        <Text>Hello</Text>
      </Modal>,
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render without skipStatusBarAndroid', () => {
    const tree = render(
      <Modal
        isFocused
        modalKey="abc"
        visible
        skipStatusBarAndroid={false}
      >
        <Text>Hello</Text>
      </Modal>,
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});

describe('Modal events', () => {
  it('should render with dismissible true', async () => {
    const handleDismiss = jest.fn();
    const handleDismissEnd = jest.fn();

    const ModalComponent = () => {
      const [visible, setVisible] = useState(true);
      return (
        <Modal
          isFocused
          modalKey="abc"
          visible={visible}
          onDismiss={() => {
            handleDismiss();
            setVisible(false);
          }}
          onDismissEnd={handleDismissEnd}
          animationDuration={0}
        />
      );
    };

    render(
      <ModalComponent />,
    );

    act(() => {
      BackHandlerMock.mockPressBack();
    });

    expect(handleDismiss).toBeCalled();

    expect(handleDismissEnd).toBeCalled();
  });

  it('should render with dismissible false', () => {
    const handleDismiss = jest.fn();
    const handleDismissEnd = jest.fn();

    render(
      <Modal
        isFocused
        modalKey="abc"
        visible
        onDismiss={handleDismiss}
        onDismissEnd={handleDismissEnd}
        dismissible={false}
        animationDuration={0}
      />,
    );

    act(() => {
      BackHandlerMock.mockPressBack();
    });

    expect(handleDismiss).not.toBeCalled();

    expect(handleDismissEnd).not.toBeCalled();
  });

  it('should dismiss with onBackPress when opened with useModal', async () => {
    const handleDismiss = jest.fn();

    const { showModal, result } = await renderModal({
      onDismiss: handleDismiss,
    });

    act(() => {
      showModal();
    });

    result.getByTestId('modal-children-text');

    act(() => {
      BackHandlerMock.mockPressBack();
    });

    expect(handleDismiss).toBeCalled();
  });
});
