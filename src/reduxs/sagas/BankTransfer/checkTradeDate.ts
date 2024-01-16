import { BANK_TRANSFER_CHECK_TRADE_DATE } from '../../actions';
import { createNormalApiQuerySaga } from 'utils';
import { put } from 'redux-saga/effects';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { checkTradeDateResponse } from '../../../interfaces/bankTransfer';
import { formatStringToDate } from '../../../utils';
import { getHours } from 'date-fns';

const compareDate = (date1: Date, date2: Date) => {
  return date1.setHours(0, 0, 0, 0) === date2.setHours(0, 0, 0, 0);
};

function* handleSuccess(response: IResponse<checkTradeDateResponse>, action: IAction<null>) {
  if (action.response != null) {
    const currentHours = Number(getHours(formatStringToDate(response.data.dateTime, 'yyyyMMddhhmmss'))) + 7;
    const currentDay = response.data.weekDay;
    const currentCheckDate = compareDate(
      new Date(),
      new Date(formatStringToDate(response.data.coreTime, 'dd/MM/yyyy'))
    );

    if (8 <= currentHours && currentHours < 16 && currentDay > 0 && currentDay < 6 && currentCheckDate) {
      yield put({
        type: action.response.success,
      });
    } else {
      yield put({
        type: action.response.fail,
      });
    }
  }
}

function* handleFailed(action: IAction<null>) {
  if (action.response != null) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<null, checkTradeDateResponse>(
  APIList.getKisTradeDate,
  BANK_TRANSFER_CHECK_TRADE_DATE,
  handleSuccess,
  handleFailed,
  undefined,
  true
);
