import { call, put, select, takeLatest } from 'redux-saga/effects';
import { query } from 'utils';
import APIList from 'config/api';
import { IResponse, ToolkitAction } from 'interfaces/common';
import { getThemeDetail } from '../StockTheme.action';
import { ThemeDetailParams, ThemeListDetailResponse } from 'interfaces/stockTheme';
import { ThemeDetailFulfilledPayload, WithThemePeriod } from '../StockTheme.type';
import { IState } from 'reduxs/global-reducers';
import { ACCOUNT_TYPE } from 'global';

function* doGetThemeDetail(action: ToolkitAction<ThemeDetailParams>) {
  try {
    const isDemo: boolean = yield select((state: IState) => state.selectedAccount.type === ACCOUNT_TYPE.DEMO);
    if (isDemo) {
      return;
    }
    const { data }: IResponse<ThemeListDetailResponse> = yield call(query, APIList.getThemeStockList, action.payload);
    yield put({
      type: getThemeDetail.fulfilled,
      payload: {
        period: action.payload.period ?? '1D',
        data: {
          themeName: action.payload.themeName,
          themeList: data.themeStockList,
        },
      } as WithThemePeriod<ThemeDetailFulfilledPayload>,
    });
    yield action.meta.callBack?.handleSuccess?.(data.themeStockList);
  } catch (error) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('GetThemeDetailError', error);
  }
}

export function* watchGetThemeDetail() {
  yield takeLatest(getThemeDetail.type, doGetThemeDetail);
}
