import React from 'react';

import {
  render, waitFor, fireEvent,
} from '@testing-library/react-native';

import ResultModal from '.';
import { ThemeProvider } from '../../theme';
import Button from '../Button';
import Modal, { ModalPropsType } from '../Modal';
import ModalProvider, { useModal } from '../Modal/ModalProvider';
import Text from '../Text';

describe('ResultModal snapshot', () => {
  it('default', () => {
    const tree = render(
      <ResultModal
        isFocused
        visible
        text="text"
      />,
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('testing if have a message text', () => {
    const tree = render(
      <ResultModal
        isFocused
        visible
        text="Message text"
      />,
    );

    expect(tree.getByText('Message text')).toBeTruthy();
  });

  it('testing if modal closed', async () => {
    const handleDismiss = jest.fn();
    const result = render(
      <ResultModal
        isFocused
        visible
        onDismiss={handleDismiss}
        text="Message text"
        timeToCloseInMilliseconds={5}
      />,
    );

    expect(result.getByText('Message text')).toBeTruthy();

    await waitFor(() => {
      expect(handleDismiss).toBeCalled();
    });
  });

});

describe('ResultModal events', () => {
  it('should open another modal on dismiss', async () => {

    const OtherModal = (props: ModalPropsType) => (
      <Modal {...props}>
        <Text testID="other-modal-text">Hello</Text>
      </Modal>
    );

    const FakeScreen = () => {
      const show = useModal();

      const openAnotherModal = () => {
        show(OtherModal);
      };

      const openResultModal = () => {
        show(ResultModal, {
          text: 'Hello',
          onDismiss: openAnotherModal,
          timeToCloseInMilliseconds: 1,
        });
      };

      return (
        <Button
          testID="open-modal-button"
          onPress={openResultModal}
        >
          Open result modal
        </Button>
      );
    };

    const result = render(
      <ThemeProvider>
        <ModalProvider>
          <FakeScreen />
        </ModalProvider>
      </ThemeProvider>,
    );

    const openModalButton = result.getByTestId('open-modal-button');

    fireEvent.press(openModalButton);

    result.getByTestId('result-modal');

    await result.findByTestId('other-modal-text');
  });

});
