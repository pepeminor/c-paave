import { ISymbolData } from './market';
import { ILoadingReducer } from './reducer';

export interface ILoadingSymbolDataChildProps {
  symbolData: ILoadingReducer<ISymbolData | undefined>;
}
