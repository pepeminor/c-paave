import { takeLeading, select, call, put } from 'redux-saga/effects';
import { KIS_PORTFOLIO_DERIVATIVES_TABLE_SUCCESS, PORTFOLIO_INVESTMENT_REFRESH_SCREEN } from '../../actions';
import { IResponse, IAccount, IAction } from 'interfaces/common';
import { IState } from '../../global-reducers/index';
import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';
import APIList from 'config/api';
import { queryKis } from 'utils';
import { IKisClientPortfolioResponse } from 'interfaces/equity';
import { getDerivativePortfolio } from 'reduxs/global-actions/Derivative';
import { InvestmentActions } from 'reduxs/Investment';

function* handleRefreshScreen(action: IAction<IAccount>) {
  try {
    const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
    if (action == null || selectedAccount.type === ACCOUNT_TYPE.DEMO) return;

    let api = APIList.getProfitLoss;
    let params = null;

    if (action.payload.type === ACCOUNT_TYPE.KIS) {
      const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
      if (selectedAccount.selectedSubAccount == null || selectedAccount.selectedSubAccount.accountSubs[0] == null) {
        return;
      } else {
        if (selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES) {
          api = APIList.getKisClientPortfolio;
          params = {
            accountNo: selectedAccount.selectedSubAccount.accountNumber,
          };
          yield put(getDerivativePortfolio({ accountNo: params.accountNo }));
          const response: IResponse<IKisClientPortfolioResponse> = yield call(queryKis, api, params);
          yield put({
            type: KIS_PORTFOLIO_DERIVATIVES_TABLE_SUCCESS,
            payload: response.data,
          });
          yield action.callBack?.handleSuccess && action.callBack.handleSuccess(response);
          return;
        } else {
          api = APIList.getKisProfitLoss;
          params = {
            subAccount: selectedAccount.selectedSubAccount.accountNumber,
            forced: true,
          };
        }
      }
    }
    yield put(
      InvestmentActions.getInvestmentListRequest({
        api: selectedAccount?.type === ACCOUNT_TYPE.KIS ? APIList.getKisProfitLoss : APIList.getProfitLoss,
        params: {
          subAccount: selectedAccount?.selectedSubAccount?.accountNumber!,
          forced: true,
        },
        callBack: action.callBack,
        isLoading: false,
      })
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('OnRefreshPortfolioInvestment', error);
    yield action.callBack?.handleFail && action.callBack.handleFail(error);
  }
}

export default function* watchOnRefreshPortfolioInvestment() {
  yield takeLeading(PORTFOLIO_INVESTMENT_REFRESH_SCREEN, handleRefreshScreen);
}
