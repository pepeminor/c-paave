import { initAdvisorData } from '../Advisor.action';
import { all, call, select, takeLatest } from 'redux-saga/effects';
import { IState } from 'reduxs/global-reducers';
import { AdvisorFetcher } from '../Advisor.helper';
import APIList from 'config/api';
import { Action } from 'redux';
import { ACCOUNT_TYPE } from 'global';

function* InitAdvisorData(action: Action) {
  if (!initAdvisorData.match(action)) return;
  try {
    const isDemoAccount: boolean = yield select((state: IState) => state.selectedAccount.type === ACCOUNT_TYPE.DEMO);
    if (isDemoAccount) {
      return;
    }
    const advisorList: number[] = yield select((state: IState) => Object.keys(state.Advisor.map));
    for (let index = 0; index < advisorList.length; index += 5) {
      const chunkedAdvisorList = advisorList.slice(index, index + 5);
      yield queryAndUpdateBotDataByChunk(chunkedAdvisorList);
    }
    yield action.meta.callBack?.handleSuccess?.();
  } catch (error) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('InitAdvisorData', error);
    yield action.meta.callBack?.handleFail?.(error);
  }
}

function* queryAndUpdateBotDataByChunk(chunkedAdvisorList: number[]) {
  const performanceParams = {
    roboAdvisors: chunkedAdvisorList,
  };
  const totalViewsParams = {
    userIds: chunkedAdvisorList,
  };

  yield all([
    call(AdvisorFetcher.fetchAdvisorData, APIList.getAdvisorPerformance, performanceParams, 'profitLoss'),
    call(AdvisorFetcher.fetchAdvisorData, APIList.getAdvisorChartData, performanceParams, 'chartData'),
    call(AdvisorFetcher.fetchAdvisorData, APIList.getAdvisorTotalViews, totalViewsParams, 'viewsAndFollowers'),
    call(AdvisorFetcher.fetchFollowingAdvisor),
  ]);
}

export default function* watchInitAdvisorData() {
  yield takeLatest(initAdvisorData.type, InitAdvisorData);
}
