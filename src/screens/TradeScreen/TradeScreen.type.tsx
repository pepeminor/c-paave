// eslint-disable-next-line @typescript-eslint/no-empty-interface
import { StackScreenProps } from 'screens/RootNavigation';
import { mapDispatchToProps, mapStateToProps } from './index';
import { MapStateToProps } from 'constants/type';
import { InputAccessoryViewID } from 'constants/enum';
import { ITempListPriceType } from './components/TradeFormLayout/components/TradeForm/TradeForm.type';

type IReduxType = typeof mapDispatchToProps & MapStateToProps<typeof mapStateToProps>;

export interface IProps extends IReduxType, StackScreenProps<'Trade' | 'Trade1'> {}

export type IChangeNativeAndroid = {
  nativeID?: InputAccessoryViewID;
  tempListPrice?: ITempListPriceType[];
};

export type ITempListQuantityType = { label: string; value: number };

export const tempListQuantity: ITempListQuantityType[] = [
  {
    label: '100',
    value: 100,
  },
  {
    label: '500',
    value: 500,
  },
  {
    label: '1000',
    value: 1000,
  },
  {
    label: '2000',
    value: 2000,
  },
];
