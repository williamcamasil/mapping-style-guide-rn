import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

import { $DeepPartial, $Without } from '@callstack/react-theme-provider';

import { Icons } from '../../assets';
import { withTheme } from '../../theme';
import { AppThemeType } from '../../theme/default';
import {
  getFieldErrorState, wrapField, WrapFieldProps, WrappedFieldRenderProps,
} from '../Form';
import InputText from '../InputText';
import { useModal } from '../Modal/ModalProvider';
import InputSelectBottomSheet, { InputSelectBottomSheetPropsType } from './InputSelectBottomSheet';
import InputSelectModal, { InputSelectModalPropsType } from './InputSelectModal';
import { InputSelectRequestType, InputSelectResponseType, InputSelectValueType } from './utils';

type InputSelectPropsType<Item, Params> = {
  theme: AppThemeType;
  label: string;
  searchLabel?: string;
  mapRecord: (data: Item) => InputSelectValueType<Item>;
  requestRecords: (props: InputSelectRequestType<Params>) => InputSelectResponseType<Item>;
  onChange?: (value: InputSelectValueType<Item> | null) => void;
  error?: boolean;
  disabled?: boolean;
  value?: InputSelectValueType<Item> | null;
  renderItem?: (item: InputSelectValueType<Item>, index: number) => React.ReactElement;
  allowClear?: boolean;
  allowRefresh?: boolean;
  showSearch?: boolean;
  parameters?: Params;
  onBlur?: () => void;
  onFocus?: () => void;
  help?: string;
  navigationBarTitle?: string;
  useBottomSheet?: boolean;
  bottomSheetTitle?: string;
};

function InputSelect<Item = any, Params = any>({
  value,
  label,
  theme,
  disabled,
  error,
  onChange,
  searchLabel,
  mapRecord,
  requestRecords,
  renderItem,
  allowClear,
  parameters,
  onBlur,
  onFocus,
  help,
  allowRefresh,
  showSearch,
  navigationBarTitle,
  useBottomSheet,
  bottomSheetTitle,
}: InputSelectPropsType<Item, Params>): React.ReactElement {
  const showModal = useModal();

  const handleOnPress = useCallback(() => {
    onFocus?.();

    if (useBottomSheet) {
      showModal<InputSelectBottomSheetPropsType<Item, Params>>(InputSelectBottomSheet, {
        requestRecords,
        title: bottomSheetTitle,
        mapRecord,
        onChange,
        renderItem,
        onDismiss: onBlur,
      });
      return;
    }

    showModal<InputSelectModalPropsType<Item, Params>>(InputSelectModal, {
      mapRecord,
      searchLabel,
      requestRecords,
      onChange,
      parameters,
      renderItem,
      value,
      onDismiss: onBlur,
      showSearch,
      navigationBarTitle,
      allowRefresh,
    });
  }, [
    allowRefresh,
    navigationBarTitle,
    showModal,
    showSearch,
    mapRecord,
    onChange,
    onFocus,
    parameters,
    renderItem,
    requestRecords,
    searchLabel,
    value,
    onBlur,
    useBottomSheet,
    bottomSheetTitle,
  ]);

  const handleClear = useCallback(() => {
    onChange?.(null);
  }, [onChange]);

  const renderIcon = () => {
    const showAllowClear = Boolean(value && allowClear);

    if (showAllowClear) {
      return (
        <InputText.Action
          testID="input-text-action-clear"
          Icon={Icons.Small.Close}
          size={16}
          onPress={handleClear}
          disabled={disabled}
        />
      );
    }

    return (
      <InputText.Action
        testID="input-text-select-icon-down"
        Icon={Icons.Small.Down}
        size={16}
        onPress={handleOnPress}
        disabled={disabled}
      />
    );
  };

  return (
    <TouchableOpacity
      testID="input-select-button"
      onPress={handleOnPress}
      activeOpacity={theme.opacities.intense}
      disabled={disabled}
    >
      <InputText
        label={label}
        value={value?.label || ''}
        readOnly
        disabled={disabled}
        error={error}
        inputPointerEvents="none"
        help={help}
        action={renderIcon()}
      />
    </TouchableOpacity>
  );
}

InputSelect.Field = withTheme(wrapField<InputSelectPropsType<any, any>, any>((props, fieldProps) => {
  const {
    invalid, touched, error, submitError, value, onChange, onBlur, onFocus,
    required,
  } = fieldProps;

  const { showError, message } = getFieldErrorState(
    invalid,
    touched,
    error,
    submitError,
    props.help,
  );

  return (
    <InputSelect<any, any>
      {...props}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      error={showError}
      help={message}
      allowClear={props.allowClear ? !required : false}
    />
  );
})) as <FieldItem = any, FieldParams = any>(
  props: FieldWrapperPropsType<FieldItem, FieldParams>,
) => React.ReactElement;

type WrapperPropsType<Item, Params> = $Without<InputSelectPropsType<Item, Params>, 'theme'> & { theme?: $DeepPartial<AppThemeType> };

type FieldWrapperPropsType<Item, Params> = WrappedFieldRenderProps<InputSelectValueType<Item> | undefined>
& Omit<WrapperPropsType<Item, Params>, keyof WrapFieldProps<Item>>;

/*
 * Devido ao componente trabalhar com "generics" e tbm necessitar de um funções de
 * alta ordem (wrapModal, withTheme, wrapField, etc),
 * é necessário forçar a tipagem de saída devido a uma limitação do TypeScript.
 * https://stackoverflow.com/q/58469229/2826279
 */
export default withTheme(InputSelect) as (<Item = any, Params = any>(
  props: WrapperPropsType<Item, Params>
) => React.ReactElement)
& {
  Field: <FieldItem = any, FieldParams = any>(
    props: FieldWrapperPropsType<FieldItem, FieldParams>,
  ) => React.ReactElement;
};
