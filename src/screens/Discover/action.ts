import { DISCOVER_ENTER_SCREEN, DISCOVER_CLEAN_WATCHLIST, DISCOVER_SET_NAVIGATE_ITEM } from 'reduxs/actions';

import { generateAction } from 'utils';

export const onEnterScreen = generateAction<boolean>(DISCOVER_ENTER_SCREEN);

export const onCleanWatchList = generateAction(DISCOVER_CLEAN_WATCHLIST);

export const onSetNavigateItem = generateAction<string>(DISCOVER_SET_NAVIGATE_ITEM);
