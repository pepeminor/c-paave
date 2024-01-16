import config from 'config';
import { AutoTradeAgreementFile } from 'interfaces/File';
import { call, put, takeLeading } from 'redux-saga/effects';
import { SUCCESS } from 'reduxs/action-type-utils';
import { GET_AUTO_TRADE_AGREEMENT } from 'reduxs/actions';
import { fetchFileAndStore } from 'utils';

const fileName = 'AutoTradeAgreement';

function* fetchAutoTradeAgreement() {
  try {
    const agreementFile: AutoTradeAgreementFile | null = yield call(
      fetchFileAndStore,
      fileName,
      `${config.s3ResourceUrl}/${fileName}.json`
    );
    yield put({
      type: SUCCESS(GET_AUTO_TRADE_AGREEMENT),
      payload: agreementFile,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('fetchAutoTradeAgreement error', err);
  }
}

export default function* watchFetchAgreement() {
  yield takeLeading(GET_AUTO_TRADE_AGREEMENT, fetchAutoTradeAgreement);
}
