import { IAction } from 'interfaces/common';
import { SET_SAFE_SCREEN_HEIGHT } from 'reduxs/actions';

export function SafeScreenHeight(state = 0, action: IAction<number>) {
  switch (action.type) {
    case SET_SAFE_SCREEN_HEIGHT:
      return action.payload;
    default:
      return state;
  }
}
