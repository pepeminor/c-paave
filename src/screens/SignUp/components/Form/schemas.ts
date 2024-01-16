import config from 'config';
import { ErrorMessage } from 'constants/message';
import { object, ref, string } from 'yup';

const signUpSchema = object({
  email: string()
    .required(ErrorMessage.INVALID_EMAIL)
    .test('', ErrorMessage.INVALID_EMAIL, (value, _context) => {
      if (!value) return false;
      return config.regex.email.test(value);
    }),
  password: string()
    .required(ErrorMessage.INVALID_PASSWORD)
    .test('', ErrorMessage.INVALID_PASSWORD, (value, _context) => {
      if (!value) return false;
      return config.regex.passWord.test(value);
    }),
  confirmPassword: string()
    .required(ErrorMessage.INVALID_CONFIRM_PASSWORD)
    .oneOf([ref('password'), null], ErrorMessage.INVALID_CONFIRM_PASSWORD),
});

export default signUpSchema;
