import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ISymbolData } from 'interfaces/market';
import { IResponse, ToolkitAction } from 'interfaces/common';
import { IState } from 'reduxs/global-reducers';
import { query, deepMapFields, retrySaga, formatOrdinalNumber } from 'utils';
import APIList from 'config/api';
import { SymbolType } from 'constants/enum';
import { SymbolDataHelper } from '../SymbolData.helper';
import { LoadSymbolListReturn } from '../SymbolData.type';
import { MapSymbolFieldSchema, marketSymbolSchema } from '../SymbolData.schema';
import config from 'config';
import { initMarket } from '../SymbolData.action';
import { LoadingAndErrorActions } from 'reduxs/LoadingAndError';
import i18next from 'i18next';
import { LANG } from 'global';

const DEBUG_INIT_MARKET = config.debugFlag.marketData;

function* handleInitMarket(action: ToolkitAction<boolean | undefined>) {
  const currentModified: string | null = yield select((state: IState) => state.SymbolData.marketData.latestModified);
  const result: LoadSymbolListReturn = yield call(SymbolDataHelper.loadSymbolList, currentModified, action.payload);

  if (result.symbolList == null) {
    const response: IResponse<ISymbolData[]> = yield call(query, APIList.symbolList);
    if (response) {
      result.symbolList = response.data;
    }
  }

  const { symbolList: unFormattedSymbolList, latestModified } = result;
  if (unFormattedSymbolList == null) return;

  const symbolMap = {} as Record<string, unknown>;
  const stockList = [] as unknown[];
  const cwList = [] as unknown[];
  const futuresList = [] as unknown[];
  const indexList = [] as unknown[];
  const symbolList = [] as unknown[];
  const bondList = [] as unknown[];

  unFormattedSymbolList.forEach(item => {
    const mappedItem = deepMapFields(item, MapSymbolFieldSchema.MarketData);
    const isMarketSymbol = marketSymbolSchema.safeParse(mappedItem);
    if (isMarketSymbol.success) {
      symbolMap[isMarketSymbol.data.symbolCode] = isMarketSymbol.data;
      symbolList.push(isMarketSymbol.data);
      switch (isMarketSymbol.data.symbolType) {
        case SymbolType.CW:
          cwList.push(mappedItem);
          break;
        case SymbolType.FUTURES:
          futuresList.push(mappedItem);
          break;
        case SymbolType.INDEX:
          indexList.push(mappedItem);
          break;
        case SymbolType.STOCK:
        case SymbolType.ETF:
        case SymbolType.FUND:
          stockList.push(mappedItem);
          break;
        case SymbolType.BOND:
          bondList.push(mappedItem);
          break;
        default:
          break;
      }
    } else {
      if (DEBUG_INIT_MARKET && __DEV__) {
        // eslint-disable-next-line no-console
        console.log('Error validating symbol', mappedItem, isMarketSymbol.error.errors);
      }
    }
  });

  // --- Start Handle Special Case
  symbolMap.VNINDEX = symbolMap.VN;
  // --- End Handle Special Case

  yield put({
    type: initMarket.fulfilled,
    payload: {
      marketData: {
        symbolList,
        stockList,
        cwList,
        futuresList,
        indexList,
        bondList,
        symbolMap,
        latestModified,
      },
    },
  });

  const numberFormatter: NumberFormatter = yield getFormatter();
  yield put(
    LoadingAndErrorActions.removeImportanceMessage([
      i18next.t('message.initMarketRetry', { retryTimes: numberFormatter(1) }),
      i18next.t('message.initMarketRetry', { retryTimes: numberFormatter(2) }),
      i18next.t('message.initMarketRetry', { retryTimes: numberFormatter(3) }),
    ])
  );
}
type NumberFormatter = (number: number) => string;

function* getFormatter() {
  const lang: LANG = yield select((state: IState) => state.lang);
  const formatter: NumberFormatter = lang === LANG.EN ? formatOrdinalNumber : number => `${number}`;
  return formatter;
}

export function* watchInitMarket() {
  yield takeLatest(
    initMarket.type,
    retrySaga(handleInitMarket, {
      *onRetry(retryTimes: number) {
        const numberFormatter: NumberFormatter = yield getFormatter();
        yield put(
          LoadingAndErrorActions.addImportanceMessage([
            i18next.t('message.initMarketRetry', { retryTimes: numberFormatter(retryTimes) }),
          ])
        );
        yield put(
          LoadingAndErrorActions.removeImportanceMessage([
            i18next.t('message.initMarketRetry', { retryTimes: numberFormatter(retryTimes - 1) }),
          ])
        );
      },
      *onFail() {
        const numberFormatter: NumberFormatter = yield getFormatter();
        yield put(LoadingAndErrorActions.addErrorMessage(i18next.t('error.initMarketFailed')));
        yield put(
          LoadingAndErrorActions.removeImportanceMessage([
            i18next.t('message.initMarketRetry', { retryTimes: numberFormatter(1) }),
            i18next.t('message.initMarketRetry', { retryTimes: numberFormatter(2) }),
            i18next.t('message.initMarketRetry', { retryTimes: numberFormatter(3) }),
          ])
        );
      },
    })
  );
}
