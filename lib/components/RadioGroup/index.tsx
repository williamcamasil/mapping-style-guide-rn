import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { $DeepPartial, $Without } from '@callstack/react-theme-provider';

import { useViewStyles } from '../../hooks/useStyles/index';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import {
  getFieldErrorState, wrapField, WrapFieldProps, WrappedFieldRenderProps,
} from '../Form';
import InputRadio from './InputRadio';
import {
  getInputWidth, getInputMargin, RadioGroupVariantType, getContainerMargin,
} from './utils';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export type RadioGroupItemType<Item> = {
  key: string | number;
  label: string;
  disabled?: boolean;
  item: Item;
};

export type RadioGroupPropsType<Item> = {
  options: RadioGroupItemType<Item>[];
  theme: AppThemeType;
  onChange?: (item: RadioGroupItemType<Item>) => void;
  value?: RadioGroupItemType<Item>;
  style?: ViewStyle;
  variant?: RadioGroupVariantType;
  disabled?: boolean;
  error?: boolean;
  stacked?: boolean;
};

function RadioGroup<Item = any>({
  onChange,
  value,
  options,
  theme,
  style,
  variant,
  disabled,
  error,
  stacked,
}: RadioGroupPropsType<Item>): React.ReactElement {
  const containerStyles = useViewStyles(() => [
    styles.container,
    getContainerMargin(theme, stacked),
    style,
  ], [theme, stacked, style]);

  const inputStyle = useMemo(() => (
    {
      ...getInputMargin(theme, stacked),
      flexGrow: 1,
      width: getInputWidth(stacked),
    }
  ), [theme, stacked]);

  const onSelectItem = useCallback((item: RadioGroupItemType<Item>) => {
    onChange?.(item);
  }, [onChange]);

  const renderItem = useCallback((item: RadioGroupItemType<Item>, index: number) => (
    <InputRadio
      testID={`radio-item-${index}`}
      key={item.key}
      style={inputStyle}
      item={item}
      label={item.label}
      onChange={onSelectItem}
      selected={value?.key === item.key}
      disabled={disabled || item.disabled}
      error={error}
      variant={variant}
    />
  ), [inputStyle, onSelectItem, value, disabled, error, variant]);

  return (
    <View
      testID="radio-group"
      style={containerStyles}
    >
      {options.map(renderItem)}
    </View>
  );
}

RadioGroup.Field = withTheme(wrapField<RadioGroupPropsType<any>, any>((props, fieldProps) => {
  const {
    invalid, touched, error, submitError, value, onChange,
  } = fieldProps;

  const { showError } = getFieldErrorState(
    invalid,
    touched,
    error,
    submitError,
  );

  return (
    <RadioGroup<any>
      {...props}
      value={value}
      onChange={onChange}
      error={showError}
    />
  );
})) as <FieldItem = any>(
  props: FieldWrapperPropsType<FieldItem>,
) => React.ReactElement;

type WrapperPropsType<Item> = $Without<RadioGroupPropsType<Item>, 'theme'> & { theme?: $DeepPartial<AppThemeType> };

type FieldWrapperPropsType<Item> = WrappedFieldRenderProps<Item | undefined>
& Omit<WrapperPropsType<Item>, keyof WrapFieldProps<Item>>;

/*
 * Devido ao componente trabalhar com "generics" e necessitar de funções de
 * alta ordem (wrapModal, withTheme, wrapField, etc),
 * é necessário forçar a tipagem de saída devido a uma limitação do TypeScript.
 * https://stackoverflow.com/q/58469229/2826279
 */
export default withTheme(RadioGroup) as (<Item = any>(
  props: WrapperPropsType<Item>
) => React.ReactElement)
& {
  Field: <FieldItem = any>(
    props: FieldWrapperPropsType<FieldItem>,
  ) => React.ReactElement;
};

