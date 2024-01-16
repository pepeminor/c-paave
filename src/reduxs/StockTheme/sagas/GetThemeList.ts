import { call, put, select, takeLatest } from 'redux-saga/effects';
import { formatDateToString, formatStringToDate, query } from 'utils';
import APIList from 'config/api';
import { IResponse, ToolkitAction } from 'interfaces/common';
import { getThemeList } from '../StockTheme.action';
import { ThemeData, ThemeListParams, ThemeListResponse } from 'interfaces/stockTheme';
import { DiscoverActions, StockThemeActions } from 'reduxs';
import { IState } from 'reduxs/global-reducers';
import { ACCOUNT_TYPE } from 'global';

function* doGetThemeList(action: ToolkitAction<ThemeListParams>) {
  try {
    const isDemo: boolean = yield select((state: IState) => state.selectedAccount.type === ACCOUNT_TYPE.DEMO);
    if (isDemo) {
      return;
    }
    const API = action.payload?.symbol ? APIList.getStockThemeList : APIList.getThemeList;
    const period = action.payload?.period ?? '1D';
    const { data }: IResponse<ThemeListResponse> = yield call(query, API, action.payload);
    if (action.payload?.symbol != null) {
      yield put(
        StockThemeActions.updateThemeOfStock({
          period,
          data: {
            [action.payload.symbol]: data.themeData,
          },
        })
      );
      yield put(
        StockThemeActions.updateThemeMap({
          period,
          data: data.themeData.reduce((acc, cur) => {
            acc[cur.themeName] = cur;
            return acc;
          }, {} as Record<string, ThemeData>),
        })
      );
      return;
    }
    const mappedData = data.themeData.reduce((acc, cur) => {
      acc[cur.themeName] = cur;
      return acc;
    }, {} as Record<string, ThemeData>);
    yield put({
      type: getThemeList.fulfilled,
      payload: {
        period,
        data: mappedData,
      },
    });
    const listDate = data.themeData.map(item => formatStringToDate(item.updatedDate, 'yyyyMMddHHmmss').getTime());
    if (listDate.length > 0) {
      const lastUpdateTime = formatDateToString(new Date(Math.max(...listDate)), 'yyyyMMddHHmmss');
      yield lastUpdateTime && put(StockThemeActions.updateLastUpdateTime(lastUpdateTime));
    }
    yield put(DiscoverActions.refreshDiscoverScreenFinish({ refreshStockThemeFinish: true }));
    yield action.meta.callBack?.handleSuccess?.(mappedData);
  } catch (error) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('GetThemeListError', error);
  }
}

export function* watchGetThemeList() {
  yield takeLatest(getThemeList.type, doGetThemeList);
}
