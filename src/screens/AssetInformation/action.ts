import { IAccount } from 'interfaces/common';
import { ASSET_INFO_ENTER_SCREEN } from 'reduxs/actions';
import { generateAction } from 'utils';

export interface IOnEnterAssetInfoParams {
  selectedAccount: IAccount;
}

export const onEnterAssetInfoScreen = generateAction<IOnEnterAssetInfoParams | null>(ASSET_INFO_ENTER_SCREEN);
