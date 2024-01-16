import { MARKET_GET_AI_RATING_SCORE } from './../../actions';
import { IAction, IResponse } from 'interfaces/common';
import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';
import { IAIRatingScore, IGetAIRatingScoreParams } from 'interfaces/market';

function* handleSuccess(response: IResponse<IAIRatingScore[]>, action: IAction<IGetAIRatingScoreParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.success,
      payload: response.data,
    });
  }
}

function* handleFail(action: IAction<IGetAIRatingScoreParams>) {
  if (action.response != null) {
    yield put({
      type: action.response.fail,
    });
  }
}

export default createNormalApiQuerySaga<IGetAIRatingScoreParams, IAIRatingScore[]>(
  APIList.getAIRating,
  MARKET_GET_AI_RATING_SCORE,
  handleSuccess,
  handleFail
);
