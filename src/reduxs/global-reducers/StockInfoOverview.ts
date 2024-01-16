import { IAction } from 'interfaces/common';
import { ILoadingReducer, ReducerStatus } from 'interfaces/reducer';
import { IArrSymbolDataExtendChangePayload } from 'interfaces/reducers/IArrSymbolDataExtendChangePayload';
import { ILoadingSymbolDataExtend } from 'interfaces/reducers/ILoadingSymbolDataExtend';
import { IScreenDiscoverReducer, IScreenDiscoverReducerPayload } from 'interfaces/reducers/IScreenDiscoverReducer';
import {
  STOCK_INFO_OVERVIEW_CHANGE_SYMBOl_DATA,
  STOCK_INFO_OVERVIEW_CLEAN_SCREEN_DATA,
  STOCK_INFO_OVERVIEW_REDUCER_UPDATE,
} from 'reduxs/actions';
import { updateReducerSymbolData } from 'utils';

const defaultValue: IScreenDiscoverReducer = {
  highLightIndexList: [],
  isShowWatchListModal: false,
  navigateItem: null,
  highLightIndexSymbolData: {
    data: [],
    status: ReducerStatus.LOADING,
  },
};

export function screenStockInfoOverview<T>(
  state: IScreenDiscoverReducer = defaultValue,
  action: IAction<IScreenDiscoverReducerPayload | IArrSymbolDataExtendChangePayload<IScreenDiscoverReducerPayload>>
) {
  switch (action.type) {
    case STOCK_INFO_OVERVIEW_REDUCER_UPDATE:
      return { ...state, ...(action.payload as IScreenDiscoverReducerPayload) };
    case STOCK_INFO_OVERVIEW_CLEAN_SCREEN_DATA:
      return defaultValue;
    case STOCK_INFO_OVERVIEW_CHANGE_SYMBOl_DATA: {
      const changeSymbolDataAction = action as IAction<
        IArrSymbolDataExtendChangePayload<IScreenDiscoverReducerPayload>
      >;
      const currentData: ILoadingReducer<ILoadingSymbolDataExtend<T>[]> = state[
        changeSymbolDataAction.payload.reducerKey
      ] as unknown as ILoadingReducer<ILoadingSymbolDataExtend<T>[]>;
      return updateReducerSymbolData(currentData, changeSymbolDataAction, state);
    }
    default:
      return state;
  }
}
