import React, {
  ComponentType, useCallback, useRef,
} from 'react';

import {
  FormApi, Mutator, SubmissionErrors, ValidationErrors,
} from 'final-form';
import { delay } from 'mapping-context-rn';
import { Form, FormRenderProps } from 'react-final-form';

import { setFieldTouched } from './utils';

export type OnSubmitFormType<FormValues, InitialFormValues = Partial<FormValues>> = (
  values: FormValues,
  form: FormApi<FormValues, InitialFormValues>,
) => SubmissionErrors | Promise<SubmissionErrors | void> | void;

type WrapFormRenderProps<FormValues, InitialFormValues> = Omit<FormRenderProps<FormValues, InitialFormValues>, 'handleSubmit'> & {
  handleSubmit: (
    submitCallback: OnSubmitFormType<FormValues, InitialFormValues>
  ) => () => void;
};

type WrapFormOptionsType<FormValues, InitialFormValues> = {
  form?: FormApi<FormValues, InitialFormValues>;
  initialValues?: InitialFormValues;
  validate?: (
    values: FormValues,
  ) => ValidationErrors | Promise<ValidationErrors>;
  validateOnBlur?: boolean;
  mutators?: { [key: string]: Mutator<FormValues, InitialFormValues> };
};

export default function wrapForm<
  Props,
  FormValues,
  InitialFormValues = Partial<FormValues>,
>(
  FormComponent: ComponentType<Props & WrapFormRenderProps<FormValues, InitialFormValues>>,
  options: WrapFormOptionsType<FormValues, InitialFormValues> = {},
) {

  type FormWrapperPropsType = Props & {
    form?: FormApi<FormValues, InitialFormValues>;
  };

  const defaultOptions: WrapFormOptionsType<FormValues, InitialFormValues> = {
    ...options,
    mutators: {
      setFieldTouched,
      ...options.mutators,
    },
  };

  function FormWrapper({ form: injectedForm, ...formWrapperProps }: FormWrapperPropsType) {
    const handleSubmitRef = useRef<FormRenderProps<FormValues, InitialFormValues>['handleSubmit']>();
    const submitCallbackRef = useRef<OnSubmitFormType<FormValues, InitialFormValues>>();

    const handleSubmitCreator = useCallback((submitCallback: OnSubmitFormType<FormValues, InitialFormValues>) => {
      submitCallbackRef.current = submitCallback;

      return () => handleSubmitRef.current?.();
    }, []);

    const handleFormSubmit = useCallback(async (
      values: FormValues,
      form: FormApi<FormValues, InitialFormValues>,
    ) => {
      // aguarda 1ms para que o form possa atualizar seu estado interno antes de submeter
      await delay(1);
      return submitCallbackRef.current?.(values, form);
    }, []);

    const renderForm = useCallback(({
      handleSubmit,
      ...othersRenderProps
    }: FormRenderProps<FormValues, InitialFormValues>) => {
      /**
       * Armazena a função de submit que irá disparar a submissão do formulário.
       */
      handleSubmitRef.current = handleSubmit;

      return (
        <FormComponent
          {...formWrapperProps as Props}
          {...othersRenderProps}
          /**
           * Passa para o componente a função que irá "criar" a função de submissão.
           */
          handleSubmit={handleSubmitCreator}
        />
      );
    }, [formWrapperProps, handleSubmitCreator]);

    return (
      <Form<FormValues, InitialFormValues>
        {...defaultOptions}
        onSubmit={handleFormSubmit}
        form={injectedForm ?? defaultOptions?.form}
      >
        {renderForm}
      </Form>
    );
  }

  FormWrapper.displayName = `FormWrapper(${FormComponent.displayName})`;

  return FormWrapper;
}
