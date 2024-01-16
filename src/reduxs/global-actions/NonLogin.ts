import { NON_LOGIN_MODAL } from 'reduxs/actions';

export const showNonLoginModal = () => ({
  type: NON_LOGIN_MODAL,
  payload: true,
});

export const hideNonLoginModal = () => ({
  type: NON_LOGIN_MODAL,
  payload: false,
});
