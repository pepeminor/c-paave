export interface IOutter {
  watchListType: IItemType;
  changeType: () => void;
}

export enum WATCH_LIST_TYPE {
  PRICE = 'PRICE',
  TRADING_VOLUME = 'TRADING_VOLUME',
  FOREIGNER_VOLUME = 'FOREIGNER_VOLUME',
}

export interface IItemType {
  index: number;
  type: WATCH_LIST_TYPE;
  name: string;
}

export type IProps = IOutter;
