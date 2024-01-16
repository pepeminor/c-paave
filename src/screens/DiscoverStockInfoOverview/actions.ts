import { STOCK_INFO_ENTER_SCREEN, STOCK_INFO_LEAVE_SCREEN } from 'reduxs/actions';
import { generateAction } from 'utils';

export const onEnterScreen = generateAction(STOCK_INFO_ENTER_SCREEN);

export const onLeaveScreen = generateAction(STOCK_INFO_LEAVE_SCREEN);
