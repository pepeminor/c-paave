import { all, call, fork } from 'redux-saga/effects';
import { LocalizationSagas } from 'reduxs';
import watchFetchHolidays from './ResourceFiles/Holidays';
import watchFetchBotData from './ResourceFiles/BotData';
import watchFetchAgreement from './ResourceFiles/AutoTradeAgreement';
import watchFetchAutoTradePopup from './ResourceFiles/AutoTradePopup';
import watchFetchFeatureConfiguration from './ResourceFiles/FeatureConfiguration';
import { watchGetLastTradingDate } from './Market/GetLastTradingDate';
import { watchInitMarket } from 'reduxs/SymbolData/sagas/InitMarket.saga';
import { watchGetIndicesStockList } from 'reduxs/SymbolData/sagas/GetIndicesStockList.saga';

const sagas = [
  LocalizationSagas,
  watchFetchHolidays,
  watchFetchBotData,
  watchFetchAgreement,
  watchFetchAutoTradePopup,
  watchFetchFeatureConfiguration,
  watchGetLastTradingDate,
  watchInitMarket,
  watchGetIndicesStockList,
];

export function* unCancelableSaga() {
  yield all(
    sagas.map(saga =>
      fork(function* () {
        while (true) {
          try {
            yield call(saga);
          } catch (e) {
            // eslint-disable-next-line no-console
            console.log('Saga error', saga.name, e);
          }
        }
      })
    )
  );
}
