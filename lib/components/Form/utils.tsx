import type { FormApi, MutableState } from 'final-form';

export const hasValue = (value: any) => {
  if (value === undefined) return false;
  if (value === null) return false;

  if (Array.isArray(value)) return value.length > 0;

  if (value instanceof Date) return true;

  switch (typeof value) {
    case 'object':
      return Object.keys(value).length > 0;
    case 'number':
    case 'boolean':
      return true;
    case 'string':
    default:
      return Boolean(value);
  }
};

export function getFieldErrorState(
  invalid: boolean | undefined,
  touched: boolean | undefined,
  error?: any,
  submitError?: any,
  helpMessage?: string,
) {
  const fieldError = error || submitError;

  const showError = Boolean(invalid && touched);
  const message = showError && typeof fieldError === 'string'
    ? fieldError
    : helpMessage;

  return {
    showError,
    message,
  };
}

type SetTouchedArguments = Parameters<(name: string, touched: boolean) => void>;

export function setFormFieldTouched<T>(form: FormApi<T>, fieldName: string, touched: boolean) {
  /* istanbul ignore next */
  if (!form.mutators.setFieldTouched) {
    console.warn('O form não possui o mutator setFieldTouched');
    return;
  }
  form.mutators.setFieldTouched(fieldName, touched);
}

export function setFieldTouched<FormValues, InitialFormValues = Partial<FormValues>>(
  args: SetTouchedArguments,
  state: MutableState<FormValues, InitialFormValues>,
) {
  const [name, touched] = args;
  const field = state.fields[name];
  if (field) {
    field.touched = Boolean(touched);
  }
}

