import { generateAction } from 'utils';
import { OVERVIEW_ENTER_SCREEN, OVERVIEW_LEAVE_SCREEN } from 'reduxs/actions';

export const onEnterOverview = generateAction<string>(OVERVIEW_ENTER_SCREEN);

export const onLeaveOverview = generateAction(OVERVIEW_LEAVE_SCREEN);
