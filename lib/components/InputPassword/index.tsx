import React, {
  useCallback, useMemo, useState,
} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
} from 'react-native';

import { Icons } from '../../assets';
import { useTextStyles, useViewStyles } from '../../hooks';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import { wrapField } from '../Form';
import Spacer from '../Spacer';
import CirclePassword from './CirclePassword';
import TextPassword from './TextPassword';
import {
  INPUT_PASSWORD_HEIGHT, getContentCirclesStyles,
} from './utils';

export type InputPasswordPropsType = Omit<TextInputProps, 'placeholder' | 'onChange' | 'onChangeText' | 'editable' | 'pointerEvents' | 'maxLength'> & {
  theme: AppThemeType;
  value: string | null;
  onChange?: TextInputProps['onChangeText'];
  keyboardType?: TextInputProps['keyboardType'];
  maxLength: number;
  innerRef?: React.LegacyRef<TextInput>;
  stretch?: boolean;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  containerCircles: {
    left: 0,
    right: 0,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentCircle: {
    flexDirection: 'row',
  },
});

const InputPassword = ({
  theme,
  value,
  onChange,
  testID,
  innerRef,
  onFocus,
  onBlur,
  stretch,
  maxLength,
  ...others
}: InputPasswordPropsType): React.ReactElement => {
  const [focused, setFocused] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);

  const inputStyles = useTextStyles(() => [
    {
      borderColor: theme.colors.neutralWhite,
      borderRadius: theme.borders.radius.medium,
      height: INPUT_PASSWORD_HEIGHT,
      borderWidth: theme.borders.width.thin,
      opacity: theme.opacities.transparent,
    },
  ], [theme]);

  const iconStyles = useViewStyles(() => [
    {
      marginLeft: theme.spacings.sMedium,
    },
  ], [theme.spacings.sMedium]);

  const contentCirclesStyles = useViewStyles(() => [
    {
      flexDirection: 'row',
    },
    getContentCirclesStyles(stretch, maxLength, theme),
  ], [maxLength, stretch, theme]);

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

  const listPositions = useMemo(() => [...Array(maxLength)].map((_, index) => ({ index })), [maxLength]);

  const renderCirclesPassword = useCallback(() => listPositions.map(item => {
    const lastIndex = listPositions.length - 1;
    const isLastItem = item.index === lastIndex;
    return (
      <View key={item.index} style={styles.contentCircle} pointerEvents="box-none">
        <CirclePassword
          key={item.index}
          theme={theme}
          index={item.index}
          value={value.length}
          focused={focused}
        />
        {
          isLastItem ? null : <Spacer size={theme.spacings.sXS} />
        }
      </View>
    );
  }), [focused, listPositions, theme, value.length]);

  const renderTextsPassword = useCallback(() => listPositions.map(item => {
    const lastIndex = listPositions.length - 1;
    const isLastItem = item.index === lastIndex;
    return (
      <View key={item.index} style={styles.contentCircle} pointerEvents="box-none">
        <TextPassword
          key={item.index}
          theme={theme}
          index={item.index}
          value={value}
          focused={focused}
        />
        {
          isLastItem ? null : <Spacer size={theme.spacings.sSmall} />
        }
      </View>

    );
  }), [focused, listPositions, theme, value]);

  const inputSelection = useMemo(() => ({
    /*
     * Força o cursor para ficar sempre no FINAL do input.
     */
    start: value.length,
    end: value.length,
  }), [value.length]);

  const changeVisiblePassword = useCallback(() => {
    setVisiblePassword(prevState => !prevState);
  }, []);

  const renderVisiblePasswordIcon = (): JSX.Element => {
    const Icon = visiblePassword ? Icons.Default.EyeOff : Icons.Default.EyeOn;
    const testId = visiblePassword ? 'btn-icon-hide-password' : 'btn-icon-show-password';
    return (
      <Icon
        testID={testId}
        style={iconStyles}
        onPress={changeVisiblePassword}
        color={theme.colors.neutralGray400}
      />
    );
  };

  return (
    <View testID={testID} style={styles.container}>
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
      <View style={styles.containerCircles} pointerEvents="box-none">
        <View style={contentCirclesStyles} pointerEvents="box-none">
          {visiblePassword ? renderTextsPassword() : renderCirclesPassword()}
        </View>
        {renderVisiblePasswordIcon()}
      </View>
    </View>
  );
};

InputPassword.defaultProps = {
  keyboardType: 'numeric' as TextInputProps['keyboardType'],
};

InputPassword.Field = withTheme(wrapField<InputPasswordPropsType>((props, fieldProps) => {
  const {
    value, onChange, onBlur, onFocus,
  } = fieldProps;

  return (
    <InputPassword
      {...props}
      value={value || ''}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
}));

export default withTheme(InputPassword);
