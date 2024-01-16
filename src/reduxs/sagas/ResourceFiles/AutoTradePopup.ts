import config from 'config';
import { AutoTradePopupFile } from 'interfaces/File';
import { all, call, put, takeLeading } from 'redux-saga/effects';
import { SUCCESS } from 'reduxs/action-type-utils';
import { GET_AUTO_TRADE_POPUP } from 'reduxs/actions';
import { fetchFileAndStore } from 'utils';

const fileNames = ['AutoTradePopup', 'RoboAdvisorPopup'];

function* fetchAutoTradePopup() {
  try {
    const [aiRating, advisor] = (yield all(
      fileNames.map(fileName => call(fetchFileAndStore, fileName, `${config.s3ResourceUrl}/${fileName}.json`))
    )) as [AutoTradePopupFile, AutoTradePopupFile];
    yield put({
      type: SUCCESS(GET_AUTO_TRADE_POPUP),
      payload: {
        advisor,
        aiRating,
      },
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('fetchAutoTradePopup error', err);
  }
}

export default function* watchFetchAutoTradePopup() {
  yield takeLeading(GET_AUTO_TRADE_POPUP, fetchAutoTradePopup);
}
