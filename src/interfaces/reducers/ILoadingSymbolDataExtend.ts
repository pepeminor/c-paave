import { SCChannel } from 'sc-channel';
import { ISymbolData } from 'interfaces/market';
import { ILoadingReducer } from 'interfaces/reducer';

export interface ILoadingSymbolDataExtend<E, S = undefined> {
  extend: ILoadingReducer<E>;
  symbolData: ILoadingReducer<S | ISymbolData>;
  subscribeChannelQuote?: SCChannel;
  subscribeChannelBidOffer?: SCChannel;
}
