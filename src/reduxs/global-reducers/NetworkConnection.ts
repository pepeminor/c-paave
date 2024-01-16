import { IAction } from 'interfaces/common';
import { SHOW_MODAL_DISCONNECT_NETWORK } from 'reduxs/actions';

export function ShowModalDisconnectNetwork(state = false, action: IAction<boolean>): boolean {
  switch (action.type) {
    case SHOW_MODAL_DISCONNECT_NETWORK:
      return action.payload;
    default:
      return state;
  }
}
