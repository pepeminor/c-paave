import { Nullable } from 'interfaces/Nullable';
import { ILoadingReducer } from 'interfaces/reducer';
import { ILoadingSymbolDataExtend } from './ILoadingSymbolDataExtend';

export interface IScreenDiscoverReducer {
  highLightIndexList: string[];
  isShowWatchListModal: boolean;
  navigateItem: string | null;
  highLightIndexSymbolData: ILoadingReducer<ILoadingSymbolDataExtend<string>[]>; // status = true when symbol latest load finish
}

export type IScreenDiscoverReducerPayload = Nullable<IScreenDiscoverReducer>;
