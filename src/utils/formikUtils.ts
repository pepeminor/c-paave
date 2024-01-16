import { ObjectSchema, TestContext } from 'yup';
import set from 'lodash/set';
import { AnyObject } from 'yup/lib/types';

type YupSchema = ObjectSchema<any, any, any>;
export const mergeYupSchema = (...schemas: Array<YupSchema>) => {
  const [first, ...rest] = schemas;
  const merged = rest.reduce((mergedSchemas, schema) => mergedSchemas.concat(schema), first);
  return merged;
};

type FormikError = {
  path: string;
  inner?: FormikError[];
  name: string;
  message: string;
};
type Errors = { [key: string]: string };
export const handleErrors = (error: FormikError) => {
  if (!error) return {};
  if (error.name !== 'ValidationError') {
    throw error;
  }
  return error.inner?.reduce((errors: Errors, currentError: FormikError) => {
    errors = set(errors, currentError.path, currentError.message);
    return errors;
  }, {});
};

export const getContext = <T>(context: TestContext<AnyObject>) => {
  return context.options.context as T;
};
