import React, { useCallback } from 'react';
import { View } from 'react-native';

import { render } from '@testing-library/react-native';

import Modal, { ModalPropsType } from '.';
import { ThemeProvider } from '../../theme';
import Text from '../Text';
import ModalProvider, { ModalReturnType, useDismissAllModals, useModal } from './ModalProvider';

export const renderModal = async (modalProps: Partial<ModalPropsType>, throttleTimeout?: number) => {
  const ModalEmpty = (props: ModalPropsType) => (
    <Modal {...props}>
      <Text testID="modal-children-text">
        Sample text
      </Text>
    </Modal>
  );

  let showModal: (customProps?: Partial<ModalPropsType>) => ModalReturnType = () => ({
    dismiss: jest.fn(),
  });

  let dismissAllModals: () => void = jest.fn();

  const MyScreen = () => {
    const show = useModal();

    dismissAllModals = useDismissAllModals();

    showModal = useCallback((customProps?: Partial<ModalPropsType>) => show(ModalEmpty, {
      animationDuration: 0,
      ...modalProps,
      ...customProps,
    }), [show]);

    return <View testID="modal-screen" />;
  };

  const result = render(
    <ThemeProvider>
      <ModalProvider throttleTimeout={throttleTimeout}>
        <MyScreen />
      </ModalProvider>
    </ThemeProvider>,
  );

  await result.findByTestId('modal-screen');

  return { showModal, result, dismissAllModals };
};
