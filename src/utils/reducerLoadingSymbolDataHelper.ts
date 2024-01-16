import { IAction } from 'interfaces/common';
import { Nullable } from 'interfaces/Nullable';
import { ILoadingReducer } from 'interfaces/reducer';
import { IArrSymbolDataExtendChangePayload } from 'interfaces/reducers/IArrSymbolDataExtendChangePayload';
import { ILoadingSymbolDataExtend } from 'interfaces/reducers/ILoadingSymbolDataExtend';

export interface IDifferentReducer {
  [s: string]: any;
}

export function updateReducerSymbolData<T, R, S>(
  currentData: ILoadingReducer<ILoadingSymbolDataExtend<T>[]>,
  action: IAction<IArrSymbolDataExtendChangePayload<Nullable<R>>>,
  state: S,
  diffReducer?: IDifferentReducer
): S {
  const payload = action.payload as IArrSymbolDataExtendChangePayload<R>;
  if (currentData.data == null) {
    return state;
  }
  const newDataArray = currentData.data.map((item: ILoadingSymbolDataExtend<T>) => {
    if (item.symbolData == null || item.symbolData.data == null) {
      return item;
    }
    const newSymbolData = payload.map[item.symbolData.data.s];
    if (newSymbolData == null) {
      return item;
    }
    const newItem: ILoadingSymbolDataExtend<T> = {
      ...item,
      symbolData: {
        status: item.symbolData.status,
        data: {
          ...item.symbolData.data,
          ...newSymbolData,
        },
      },
    };

    return newItem;
  });

  return {
    ...state,
    ...diffReducer,
    [payload.reducerKey]: {
      ...currentData,
      data: newDataArray,
    },
  };
}
