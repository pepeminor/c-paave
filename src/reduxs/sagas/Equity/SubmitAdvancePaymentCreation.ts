import APIList from 'config/api';
import { IAction } from 'interfaces/common';
import {
  ICheckAdvancePaymentTimeParams,
  ICheckAdvancePaymentTimeResponse,
  ISubmitAdvancePaymentCreationParams,
  ISubmitAdvancePaymentCreationResponse,
} from 'interfaces/equity';
import { put, takeLeading } from 'redux-saga/effects';
import { EQUITY_SUBMIT_ADVANCE_PAYMENT_CREATION } from 'reduxs/actions';
import { alertMessage, callQueryKis } from 'utils';

function* doSubmitAdvancePaymentCreation(action: IAction<ISubmitAdvancePaymentCreationParams>) {
  try {
    const checkTimeResult: ICheckAdvancePaymentTimeResponse = yield callQueryKis(APIList.checkAdvancePaymentTime, {
      accountNo: action.payload.accountNo,
    } as ICheckAdvancePaymentTimeParams);

    if (!checkTimeResult.result) {
      throw { code: 'Out of advance hours, please try again later' };
    }

    const response: ISubmitAdvancePaymentCreationResponse = yield callQueryKis(
      APIList.submitAdvancePaymentCreation,
      action.payload
    );

    yield put({
      type: action.response?.success,
      payload: response.success,
    });
    alertMessage('success', 'Advanced cash successfully');
  } catch (error: any) {
    yield put({
      type: action.response?.fail,
    });
  }
}

export default function* watchSubmitAdvancePaymentCreation() {
  yield takeLeading(EQUITY_SUBMIT_ADVANCE_PAYMENT_CREATION, doSubmitAdvancePaymentCreation);
}
