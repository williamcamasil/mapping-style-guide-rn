import React, { useCallback } from 'react';

import { Icons } from '../../assets';
import InputTextAction from './InputTextAction';

type ShowHiddenPasswordButtonPropsType = {
  visible?: boolean;
  showPassword: boolean;
  disabled?: boolean;
  onShowPasswordChange: (value: boolean) => void;
};

const ShowHiddenPasswordButton: React.FC<ShowHiddenPasswordButtonPropsType> = ({
  visible,
  showPassword,
  disabled,
  onShowPasswordChange,
}) => {
  const handlePress = useCallback(() => {
    onShowPasswordChange(!showPassword);
  }, [onShowPasswordChange, showPassword]);

  if (!visible) return null;

  return (
    <InputTextAction
      testID="show-or-hidden-password-touchable"
      Icon={showPassword ? Icons.Default.EyeOff : Icons.Default.EyeOn}
      size={24}
      onPress={handlePress}
      disabled={Boolean(disabled)}
    />
  );
};

export default ShowHiddenPasswordButton;
