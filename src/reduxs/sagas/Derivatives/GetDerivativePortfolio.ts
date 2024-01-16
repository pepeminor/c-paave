import { put, call, takeLeading } from 'redux-saga/effects';
import { IAction, IDerivativesPurchasingPowerRequest, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { PORTFOLIO_DERIVATIVE } from 'reduxs/actions';
// import { alertMessage } from 'utils/common';
import { IGetDerivativePortfolioResponse } from 'interfaces/derivatives';
import { queryKis } from 'utils';
const getDerivativePortfolio = (params: IDerivativesPurchasingPowerRequest) => {
  return queryKis(APIList.getKisClientPortfolio, params);
};

function* doGetDerivativePortfolio(request: IAction<IDerivativesPurchasingPowerRequest>) {
  try {
    const response: IResponse<IGetDerivativePortfolioResponse> = yield call(getDerivativePortfolio, request.payload);

    if (request.response != null) {
      yield put({
        type: request.response.success,
        payload: response.data,
        hideLoading: true,
      });
    }
  } catch (error: any) {
    if (request.response != null) {
      yield put({
        type: request.response.fail,
        hideLoading: true,
      });
    }
  }
}

export default function* watchGetDerivativePortfolio() {
  yield takeLeading(PORTFOLIO_DERIVATIVE, doGetDerivativePortfolio);
}
