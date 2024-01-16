import { IAction } from 'interfaces/common';
import { Nullable } from 'interfaces/Nullable';
import { ILoadingReducer, ReducerStatus } from 'interfaces/reducer';
import { IArrSymbolDataExtendChangePayload } from 'interfaces/reducers/IArrSymbolDataExtendChangePayload';
import { ILoadingSymbolDataExtend } from 'interfaces/reducers/ILoadingSymbolDataExtend';

import { IScreenIndexInfoReducer, IScreenIndexInfoReducerPayload } from 'interfaces/reducers/IScreenIndexInfoReducer';
import {
  INDEX_INFO_CLEAN_SCREEN_DATA,
  INDEX_INFO_REDUCER_UPDATE,
  INDEX_INFO_CHANGE_COMPOSITION_DATA,
} from 'reduxs/actions';
import { updateReducerSymbolData } from 'utils';

const initialValue: IScreenIndexInfoReducer = {
  historicalData: {
    data: null,
    status: ReducerStatus.LOADING,
  },
};

export function screenIndexInfo<T>(
  state: IScreenIndexInfoReducer = initialValue,
  action: IAction<IScreenIndexInfoReducerPayload | IArrSymbolDataExtendChangePayload<IScreenIndexInfoReducerPayload>>
): IScreenIndexInfoReducer {
  switch (action.type) {
    case INDEX_INFO_CHANGE_COMPOSITION_DATA: {
      const changeSymbolDataAction = action as IAction<
        IArrSymbolDataExtendChangePayload<Nullable<IScreenIndexInfoReducer>>
      >;
      const currentData: ILoadingReducer<ILoadingSymbolDataExtend<T>[]> = state[
        changeSymbolDataAction.payload.reducerKey
      ] as unknown as ILoadingReducer<ILoadingSymbolDataExtend<T>[]>;
      return updateReducerSymbolData(currentData, changeSymbolDataAction, state);
    }
    case INDEX_INFO_REDUCER_UPDATE:
      return { ...state, ...(action.payload as Nullable<IScreenIndexInfoReducerPayload>) };
    case INDEX_INFO_CLEAN_SCREEN_DATA:
      return initialValue;
    default:
      return state;
  }
}
