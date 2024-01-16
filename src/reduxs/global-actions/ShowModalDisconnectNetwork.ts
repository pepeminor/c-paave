import { SHOW_MODAL_DISCONNECT_NETWORK } from 'reduxs/actions';
import { generateAction } from 'utils/common';

export const showModalDisconnectNetwork = generateAction<boolean>(SHOW_MODAL_DISCONNECT_NETWORK);
