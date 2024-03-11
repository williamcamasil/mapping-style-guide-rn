import React, {
  useCallback, useMemo, useState,
} from 'react';
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import { useTextStyles, useViewStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import { getFieldErrorState, wrapField } from '../Form';
import Spacer from '../Spacer';
import TextToken from './TextToken';
import {
  INPUT_TOKEN_HEIGHT,
} from './utils';

export type InputTokenPropsType = Omit<TextInputProps, 'placeholder' | 'onChange' | 'onChangeText' | 'editable' | 'pointerEvents' | 'maxLength'> & {
  theme: AppThemeType;
  value: string | null;
  onChange?: TextInputProps['onChangeText'];
  keyboardType?: TextInputProps['keyboardType'];
  maxLength: number;
  innerRef?: React.LegacyRef<TextInput>;
  error?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

const styles = StyleSheet.create({
  containerInput: {
    left: 0,
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentInputs: {
    flexDirection: 'row',
  },
});

const InputToken = ({
  theme,
  value,
  onChange,
  testID,
  innerRef,
  onFocus,
  onBlur,
  error,
  contentContainerStyle,
  ...others
}: InputTokenPropsType): React.ReactElement => {
  const [focused, setFocused] = useState(false);

  const inputStyles = useTextStyles(() => [
    {
      height: INPUT_TOKEN_HEIGHT,
      opacity: theme.opacities.transparent,
    },
  ], [theme]);

  const contentContainerStyles = useViewStyles(() => [
    styles.containerInput,
    contentContainerStyle,
  ], [contentContainerStyle]);

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

  const listPositions = useMemo(() => [...Array(others.maxLength)].map((_, index) => ({ index })), [others.maxLength]);

  const renderTextsToken = useCallback(() => listPositions.map(item => {
    const lastIndex = listPositions.length - 1;
    const isLastItem = item.index === lastIndex;
    return (
      <View key={item.index} style={styles.contentInputs} pointerEvents="box-none">
        <TextToken
          theme={theme}
          index={item.index}
          value={value}
          focused={focused}
          error={error}
          maxLength={others.maxLength}
        />
        {
          isLastItem ? null : <Spacer size={theme.spacings.sNano} />
        }
      </View>
    );
  }), [listPositions, theme, value, focused, error, others]);

  const inputSelection = useMemo(() => ({
    /*
     * Força o cursor para ficar sempre no FINAL do input.
     */
    start: value.length,
    end: value.length,
  }), [value.length]);

  return (
    <View testID={testID}>
      <TextInput
        {...others}
        ref={innerRef}
        testID="rn-text-input"
        caretHidden
        secureTextEntry
        value={value}
        onChangeText={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={inputStyles}
        selection={inputSelection}
      />
      <View style={contentContainerStyles} pointerEvents="box-none">
        {renderTextsToken()}
      </View>
    </View>
  );
};

InputToken.defaultProps = {
  keyboardType: 'numeric' as TextInputProps['keyboardType'],
};

InputToken.Field = withTheme(wrapField<InputTokenPropsType>((props, fieldProps) => {
  const {
    invalid, touched, value, onChange, onBlur, onFocus,
  } = fieldProps;

  const { showError } = getFieldErrorState(
    invalid,
    touched,
  );

  return (
    <InputToken
      {...props}
      value={value || ''}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      error={showError}
    />
  );
}));

export default withTheme(InputToken);
