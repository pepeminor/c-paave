import { call, put, select, takeLatest } from 'redux-saga/effects';
import { query } from 'utils';
import APIList from 'config/api';
import { IResponse, ToolkitAction } from 'interfaces/common';
import { getThemeRatioDetail } from '../StockTheme.action';
import { ThemeRatioDetailParams, ThemeRatioDetailResponse } from 'interfaces/stockTheme';
import { IState } from 'reduxs/global-reducers';
import { ACCOUNT_TYPE } from 'global';
import { StockThemeActions } from '../StockTheme.redux';

function* doGetThemeRatioDetail(action: ToolkitAction<ThemeRatioDetailParams>) {
  try {
    const isDemo: boolean = yield select((state: IState) => state.selectedAccount.type === ACCOUNT_TYPE.DEMO);
    if (isDemo) {
      return;
    }
    const {
      data: { themeStockList, avgPE, avgPB },
    }: IResponse<ThemeRatioDetailResponse> = yield call(query, APIList.getThemeStockRatio, action.payload);
    yield put(StockThemeActions.updateThemeRatio({ [action.payload.themeCode]: themeStockList }));
    yield put(StockThemeActions.updateThemeAvgRatio({ [action.payload.themeCode]: { avgPE, avgPB } }));
    const stockData = themeStockList.reduce((acc, cur) => {
      acc[cur.code] = {
        rate: cur.r,
      };
      return acc;
    }, {} as any);
    yield action.meta.callBack?.handleSuccess?.(stockData);
    yield put(
      StockThemeActions.updateThemeMap({
        period: action.payload.period ?? '1D',
        data: {
          [action.payload.themeName]: {
            stockData,
          },
        },
      } as any)
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('GetThemeRatioDetailError', error);
  }
}

export function* watchGetThemeRatioDetail() {
  yield takeLatest(getThemeRatioDetail.type, doGetThemeRatioDetail);
}
