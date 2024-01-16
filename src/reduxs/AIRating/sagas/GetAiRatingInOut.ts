import { put } from 'redux-saga/effects';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';
import { IInOutAIRatingParams, IInOutAIRatingResponse } from '../AIRating.type';
import { AIRatingActions } from '../AIRating.redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { IResponse } from 'interfaces/common';

function* handleSuccess(response: IResponse<IInOutAIRatingResponse>, action: PayloadAction<IInOutAIRatingParams>) {
  yield put(
    AIRatingActions.getAiRatingInOutSuccess({
      data: {
        in: response.data.in,
        out: response.data.out,
      },
      top: action.payload.top,
    })
  );
}

export default createNormalApiQuerySaga<IInOutAIRatingParams, IInOutAIRatingResponse>(
  APIList.inOutAIRating,
  AIRatingActions.getAiRatingInOut.type,
  handleSuccess
);
