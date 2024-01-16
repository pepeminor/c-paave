import { IAction } from 'interfaces/common';
import { OPEN_DUMMY_MODAL, CLOSE_DUMMY_MODAL } from 'reduxs/actions';

export function ShowDummyModal(state = false, action: IAction<boolean>): boolean {
  switch (action.type) {
    case OPEN_DUMMY_MODAL:
      return true;
    case CLOSE_DUMMY_MODAL:
      return false;
    default:
      return state;
  }
}
