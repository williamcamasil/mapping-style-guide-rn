import React from 'react';

import { FormApi, Mutator, ValidationErrors } from 'final-form';
import { Form as FinalForm, FormRenderProps } from 'react-final-form';

import { OnSubmitFormType } from './wrapForm';

export { default as wrapForm } from './wrapForm';
export { default as wrapField } from './wrapField';
export { hasValue, getFieldErrorState, setFormFieldTouched } from './utils';

export type { OnSubmitFormType } from './wrapForm';
export type {
  WrappedFieldRenderProps, WrapFieldProps, FieldValidator,
} from './wrapField';

export type FormPropsType<FormValues, InitialFormValues> = {
  children: (props: FormRenderProps<FormValues, InitialFormValues>) => React.ReactNode;
  onSubmit: OnSubmitFormType<FormValues, InitialFormValues>;
  form?: FormApi<FormValues, InitialFormValues>;
  initialValues?: InitialFormValues;
  validate?: (
    values: FormValues,
  ) => ValidationErrors | Promise<ValidationErrors>;
  validateOnBlur?: boolean;
  mutators?: { [key: string]: Mutator<FormValues, InitialFormValues> };
};

function Form<FormValues, InitialFormValues = Partial<FormValues>>(
  props: FormPropsType<FormValues, InitialFormValues>,
): JSX.Element {
  return (
    <FinalForm<FormValues, InitialFormValues> {...props} />
  );
}

export default Form;
