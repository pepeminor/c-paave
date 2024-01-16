import { NOTICE_SHOW, NOTICE_HIDE } from 'reduxs/actions';
import { IAction } from 'interfaces/common';

export function NoticeShow(state = false, action: IAction<boolean>) {
  switch (action.type) {
    case NOTICE_SHOW:
      return true;
    case NOTICE_HIDE:
      return false;
    default:
      return state;
  }
}
