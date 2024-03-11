import React from 'react';
import {
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';

import { useViewStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { getFieldErrorState, wrapField } from '../Form';
import InputText, { InputTextPropsType } from '../InputText';

export type InputTextAreaPropsType = InputTextPropsType & {
  testID?: string;
  containerTextAreaStyle?: StyleProp<ViewStyle>;
  textAreaStyle?: StyleProp<ViewStyle>;
  numberOfLines?: number;
};

const InputTextArea = ({
  testID,
  containerTextAreaStyle,
  textAreaStyle,
  numberOfLines,
  ...others
}: InputTextAreaPropsType) => {

  const inputTextAreaStyle = useViewStyles(() => [
    {
      textAlignVertical: 'top',
      justifyContent: 'flex-start',
      height: 'auto',
    },
    textAreaStyle,
  ], [textAreaStyle]);

  return (
    <View style={containerTextAreaStyle}>
      <InputText
        {...others}
        multiline
        textArea
        testID={testID}
        numberOfLines={numberOfLines}
        style={inputTextAreaStyle}
      />
    </View>
  );
};

InputTextArea.defaultProps = {
  numberOfLines: 2,
};

InputTextArea.Field = withTheme(wrapField<InputTextAreaPropsType>((props, fieldProps) => {
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
    <InputTextArea
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

export default withTheme(InputTextArea);
