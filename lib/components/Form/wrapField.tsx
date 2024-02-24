import React, { useCallback } from 'react';

import { FieldState } from 'final-form';
import { Field, FieldMetaState, FieldRenderProps } from 'react-final-form';

import { hasValue } from './utils';

export type WrapFieldProps<FieldValue> = FieldMetaState<FieldValue> & {
  value?: FieldValue | null;
  onChange?: (value: FieldValue | null) => void;
  onBlur?: (event?: any) => void;
  onFocus?: (event?: any) => void;
  required?: boolean;
};

export type FieldValidator<FieldValue, FormValues = any, InitialFormValues = Partial<FormValues>> = (
  value: FieldValue,
  allValues?: InitialFormValues,
  meta?: FieldState<FieldValue>
) => any | Promise<any>;

export type WrappedFieldRenderProps<FieldValue> = {
  /**
   * Nome do field que será retornado no objeto `values` ao submeter o formulário.
   */
  name: string;
  /**
   * Função que valida o estado do field.
   * Se o field está válido, então deve retornar `undefined`.
   * Caso contrário, deve retornar a `string` com a mensagem de erro.
   */
  validate?: FieldValidator<FieldValue>;
  /**
   * Função que faz o parse do valor informado antes de salvar no `state` do
   * formulário:
   *
   * field -> parse -> formState
   */
  parse?: (value: FieldValue, name: string) => FieldValue;
  /**
   * Função que formata o valor do campo para renderizar na tela:
   *
   * formState -> format -> field
   */
  format?: (value: FieldValue, name: string) => FieldValue;
  /**
   * Quando requerido, o `validate` é aplicado mesmo com o field vazio.
   * Se não for requerido, então o `validate` é aplicado apenas quando o field tiver um valor.
   */
  required?: boolean;
  /**
   * valor inicial de um campo
  */
  initialValue?: FieldValue;
};

export default function wrapField<
  Props,
  FieldValue = string | undefined,
  ExternalProps = Omit<Props, keyof WrapFieldProps<FieldValue>>,
>(renderField: (componentProps: ExternalProps, fieldProps: WrapFieldProps<FieldValue>) => React.ReactElement) {

  type FieldWrapperPropsType = WrappedFieldRenderProps<FieldValue> & ExternalProps;

  function FieldWrapper({
    name,
    validate,
    parse,
    format,
    required,
    initialValue,
    ...othersFieldProps
  }: FieldWrapperPropsType) {
    const renderFieldProps = useCallback((renderProps: FieldRenderProps<FieldValue>) => renderField(
      /**
       * Foi necessário desativar passar any aqui devido a uma limitação de tipagem do FinalForm.
       * Assim é possível inferir o tipo corretamente ao componente retornado pelo "wrapField".
       */
      (othersFieldProps as any),
      {
        ...renderProps.input,
        ...renderProps.meta,
        required,
      },
    ), [othersFieldProps, required]);

    const handleValidation: FieldValidator<FieldValue> = useCallback((value, values, meta) => {
      if (validate && (required || hasValue(value))) {
        return validate(value, values, meta);
      }
      return undefined;
    }, [validate, required]);

    return (
      <Field<FieldValue>
        name={name}
        render={renderFieldProps}
        validate={handleValidation}
        parse={parse}
        format={format}
        initialValue={initialValue}
      />
    );
  }

  return FieldWrapper;
}
