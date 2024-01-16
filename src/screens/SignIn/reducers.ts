import { ILoginParams, ILoginResponse } from 'interfaces/authentication';
import { FAILURE, RESET, SUCCESS } from 'reduxs/action-type-utils';
import { AUTHENTICATION_LOGIN } from 'reduxs/actions';
import { IAction } from '../../interfaces/common';

export function LoginData(
  state: (ILoginResponse & ILoginParams) | null = null,
  action: IAction<ILoginResponse & ILoginParams>
) {
  switch (action.type) {
    case SUCCESS(AUTHENTICATION_LOGIN):
      return { ...action.payload };
    case FAILURE(AUTHENTICATION_LOGIN):
      return null;
    case RESET(AUTHENTICATION_LOGIN):
      return null;
    default:
      return state;
  }
}
