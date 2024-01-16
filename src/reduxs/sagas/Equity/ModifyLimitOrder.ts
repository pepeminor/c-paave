import { EQUITY_MODIFY_LO, MODIFY_ORDERBOOK_SUCCESS_TRIGGER } from 'reduxs/actions';
import { IAction, IResponse } from 'interfaces/common';
import { IEquityLOParams, IEquityModifyResponse } from 'interfaces/equity';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';
import { updateActiveFilter } from '../../global-actions/OrderBook';

function* handlePostModifyLOSuccess(_response: IResponse<IEquityModifyResponse>, _action: IAction<IEquityLOParams>) {
  yield put(updateActiveFilter({ pageNumber: 0 }));
  yield put({
    type: MODIFY_ORDERBOOK_SUCCESS_TRIGGER,
  });
}

function* handlePostModifyLOFail(action: IAction<IEquityLOParams>) {
  if (action.response) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<IEquityLOParams, IEquityModifyResponse>(
  APIList.modifyLO,
  EQUITY_MODIFY_LO,
  handlePostModifyLOSuccess,
  handlePostModifyLOFail
);
