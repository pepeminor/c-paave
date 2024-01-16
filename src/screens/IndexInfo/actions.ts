import { INDEX_INFO_ENTER_SCREEN, INDEX_INFO_LEAVE_SCREEN } from 'reduxs/actions';
import { generateAction } from 'utils';

export const onEnterScreen = generateAction<string>(INDEX_INFO_ENTER_SCREEN);
export const onLeaveScreen = generateAction(INDEX_INFO_LEAVE_SCREEN);
