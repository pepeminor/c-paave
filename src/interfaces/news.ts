import { IParams } from './common';

export interface ISymbolQuoteMinutes extends IParams {
  readonly symbol: string;
  readonly minuteUnit: number;
  readonly fromTime: string;
  readonly toTime: string;
  readonly fetchCount: number;
}

export interface INewsParams extends IParams {
  readonly fetchCount: number;
}

export interface INews extends IParams {
  readonly id: string;
  readonly lang: string;
  readonly link: string;
  readonly title: string;
  readonly imgUrl: string;
  readonly source?: {
    readonly name: string;
    readonly logoUrl: string;
  };
  readonly category: string;
  readonly symbolList: [string];
  readonly publishTime: string;
}
