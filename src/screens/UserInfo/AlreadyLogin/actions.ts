import { IRefreshTokenInvalidAction } from 'interfaces/sagas/IRefreshTokenInvalidAction';
import { ON_REFRESH_TOKEN_INVALID } from 'reduxs/actions';
import { generateAction } from 'utils';

export const logOutAction = generateAction<IRefreshTokenInvalidAction>(ON_REFRESH_TOKEN_INVALID);
