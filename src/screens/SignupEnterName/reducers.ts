import { IAction } from 'interfaces/common';
import { AUTHENTICATION_REGISTER_USER_EXIST } from 'reduxs/actions';

export function AuthenticationRegisterUserExistTrigger(state = false, action: IAction<null>) {
  switch (action.type) {
    case AUTHENTICATION_REGISTER_USER_EXIST:
      return !state;
    default:
      return state;
  }
}
