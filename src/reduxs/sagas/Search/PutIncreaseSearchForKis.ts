import { put, call, takeLeading } from 'redux-saga/effects';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { SEARCH_PUT_INCREASE_KIS } from 'reduxs/actions';
import { IIncreaseSearchForKisResponse, IIncreaseSearchForKisParams } from 'interfaces/search';
import { query } from 'utils';

const putIncreaseSearchForKis = (params: IIncreaseSearchForKisParams) => {
  return query(APIList.putIncreaseForKis, params);
};

function* doPutIncreaseSearchForKis(request: IAction<IIncreaseSearchForKisParams>) {
  try {
    const response: IResponse<IIncreaseSearchForKisResponse> = yield call(putIncreaseSearchForKis, request.payload);

    if (request.response != null) {
      yield put({
        type: request.response.success,
        payload: response.data,
        hideLoading: true,
      });
    }
  } catch (error) {
    if (request.response != null) {
      yield put({
        type: request.response.fail,
        hideLoading: true,
      });
    }
    // alertMessage('danger', 'put increase search for kis', error.code ?? error.message);
  }
}

export default function* watchPutIncreaseSearchForKis() {
  yield takeLeading(SEARCH_PUT_INCREASE_KIS, doPutIncreaseSearchForKis);
}
