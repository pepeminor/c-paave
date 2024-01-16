// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { StackScreenProps } from 'screens/RootNavigation';
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';
import { ITempListPriceType, TradeFormRef } from './components/TradeForm/TradeForm.type';
import { InputAccessoryViewID } from 'constants/enum';
import { IChangeNativeAndroid } from 'screens/TradeScreen/TradeScreen.type';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export interface IInner extends IReduxType {}

export interface IOutter extends StackScreenProps<'Trade' | 'Trade1'> {
  triggerReload: boolean;
  tradeFormRef: React.Ref<TradeFormRef> | undefined;
  priceAccessoriesData: ITempListPriceType[];
  nativeIDForAndroid: InputAccessoryViewID;
  onChangeNativeIDForAndroid: (data: IChangeNativeAndroid) => void;
}

export type IProps = IInner & IOutter;
