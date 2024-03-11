import React from 'react';
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { useViewStyles } from '../../hooks';
import Modal, { ModalPropsType } from '../Modal';

export type DialogBasePropsType = ModalPropsType & {
  modalStyle?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: '#000000b3',
  },
  outsideTouch: {
    flex: 1,
  },
});

const DialogBase = ({
  children,
  modalStyle,
  dismissible,
  onDismiss,
  overlayStyle,
  ...others
}: DialogBasePropsType): React.ReactElement => {

  const modalStyles = useViewStyles(() => [
    styles.modal,
    modalStyle,
  ], [modalStyle]);

  const overlayStyles = useViewStyles(() => [
    styles.overlay,
    overlayStyle,
  ], [overlayStyle]);

  return (
    <Modal
      {...others}
      onDismiss={onDismiss}
      dismissible={dismissible}
      style={modalStyles}
      overlayStyle={overlayStyles}
      withSafeAreaIOS={false}
      skipStatusBarAndroid
    >
      <TouchableWithoutFeedback
        onPress={onDismiss}
        disabled={!dismissible}
        accessibilityLabel="Fechar janela"
        accessibilityRole="button"
      >
        <View style={styles.outsideTouch} />
      </TouchableWithoutFeedback>

      {children}
    </Modal>
  );
};

export default DialogBase;
