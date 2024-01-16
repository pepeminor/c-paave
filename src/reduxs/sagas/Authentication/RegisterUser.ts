import { AUTHENTICATION_REGISTER_USER } from './../../actions';
import { IRegisterUserParams } from 'interfaces/authentication';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';

export default createNormalApiQuerySaga<IRegisterUserParams, any>(APIList.registerUser, AUTHENTICATION_REGISTER_USER);
