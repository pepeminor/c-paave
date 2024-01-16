import { IResponse } from 'interfaces/common';
import { call, put } from 'redux-saga/effects';
import APIList from 'config/api';
import { IAIRatingScore } from 'interfaces/market';
import { IGetAIRatingListParams } from '../AIRating.type';
import { PayloadAction } from '@reduxjs/toolkit';
import { AIRatingActions } from '../AIRating.redux';
import { query } from 'utils';

export function* queryAIDataList(action: PayloadAction<IGetAIRatingListParams>) {
  try {
    const res: IResponse<IAIRatingScore[]> = yield call(query, APIList.getAIRating, action.payload);

    yield put(
      AIRatingActions.getAiRatingListSuccess({
        dataList: res.data,
        top: action.payload.top,
      })
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('fail in query ai rating list', e);
  }
}
