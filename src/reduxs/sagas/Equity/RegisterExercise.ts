import APIList from 'config/api';
import { IAction } from 'interfaces/common';
import { IRegisterExerciseParams, IRegisterExerciseResponse } from 'interfaces/equity';
import { put, takeLeading } from 'redux-saga/effects';
import { EQUITY_REGISTER_EXERCISE } from 'reduxs/actions';
import { setItemPurchaseRight } from 'reduxs/global-actions';
import { alertMessage, callQueryKis } from 'utils';

function* doRegisterExercise(action: IAction<IRegisterExerciseParams>) {
  try {
    const response: IRegisterExerciseResponse = yield callQueryKis(APIList.registerExercise, action.payload);

    yield put({
      type: action.response?.success,
      payload: response,
    });
    alertMessage('success', 'Register exercise successfully');
  } catch (error: any) {
    yield put({
      type: action.response?.fail,
    });
  } finally {
    // Hide Register modal
    yield put(setItemPurchaseRight(null));
  }
}

export default function* watchRegisterExercise() {
  yield takeLeading(EQUITY_REGISTER_EXERCISE, doRegisterExercise);
}
