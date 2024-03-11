import React, { useCallback } from 'react';

import { withTheme } from '../../theme';
import BottomSheet from '../BottomSheet';
import Button from '../Button';
import Dialog, { DialogPropsType } from '../Dialog';

type AlertModalVariantType = 'dialog' | 'bottomSheet';

export type AlertModalOnButtonPressEventType = {
  dismiss: () => any;
};

export type AlertModalOnButtonPressType = (event: AlertModalOnButtonPressEventType) => any;

export type AlertModalPropsType = DialogPropsType & {
  title: React.ReactNode;
  description: React.ReactNode;
  primaryButtonName: string;
  header?: React.ReactNode;
  secondaryButtonName?: string;
  centered?: boolean;
  onPressPrimary?: AlertModalOnButtonPressType;
  onPressSecondary?: AlertModalOnButtonPressType;
  variant?: AlertModalVariantType;
  /**
   * Aplica efeito de loading no botão primário, desativa o botão secundário
   * e desativa o dismissible.
   */
  loading?: boolean;
  /**
   * Define se a Modal será fechada ou não automaticamente ao
   * pressionar os botões primário ou secundário.
   */
  autoDismiss?: boolean;
  extraText?: string;
};

const AlertModal: React.FC<AlertModalPropsType> = ({
  onDismiss,
  onPressPrimary,
  onPressSecondary,
  loading,
  header,
  title,
  description,
  primaryButtonName,
  secondaryButtonName,
  centered,
  variant,
  dismissible,
  autoDismiss,
  extraText,
  ...others
}) => {
  const dispatchOnPressEvent = useCallback(
    (callback?: AlertModalOnButtonPressType) => {
      callback?.({
        dismiss: () => onDismiss?.(),
      });

      if (autoDismiss) {
        onDismiss?.();
      }
    },
    [autoDismiss, onDismiss],
  );

  const handlePrimaryPress = useCallback(() => {
    dispatchOnPressEvent(onPressPrimary);
  }, [dispatchOnPressEvent, onPressPrimary]);

  const handleSecondaryPress = useCallback(() => {
    dispatchOnPressEvent(onPressSecondary);
  }, [dispatchOnPressEvent, onPressSecondary]);

  const AlertComponent = variant === 'bottomSheet' ? BottomSheet : Dialog;

  return (
    <AlertComponent
      {...others}
      onDismiss={onDismiss}
      dismissible={Boolean(!loading && dismissible)}
    >
      {header ? (
        <AlertComponent.Header>
          {header}
        </AlertComponent.Header>
      ) : null}

      <AlertComponent.Title centered={centered}>
        {title}
      </AlertComponent.Title>
      <AlertComponent.Message centered={centered}>
        {description}
      </AlertComponent.Message>
      {extraText ? (
        <AlertComponent.ExtraText centered>
          {extraText}
        </AlertComponent.ExtraText>
      ) : null}

      <AlertComponent.Actions>
        <Button
          testID="alert-modal-primary-button"
          onPress={handlePrimaryPress}
          loading={loading}
        >
          {primaryButtonName}
        </Button>

        {secondaryButtonName ? (
          <Button
            testID="alert-modal-secondary-button"
            onPress={handleSecondaryPress}
            disabled={loading}
          >
            {secondaryButtonName}
          </Button>
        ) : null}
      </AlertComponent.Actions>
    </AlertComponent>
  );
};

AlertModal.defaultProps = {
  centered: true,
  variant: 'dialog',
  dismissible: true,
  autoDismiss: true,
};

export default withTheme(AlertModal);
