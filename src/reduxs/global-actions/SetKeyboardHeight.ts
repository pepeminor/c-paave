import { SET_KEYBOARD_HEIGHT } from 'reduxs/actions';

export const setKeyboardHeight = (height: number) => ({
  type: SET_KEYBOARD_HEIGHT,
  payload: height,
});
