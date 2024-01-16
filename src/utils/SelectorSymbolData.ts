/* eslint-disable no-console */
import { ISymbolQuote } from 'interfaces/market';
import { IWsBidOffer } from 'interfaces/market/IWsBidOffer';
import { ISymbolData } from '../interfaces/market';
import { SharedModuleMarketSubscribe } from './SharedModuleMarketSubscribe';

export type CallbackData = { [s: string]: ISymbolData };

export class SelectorSymbolData {
  public subscriber: SharedModuleMarketSubscribe;
  private oldState: CallbackData = {};
  private mapResult: CallbackData = {};
  private usingSet: Set<string> = new Set();

  private isCollecting = false;

  private quoteCb = (item: ISymbolQuote) => {
    this.extraCb(item as any as ISymbolData);
  };

  private bidOfferCb = (item: IWsBidOffer) => {
    this.extraCb(item as any as ISymbolData);
  };
  private extraCb = (item: ISymbolData) => {
    const oldData = this.oldState[item.s];
    const newData: ISymbolData = {
      ...oldData,
      ...(item as any as ISymbolData),
    };
    const dataChanged = oldData == null || this.comparable(oldData, newData);
    this.oldState[item.s] = newData;
    if (dataChanged) {
      this.mapResult[item.s] = newData;
      if (!this.isCollecting) {
        this.send();
      }
    }
  };

  private send = () => {
    if (this.usingSet.size > 0 && Object.keys(this.mapResult).length > 0) {
      this.isCollecting = true;
      this.cb(this.mapResult);
      this.mapResult = {};
      setTimeout(this.send, this.collectingInterval);
    } else {
      this.isCollecting = false;
    }
  };

  constructor(
    private cb: (data: CallbackData) => void,
    private comparable: (oldData: ISymbolData, newData: ISymbolData) => boolean,
    private collectingInterval: number = 300
  ) {
    this.subscriber = new SharedModuleMarketSubscribe(this.quoteCb, this.bidOfferCb, this.extraCb);
  }

  public usingSubscribe(callerId: string) {
    this.usingSet.add(callerId);
    console.log('send subscribe', this.usingSet.size);
  }

  public usingUnsubscribe(callerId: string) {
    this.usingSet.delete(callerId);
    console.log('send unsubscribe', this.usingSet.size);
  }
}
