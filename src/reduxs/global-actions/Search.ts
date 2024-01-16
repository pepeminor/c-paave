import {
  IIncreaseSearchParams,
  IMostSearchStockParams,
  IDeleteRecentSearchHistoryParams,
  IUpdateHistorySearchParams,
  IIncreaseSearchForKisParams,
} from 'interfaces/search';
import {
  SEARCH_GET_MOST_SEARCH_STOCK,
  SEARCH_GET_RECENT_VIEWED,
  SEARCH_PUT_DELETE_HISTORY,
  SEARCH_PUT_UPDATE_HISTORY,
  SEARCH_PUT_INCREASE,
  SEARCH_PUT_INCREASE_KIS,
  SEARCH_GET_USER_INFO,
  SEARCH_GET_USER_SUB_ACCOUNT,
} from 'reduxs/actions';

import { generateAction, generateActionObject } from 'utils';
import { ISearchUserParams } from '../../interfaces/user';
import { IFollowingSubAccountParams } from '../../interfaces/search';

export const getMostSearchStock = generateAction<IMostSearchStockParams>(SEARCH_GET_MOST_SEARCH_STOCK);

export const putIncreaseSearch = generateAction<IIncreaseSearchParams>(SEARCH_PUT_INCREASE);

export const putSearchUpdateHistory = generateAction<IUpdateHistorySearchParams>(SEARCH_PUT_UPDATE_HISTORY);

export const searchUserInfo = generateActionObject<ISearchUserParams>(SEARCH_GET_USER_INFO);

export const getSearchRecentViewed = generateAction(SEARCH_GET_RECENT_VIEWED);

export const putSearchDeleteHistory = generateAction<IDeleteRecentSearchHistoryParams>(SEARCH_PUT_DELETE_HISTORY);

export const putIncreaseSearchForKis = generateAction<IIncreaseSearchForKisParams>(SEARCH_PUT_INCREASE_KIS);

export const getUserContestSubAccountFromSearch =
  generateAction<IFollowingSubAccountParams>(SEARCH_GET_USER_SUB_ACCOUNT);
