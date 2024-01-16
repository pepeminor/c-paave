import APIList from 'config/api';
import { PeriodType } from 'constants/enum';
import { IAction, IResponse } from 'interfaces/common';
import { IGetSymbolPeriodMasResponse } from 'interfaces/market';
import { ReducerStatus } from 'interfaces/reducer';
import { call, put, takeEvery } from 'redux-saga/effects';
import { INDEX_INFO_ENTER_SCREEN, INDEX_INFO_REDUCER_UPDATE } from 'reduxs/actions';
import { queryIndexRankAndSubscribe } from 'reduxs/global-actions/IndexInfo';
import { isHighLightIndex } from 'screens/IndexInfo';
import { CompositionOption } from 'screens/IndexInfo/TabDataSection/CompositionSection';
import { query, formatDateToString, formatTimeToDisplay } from 'utils';

function* handleOnEnterScreen(action: IAction<string>) {
  if (action.payload != null && isHighLightIndex(action.payload)) {
    yield put(queryIndexRankAndSubscribe({ option: CompositionOption.TRADING_VOLUME, symbolCode: action.payload }));
    yield queryHistoricSymbolList(action.payload);
  }
}

export function* queryHistoricSymbolList(symbolCode: string) {
  const param = {
    symbol: symbolCode,
    periodType: PeriodType.DAILY,
    baseDate: formatDateToString(new Date()) || undefined,
  };
  try {
    const response: IResponse<IGetSymbolPeriodMasResponse[]> = yield call(query, APIList.symbolPeriodMas, param);
    let data: IGetSymbolPeriodMasResponse[] = response.data;
    if (data != null) {
      data = data.filter(item => {
        const itemDateFormat = formatTimeToDisplay(item.d, 'yyyy-MM-dd', 'yyyyMMdd', true);

        if (itemDateFormat != null) {
          const oneMonthAgo = new Date().setDate(new Date().getDate() - 30);
          const itemDay = new Date(itemDateFormat).getDay();
          const itemDateTime = new Date(itemDateFormat).getTime();
          return itemDateTime >= oneMonthAgo && itemDay != 0 && itemDay != 6; // saturday = 6, sunday = 0
        }
        return item != null;
      });
    }

    yield put({
      type: INDEX_INFO_REDUCER_UPDATE,
      payload: {
        historicalData: {
          data,
          status: ReducerStatus.SUCCESS,
        },
      },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('fail in query', 'historicalData', err);
  }
}

export default function* watchOnEnterScreen() {
  yield takeEvery(INDEX_INFO_ENTER_SCREEN, handleOnEnterScreen);
}
