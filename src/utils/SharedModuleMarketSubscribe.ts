import { WS } from 'constants/enum';
import { Global } from 'constants/main';
import { ISymbolQuote } from 'interfaces/market';
import { IWsBidOffer } from 'interfaces/market/IWsBidOffer';
import { SCChannel } from 'sc-channel';
// import { IWsBidOffer } from '../interfaces/market/IWsBidOffer';
import { ISymbolData } from '../interfaces/market';

export class SharedModuleMarketSubscribe {
  private subscribeQuotes: Set<string> = new Set();
  private subscribeBidOffers: Set<string> = new Set();
  private subscribeExtras: Set<string> = new Set();
  private mapSymbolQuote: { [symbol: string]: SCChannel } = {};
  private mapSymbolBidOffer: { [symbol: string]: SCChannel } = {};
  private mapSymbolExtra: { [symbol: string]: SCChannel } = {};

  constructor(
    private quoteCb?: (i: ISymbolQuote) => void,
    private bidOfferCb?: (i: IWsBidOffer) => void,
    private extraCb?: (i: ISymbolData) => void
  ) {}

  public subscribeQuote = (callerId: string) => {
    this.subscribe(
      callerId,
      this.subscribeQuotes
      // this.mapSymbolQuote
    );
  };

  public unSubscribeQuote = (callerId: string) => {
    this.unsubscribe(callerId, this.subscribeQuotes, this.mapSymbolQuote);
  };

  public subscribeBidOffer = (callerId: string) => {
    this.subscribe(
      callerId,
      this.subscribeBidOffers
      // this.mapSymbolBidOffer
    );
  };

  public unSubscribeBidOffer = (callerId: string) => {
    this.unsubscribe(callerId, this.subscribeBidOffers, this.mapSymbolBidOffer);
  };

  public subscribeExtra = (callerId: string) => {
    this.subscribe(
      callerId,
      this.subscribeExtras
      // this.mapSymbolExtra
    );
  };

  public unSubscribeExtra = (callerId: string) => {
    this.unsubscribe(callerId, this.subscribeExtras, this.mapSymbolExtra);
  };

  private subscribe = (
    callerId: string,
    set: Set<string>
    // map: { [symbol: string]: SCChannel }
  ) => {
    set.add(callerId);
  };

  private subscribeAList = <T>(
    newList: string[],
    map: { [symbol: string]: SCChannel },
    cb: ((i: T) => void) | undefined,
    channelNameCreator: (s: string) => string
  ) => {
    // let price = new Date().getTime();
    newList.forEach(s => {
      const channel = Global.sockets[WS.PRICE_BOARD]?.subscribe(channelNameCreator(s));
      if (channel) {
        map[s] = channel;
        channel?.watch((data: T | undefined) => {
          if (data == null) {
            return;
          }
          if (cb) {
            cb(data);
          }
        });
      }
    });
  };

  public changeListSymbol = (newList: string[]) => {
    this.unsubscribeAMap(this.mapSymbolBidOffer);
    this.unsubscribeAMap(this.mapSymbolQuote);
    this.unsubscribeAMap(this.mapSymbolExtra);

    if (this.subscribeQuotes.size > 0) {
      this.subscribeAList(newList, this.mapSymbolQuote, this.quoteCb, s => `market.quote.${s}`);
    }
    if (this.subscribeBidOffers.size > 0) {
      this.subscribeAList(newList, this.mapSymbolBidOffer, this.bidOfferCb, s => `market.bidOffer.${s}`);
    }
    if (this.subscribeExtras.size > 0) {
      this.subscribeAList(newList, this.mapSymbolExtra, this.extraCb, s => `market.extra.${s}`);
    }
  };

  private unsubscribeAMap = (map: { [symbol: string]: SCChannel }) => {
    Object.keys(map).forEach(symbol => {
      const channel = map[symbol];
      channel.unwatch();
      channel.unsubscribe();
      channel.destroy();
      delete map[symbol];
    });
  };

  private unsubscribe = (callerId: string, set: Set<string>, map: { [symbol: string]: SCChannel }) => {
    set.delete(callerId);
    if (set.size === 0) {
      this.unsubscribeAMap(map);
    }
  };
}
