import React from 'react';

import { withTheme } from '../../theme';
import AlertModal, { AlertModalPropsType } from '../AlertModal';

export type AlertErrorModalPropsType = AlertModalPropsType & {
  errorCode?: string;
};

const AlertErrorModal: React.FC<AlertErrorModalPropsType> = ({
  errorCode,
  ...others
}) => (
  <AlertModal
    {...others}
    extraText={errorCode ? `Código: ${errorCode}` : undefined}
  />
);

export default withTheme(AlertErrorModal);
