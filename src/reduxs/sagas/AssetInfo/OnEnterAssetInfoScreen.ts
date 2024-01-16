import { put, takeLeading } from 'redux-saga/effects';
import { ASSET_INFO_ENTER_SCREEN } from '../../actions';
import { IAction } from '../../../interfaces/common';
// import { alertMessage } from 'utils';
import {
  getAccountBalanceForKis,
  getCashBalanceAndStockBalanceForKis,
  getProfitLoss,
} from 'reduxs/global-actions/Equity';
import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';
import { IOnEnterAssetInfoParams } from 'screens/AssetInformation/action';
import { kisGetDerAssetInformation } from 'reduxs/global-actions/KisServicesDer';

function* queryAssetInfo(request: IAction<IOnEnterAssetInfoParams | null>) {
  try {
    if (request.payload == null) return;
    switch (request.payload.selectedAccount.type) {
      case ACCOUNT_TYPE.KIS:
        if (
          request.payload.selectedAccount.selectedSubAccount != null &&
          request.payload.selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY
        ) {
          yield put(
            getCashBalanceAndStockBalanceForKis({
              accountNumber: request.payload.selectedAccount.selectedSubAccount.accountNumber,
              clientID: request.payload.selectedAccount.username,
            })
          );
          yield put(
            getAccountBalanceForKis({
              accountNumber: request.payload.selectedAccount.selectedSubAccount.accountNumber,
              clientID: request.payload.selectedAccount.username,
            })
          );
        } else if (
          request.payload.selectedAccount.selectedSubAccount != null &&
          request.payload.selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES
        ) {
          yield put(
            kisGetDerAssetInformation({
              accountNo: request.payload.selectedAccount.selectedSubAccount.accountNumber,
            })
          );
        }
        break;
      case ACCOUNT_TYPE.VIRTUAL:
        yield put(getProfitLoss(null));
        break;
      default:
        break;
    }
  } catch {
    // alertMessage('danger', 'on enter asset info from portfolio', error.message);
  }
}

export default function* watchOnEnterScreen() {
  yield takeLeading(ASSET_INFO_ENTER_SCREEN, queryAssetInfo);
}
