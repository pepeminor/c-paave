import { ISymbolData } from '../interfaces/market';
import { SharedModuleMarketSubscribe } from './SharedModuleMarketSubscribe';
import { CallbackData, SelectorSymbolData } from './SelectorSymbolData';

interface ISubscribe {
  cb: (i: ISymbolData) => void;
  screenIdOrSymbol: string;
}

export class SymbolDataSubscribe {
  public subscriber: SharedModuleMarketSubscribe;
  private selector: SelectorSymbolData;

  private cacheData: { [s: string]: ISymbolData } = {};
  private activeSubscribeMap: { [symbol: string]: ISubscribe[] } = {};
  private pauseSubscribe: { [screenId: string]: ISubscribe[] } = {};

  constructor(
    private cb: (data: CallbackData) => void,
    comparable: (oldData: ISymbolData, newData: ISymbolData) => boolean,
    collectingInterval = 300
  ) {
    this.selector = new SelectorSymbolData(this.selectorCb, comparable, collectingInterval);
    this.subscriber = this.selector.subscriber;
  }

  public subscribe = (screenId: string, symbol: string, cb: (i: ISymbolData) => void) => {
    // use in sub component
    const subscribers = this.activeSubscribeMap[symbol];
    const data: ISubscribe = {
      cb,
      screenIdOrSymbol: screenId,
    };
    if (subscribers == null) {
      this.activeSubscribeMap[symbol] = [data];
    } else {
      subscribers.push(data);
    }
  };

  public pause = (screenId: string) => {
    // use in screen
    for (const key in this.activeSubscribeMap) {
      const subscribers = this.activeSubscribeMap[key];
      let pauseSubscribers: ISubscribe[] | null = null;
      for (let i = subscribers.length - 1; i >= 0; i--) {
        const subscriber = subscribers[i];
        if (subscriber.screenIdOrSymbol === screenId) {
          subscribers.splice(i, 1);
          if (pauseSubscribers == null) {
            pauseSubscribers = this.pauseSubscribe[key];
          }
          if (pauseSubscribers == null) {
            this.pauseSubscribe[key] = [subscriber];
          } else {
            pauseSubscribers.push(subscriber);
          }
        }
      }
    }
    this.selector.usingUnsubscribe(screenId);
  };

  public flush = () => {
    this.cb(this.cacheData);
  };

  public resume = (screenId: string) => {
    // use in screen
    for (const key in this.pauseSubscribe) {
      const subscribers = this.pauseSubscribe[key];
      let activeSubscribers: ISubscribe[] | null = null;
      for (let i = subscribers.length - 1; i >= 0; i--) {
        const subscriber = subscribers[i];
        if (subscriber.screenIdOrSymbol === screenId) {
          subscribers.splice(i, 1);
          if (activeSubscribers == null) {
            activeSubscribers = this.activeSubscribeMap[key];
          }
          if (activeSubscribers == null) {
            this.activeSubscribeMap[key] = [subscriber];
          } else {
            activeSubscribers.push(subscriber);
          }
        }
      }
    }
    this.selector.usingSubscribe(screenId);
  };

  public unsubscribe = (screenId: string, symbol: string) => {
    // use in sub component
    let subscribers = this.activeSubscribeMap[symbol];
    if (subscribers != null) {
      this.activeSubscribeMap[symbol] = subscribers.filter(item => item.screenIdOrSymbol === screenId);
    }
    subscribers = this.pauseSubscribe[symbol];
    if (subscribers != null) {
      this.pauseSubscribe[symbol] = subscribers.filter(item => item.screenIdOrSymbol === screenId);
    }
  };

  private selectorCb = (data: CallbackData) => {
    for (const key in data) {
      const newData = data[key];
      const current = this.cacheData[key];
      this.cacheData[key] = Object.assign(current == null ? {} : current, newData);
      const subscribers = this.activeSubscribeMap[key];
      if (subscribers != null) {
        subscribers.forEach(item => {
          item.cb(newData);
        });
      }
    }
  };

  public changeListSymbol = (newList: string[]) => {
    this.subscriber.changeListSymbol(newList);
  };

  public subscribeQuote = (screenId: string) => {
    this.subscriber.subscribeQuote(screenId);
  };

  public unSubscribeQuote = (screenId: string) => {
    this.subscriber.unSubscribeQuote(screenId);
  };

  public subscribeBidOffer = (screenId: string) => {
    this.subscriber.subscribeBidOffer(screenId);
  };

  public unSubscribeBidOffer = (screenId: string) => {
    this.subscriber.unSubscribeBidOffer(screenId);
  };

  public subscribeExtra = (screenId: string) => {
    this.subscriber.subscribeExtra(screenId);
  };

  public unSubscribeExtra = (screenId: string) => {
    this.subscriber.unSubscribeExtra(screenId);
  };
}
