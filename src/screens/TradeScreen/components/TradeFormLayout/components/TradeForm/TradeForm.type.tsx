// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { ISpecialPriceType, InputAccessoryViewID } from 'constants/enum';
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';
import { ORDER_TYPE } from 'global';
import { IChangeNativeAndroid } from 'screens/TradeScreen/TradeScreen.type';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export interface IInner extends IReduxType {}

export interface IOutter {
  isHaveCurrentSymbol: boolean;
  triggerReload: boolean;
  onChangeNativeIDForAndroid: (data: IChangeNativeAndroid) => void;
  priceAccessoriesData: ITempListPriceType[];
  nativeIDForAndroid: InputAccessoryViewID;
}

export type IProps = IInner & IOutter;
export type ITempListPriceType = { label: string; value: number | ISpecialPriceType };

export const LIST_ORDER_TYPE_VIRTUAL = [
  {
    label: 'Normal Order',
    value: ORDER_TYPE.NORMAL_ORDER,
  },
  {
    label: 'Stop Order',
    value: ORDER_TYPE.STOP_ORDER,
  },
  // {
  //   label: 'Stop Limit Order',
  //   value: ORDER_TYPE.STOP_LIMIT_ORDER,
  // },
];

export const LIST_ORDER_TYPE_KIS = [
  {
    label: 'Normal Order',
    value: ORDER_TYPE.NORMAL_ORDER,
  },
  {
    label: 'Stop Order',
    value: ORDER_TYPE.STOP_LIMIT_ORDER,
  },
];

export interface TradeFormRef {
  setPrice: ({ item, nativeID }: { item: ITempListPriceType; nativeID: InputAccessoryViewID }) => void;
}

export type ITradeFormRef = React.Ref<TradeFormRef> | undefined;
