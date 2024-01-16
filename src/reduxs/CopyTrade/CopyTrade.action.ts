import { SubscribeCopyTradeParam } from 'interfaces/CopyTrade';
import { generateToolkitAction } from 'utils';

export const getCopyTradeSubscription = generateToolkitAction('CopyTrade/GetSubscription');

export const resetCopyTradeSubscription = generateToolkitAction('CopyTrade/ResetSubscription');

export const subscribeCopyTrade = generateToolkitAction<SubscribeCopyTradeParam>('CopyTrade/Subscribe');

export const editCopyTradeSubscription = generateToolkitAction<SubscribeCopyTradeParam>('CopyTrade/EditSubscription');

export const unSubscribeCopyTrade = generateToolkitAction('CopyTrade/Unsubscribe');
