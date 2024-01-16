import { ADD_SYMBOL_ENTER_SCREEN, ADD_SYMBOL_LEAVE_SCREEN } from 'reduxs/actions';
import { generateAction } from 'utils';

export const onEnterScreen = generateAction(ADD_SYMBOL_ENTER_SCREEN);

export const onLeaveScreen = generateAction(ADD_SYMBOL_LEAVE_SCREEN);
