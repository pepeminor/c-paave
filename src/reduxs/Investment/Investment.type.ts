import { IAPI, IActionCallBack } from 'interfaces/common';
import { IProfitLossResponse } from 'interfaces/equity';

export interface IPayloadGetInvestmentListRequest {
  api: IAPI;
  params?: {
    accountNo?: string;
    subAccount?: string;
    forced: boolean;
  };
  paramsOther?: {
    followingUserId: number;
    followingSubAccount: string;
  };
  isLoading: boolean;
  isLeaderBoard?: boolean;
  callBack?: IActionCallBack | undefined;
}

export interface IPayloadGetInvestmentListKisRequest {
  params: {
    followingUserId: number;
    partnerId: string;
  };
  callBack?: IActionCallBack | undefined;
}

export interface IPayloadGetInvestmentListSuccess {
  profitLossResponse: IProfitLossResponse;
  isOtherUser: boolean;
}
