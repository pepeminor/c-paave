import { FollowingOption } from 'screens/CopyTradeScreen/CopyTradeScreen.type';

export interface GetCopySubscriptionResponse {
  account: string;
  subAccount: string;
  maxCash: number;
  autoOrderType: 'ATO' | 'ATC';
  followingID: string; // "AIRatingTop5"
  status: string;
  option: FollowingOption;
}

export interface SubscribeCopyTradeParam extends Omit<GetCopySubscriptionResponse, 'status'> {
  accountPin: string;
}

export interface SubscribeCopyTradeResponse {
  message: string;
}

export interface UnsubscribeCopyTradeParam {
  subAccount: string;
}

export interface UnsubscribeCopyTradeResponse {
  message: string;
  inactive: true;
}
