import { NOTICE_HIDE, NOTICE_SHOW } from 'reduxs/actions';
import { generateAction } from 'utils';

export const openNotice = generateAction(NOTICE_SHOW);
export const hideNotice = generateAction(NOTICE_HIDE);
