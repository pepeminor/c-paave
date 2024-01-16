import { GetCopySubscriptionResponse } from 'interfaces/CopyTrade';

export type CopyTradeState = {
  modalFirstOpen: boolean;
  termAndConditionViewed: boolean;
  subscription: {
    [key: string]: GetCopySubscriptionResponse;
  };
  copyTradeBanner: boolean;
};
