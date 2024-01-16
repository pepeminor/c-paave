import { MARKET_GET_SYMBOL_PERIOD_MAS } from '../../actions';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { createNormalApiQuerySaga, formatTimeToDisplay } from 'utils';
import { put } from 'redux-saga/effects';
import { IGetSymbolPeriodMasParams, IGetSymbolPeriodMasResponse } from 'interfaces/market';

function* handleSuccess(
  response: IResponse<IGetSymbolPeriodMasResponse[]>,
  action: IAction<IGetSymbolPeriodMasParams>
) {
  let data: IGetSymbolPeriodMasResponse[] = response.data;

  if (data != null && action.differentParams && action.differentParams.splitMonth) {
    data = data.filter(item => {
      const itemDateFormat = formatTimeToDisplay(item.d, 'yyyy-MM-dd', 'yyyyMMdd', true);

      if (itemDateFormat != null) {
        const oneMonthAgo = new Date().setDate(new Date().getDate() - 30);
        const itemDay = new Date(itemDateFormat).getDay();
        const itemDateTime = new Date(itemDateFormat).getTime();
        return itemDateTime >= oneMonthAgo && itemDay != 0 && itemDay != 6; // saturday = 6, sunday = 0
      }
      return item != null;
    });
  }

  if (action.response) {
    yield put({
      type: action.response.success,
      payload: data,
      hideLoading: true,
    });
  }
}

function* handleFailed(action: IAction<IGetSymbolPeriodMasParams>) {
  if (action.response) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<IGetSymbolPeriodMasParams, IGetSymbolPeriodMasResponse[]>(
  APIList.symbolPeriodMas,
  MARKET_GET_SYMBOL_PERIOD_MAS,
  handleSuccess,
  handleFailed
);
