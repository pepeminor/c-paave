import { object, string } from 'yup';

const signInSchema = object({
  username: string().required(''),
  password: string().required(''),
});

export default signInSchema;
