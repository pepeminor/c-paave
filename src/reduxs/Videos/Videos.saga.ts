import { call, put, select, takeEvery } from 'redux-saga/effects';
import APIList from 'config/api';
import { IVideosResponse, VideoTab } from './Videos.type';
import { query } from 'utils';
import { VideosActions, VideosSelectors } from './Videos.redux';
import { PayloadAction } from '@reduxjs/toolkit';

const API_KEY = 'AIzaSyDsUEJdzilxz1Yo0NyxI-LJyYNizXWlEVY'; // API key NHSV google
const PLAYLIST_ID = {
  FULL_VIDEO: 'PLcj2Xyko55PPDXr2lqff0psFIRs4pOqWc', // playListId Youtube channel Paave
  SHORT_VIDEO: 'PLcj2Xyko55PM97gmTOKjj6-PvLSTV4Ezi', // playListId Youtube channel Paave
  EDUCATION: 'PLcj2Xyko55PMNY2Uw7qwFQ74OSiuFCiAN', // playListId Youtube channel Paave
};

function* getVideos(action: PayloadAction<VideoTab>) {
  const storeKey = action.payload;
  try {
    const lengthList: number = yield select(VideosSelectors.selectedVideosListLength(storeKey));
    const totalResults: number = yield select(VideosSelectors.selectedTotalResults(storeKey));
    if (lengthList < totalResults || (lengthList === 0 && totalResults === 0)) {
      const pageToken: string = yield select(VideosSelectors.selectedNextPageToken(storeKey));
      const res: { data: IVideosResponse } = yield call(query, APIList.getVideos, {
        playListId: PLAYLIST_ID[storeKey],
        apiKey: API_KEY,
        pageToken: pageToken,
      });
      yield put(
        VideosActions.getVideosListSuccess({
          ...res.data,
          storeKey,
        })
      );
    }
  } catch (error) {
    yield put(VideosActions.getVideosListFailure(storeKey));
  }
}

export default function* watchGetVideos() {
  yield takeEvery(VideosActions.getVideosListRequest.type, getVideos);
}
