import APIList from 'config/api';
import { SELL_BUY_TYPE } from 'global';
import { IAction, IResponse } from 'interfaces/common';
import { IKisGetEqtAssetInfoResponse, IKisGetEqtAssetInfoParams } from 'interfaces/services';
import { call, put, takeLeading } from 'redux-saga/effects';
import { SERVICE_GET_EQUITY_ASSET_INFO } from 'reduxs/actions';
import { kisGetEqtEnquiryPortfolio } from 'reduxs/global-actions';
import { queryKis } from 'utils';

function* sagaHandling(action: IAction<IKisGetEqtAssetInfoParams>) {
  try {
    const response: IResponse<IKisGetEqtAssetInfoResponse> = yield call(
      queryKis,
      APIList.getKisEqtAssetInfoFromPortfolio,
      {
        accountNumber: action.payload.accountNumber,
        clientID: action.payload.clientID,
      }
    );
    yield action.response != null &&
      put({
        type: action.response.success,
        payload: response.data,
      });

    if (response.data?.buyingPower?.purchasingPower != null) {
      if (action.payload.sellBuyType !== SELL_BUY_TYPE.BUY) {
        yield put(
          kisGetEqtEnquiryPortfolio({
            accountNumber: action.payload.accountNumber,
          })
        );
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Query eqt asset info failed', error);
    yield action.response != null && put({ type: action.response.fail });
  }
}

export default function* watchOnGetEquityAssetInfo() {
  yield takeLeading(SERVICE_GET_EQUITY_ASSET_INFO, sagaHandling);
}
