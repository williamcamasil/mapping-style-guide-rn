import React, { useCallback, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import { useTextStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import { getFieldErrorState, wrapField } from '../Form';
import HelpMessage from '../HelpMessage';
import InputTextAction, { InputTextActionPropType } from './InputTextAction';
import InputTextLabel from './InputTextLabel';
import ShowHiddenPasswordButton from './ShowHiddenPasswordButton';
import {
  getErrorStyle,
  getTextStyle,
  getViewStyle,
  getActionStyle,
  INPUT_TEXT_HEIGHT,
} from './utils';

export type InputTextPropsType = Omit<TextInputProps, 'placeholder' | 'onChange' | 'onChangeText' | 'editable' | 'pointerEvents'> & {
  theme: AppThemeType;
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  value: string | null;
  onChange?: TextInputProps['onChangeText'];
  help?: string;
  error?: boolean;
  disabled?: boolean;
  /**
   * Desabilita o Input sem alterar o estilo.
   */
  readOnly?: boolean;
  action?: React.ReactElement<InputTextActionPropType, typeof InputTextAction>;
  inputPointerEvents?: TextInputProps['pointerEvents'];
  innerRef?: React.LegacyRef<RNTextInput>;
  textArea?: boolean;
};

const InputText = ({
  theme,
  style,
  label,
  value,
  containerStyle,
  onChange,
  onFocus,
  onBlur,
  help,
  error,
  disabled,
  readOnly,
  secureTextEntry,
  action,
  inputPointerEvents,
  innerRef,
  textArea,
  ...others
}: InputTextPropsType): React.ReactElement => {
  const [focused, setFocused] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const hasValue = Boolean(value);
  const hasAction = Boolean(action ?? secureTextEntry);

  const inputStyles = useTextStyles(
    () => [
      getTextStyle(theme, focused, hasValue, disabled),
      getViewStyle(theme, INPUT_TEXT_HEIGHT, focused, hasValue, textArea, disabled),
      getErrorStyle(theme, error),
      getActionStyle(hasAction),
      style,
    ],
    [theme, focused, hasValue, disabled, textArea, error, hasAction, style],
  );

  const handleFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(true);
      onFocus?.(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(false);
      onBlur?.(e);
    },
    [onBlur],
  );

  const handleShowOrHidden = useCallback((show: boolean) => {
    setShowPassword(show);
  }, []);

  const renderAction = () => {
    if (action) {
      return action;
    }

    return (
      <ShowHiddenPasswordButton
        visible={secureTextEntry}
        showPassword={showPassword}
        onShowPasswordChange={handleShowOrHidden}
        disabled={disabled}
      />
    );
  };

  return (
    <View style={containerStyle}>
      <RNTextInput
        testID="rn-text-input"
        autoCapitalize={secureTextEntry ? 'none' : undefined}
        autoComplete={secureTextEntry ? 'off' : undefined}
        autoCorrect={secureTextEntry ? false : undefined}
        spellCheck={secureTextEntry ? false : undefined}
        {...others}
        ref={innerRef}
        secureTextEntry={Boolean(secureTextEntry && !showPassword)}
        editable={Boolean(!disabled && !readOnly)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={onChange}
        value={value}
        placeholderTextColor={theme.colors.neutralGray500}
        placeholder={label}
        style={inputStyles}
        pointerEvents={inputPointerEvents}
      />
      <HelpMessage
        error={error}
        disabled={disabled}
        marginLeft={!textArea ? theme.spacings.sSmall : theme.spacings.sZero}
      >
        {help}
      </HelpMessage>

      <InputTextLabel hide={!hasValue} focused={focused} error={error} textArea={textArea}>
        {label}
      </InputTextLabel>

      {renderAction()}
    </View>
  );
};

InputText.defaultProps = {
  allowFontScaling: false,
};

InputText.Field = withTheme(wrapField<InputTextPropsType>((props, fieldProps) => {
  const {
    invalid, touched, error, submitError, value, onChange, onBlur, onFocus,
  } = fieldProps;

  const { showError, message } = getFieldErrorState(
    invalid,
    touched,
    error,
    submitError,
    props.help,
  );

  return (
    <InputText
      {...props}
      value={value || ''}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      error={showError}
      help={message}
    />
  );
}));

InputText.Action = InputTextAction;

export default withTheme(InputText);
