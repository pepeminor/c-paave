import config from 'config';
import { ErrorMessage } from 'constants/message';
import * as yup from 'yup';

const validationSchema = yup.object({
  registeredUsername: yup
    .string()
    .max(20, ErrorMessage.USERNAME_INVALID)
    .matches(config.regex.username, ErrorMessage.USERNAME_INVALID)
    .required(''),
  fullName: yup
    .string()
    .max(50, ErrorMessage.FULL_NAME_INVALID)
    .matches(config.regex.fullname, ErrorMessage.FULL_NAME_INVALID)
    .required(''),
});

export default validationSchema;
