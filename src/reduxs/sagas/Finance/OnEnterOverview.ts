import { put, takeLeading } from 'redux-saga/effects';
import { IAction } from 'interfaces/common';
import { IFinancialRatioParams } from 'interfaces/finance';
import { OVERVIEW_ENTER_SCREEN } from 'reduxs/actions';
import { queryFinancialRatioData, queryForeignTrade } from 'reduxs/global-actions/Finance';

function* queryOverview(action: IAction<string>) {
  try {
    const params: IFinancialRatioParams = {
      code: action.payload,
    };

    yield put(queryFinancialRatioData(params));
    yield put(queryForeignTrade(params));
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('fail in query onEnterOverview', e);
  }
}

export default function* watchOnEnterOverview() {
  yield takeLeading(OVERVIEW_ENTER_SCREEN, queryOverview);
}
