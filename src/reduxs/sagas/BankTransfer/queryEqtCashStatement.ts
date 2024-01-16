import { put, call, takeLeading } from 'redux-saga/effects';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { ICashStatementParams, IEqtCashStatementResponse } from '../../../interfaces/bankTransfer';
import { CASH_STATEMENT_EQT_QUERY_DATA } from '../../actions';
import { queryKis } from 'utils';

function* getCashStatement(request: IAction<ICashStatementParams>) {
  try {
    const response: IResponse<IEqtCashStatementResponse> = yield call(
      queryKis,
      APIList.getEqtCashStatement,
      request.payload
    );
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

export default function* queryCashStatement() {
  yield takeLeading(CASH_STATEMENT_EQT_QUERY_DATA, getCashStatement);
}
