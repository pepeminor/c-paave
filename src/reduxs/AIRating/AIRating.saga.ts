import { call, put, takeLeading, takeEvery } from 'redux-saga/effects';
import { IResponse } from 'interfaces/common';
import { IAIRatingScore, IAIRatingChartDataResponse, IInOutAIRatingResponse } from 'interfaces/market';
import { query, formatDateToString, insertObjectIf } from 'utils';
import APIList from 'config/api';
import { AIRatingActions } from './AIRating.redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { IAIRatingDataParams } from './AIRating.type';
import { ITimePicker } from 'screens/AIRatingScreen/constants';
import GetAiRatingInOut from './sagas/GetAiRatingInOut';
import { queryAIDataList } from './sagas/GetAiRatingList';

function* queryAIData(action: PayloadAction<IAIRatingDataParams>) {
  try {
    const { top, period, date, isInit } = action.payload;
    //get Data Chart AIRating
    const paramsAIRatingDataChart = {
      top,
      period,
    };
    const aiRatingDataChart: IResponse<IAIRatingChartDataResponse[]> = yield call(
      query,
      APIList.chartRatingData,
      paramsAIRatingDataChart
    );

    // const aiRatingData = aiRatingDataChart.data.filter((_, i) => i % 2 === 0);
    const aiRatingData = aiRatingDataChart.data;

    const [dataRating, dataIndex, labelList, MaxRating, MinRating, MaxIndex, MinIndex] = aiRatingData.reduce(
      (pre, curr) => {
        const pointRating = (curr.aiRating - 1) * 100;
        const pointIndex = (curr.vnIndex - 1) * 100;

        pre[0].push(pointRating);
        pre[1].push(pointIndex);
        pre[2].push(
          formatDateToString(
            new Date(curr.date),
            action.payload.period === ITimePicker.ALL || action.payload.period === ITimePicker.ONE_YEAR
              ? 'MM/yy'
              : 'dd/MM'
          ) ?? ''
        );

        //Max & Min Rating
        pre[3] = Math.max(pre[3], pointRating);
        pre[4] = Math.min(pre[4], pointRating);

        //Max & Min Index
        pre[5] = Math.max(pre[5], pointIndex);
        pre[6] = Math.min(pre[6], pointIndex);

        return pre;
      },
      [[], [], [], 0, 0, 0, 0] as [number[], number[], string[], number, number, number, number]
    );
    yield put(
      AIRatingActions.getAIRatingDataChartSuccess({
        top,
        dataIndex: {
          dataLine: dataIndex,
          labelList: labelList,
          yMax: MaxRating,
          yMin: MinRating,
        },
        dataRating: {
          dataLine: dataRating,
          labelList: labelList,
          yMax: MaxIndex,
          yMin: MinIndex,
        },
      })
    );

    //init AIRating
    const paramsAIRatingData = {
      start: 0,
      limit: -1,
      sort: 'rank:asc',
      date: '',
      filter: {},
    };
    const aiRatingList: IResponse<IAIRatingScore[]> = yield isInit &&
      call(query, APIList.getAIRating, paramsAIRatingData);

    //init InOutRating
    const paramsInOut = {
      top,
      date: isInit ? formatDateToString(new Date(aiRatingList.data[0].date), 'yyyyMMdd') || '' : date || '',
    };
    const aiRatingInOut: IResponse<IInOutAIRatingResponse> = yield call(query, APIList.inOutAIRating, paramsInOut);

    yield put(
      AIRatingActions.getAIRatingSuccess({
        top,
        inOutRating: { in: aiRatingInOut.data.in, out: aiRatingInOut.data.out },
        ...insertObjectIf(isInit, { dataList: aiRatingList.data }),
      })
    );

    yield action.payload.callback?.();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('fail in query ai rating data', e);
    yield action.payload.callback?.(e);

    yield put(
      AIRatingActions.getAIRatingFailed({
        top: action.payload.top,
      })
    );
  }
}

export function* AIRatingSagas() {
  yield takeEvery(AIRatingActions.getAIRating.type, queryAIData);
  yield takeLeading(AIRatingActions.getAiRatingList.type, queryAIDataList);
  yield GetAiRatingInOut();
}
