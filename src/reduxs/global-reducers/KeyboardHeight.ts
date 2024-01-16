import { IAction } from 'interfaces/common';
import { SET_KEYBOARD_HEIGHT } from 'reduxs/actions';

export function KeyboardHeight(state = 0, action: IAction<number>) {
  switch (action.type) {
    case SET_KEYBOARD_HEIGHT:
      return action.payload;
    default:
      return state;
  }
}
