import APIList from 'config/api';
import { IResetPasswordParams } from 'interfaces/authentication';
import { AUTHENTICATION_RESET_PASSWORD } from 'reduxs/actions';
import { createNormalApiQuerySaga } from 'utils';

export default createNormalApiQuerySaga<IResetPasswordParams, any>(
  APIList.resetPassword,
  AUTHENTICATION_RESET_PASSWORD
);
