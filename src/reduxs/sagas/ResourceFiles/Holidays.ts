import config from 'config';
import { HolidayFile } from 'interfaces/File';
import { all, call, put, takeLeading } from 'redux-saga/effects';
import { SUCCESS } from 'reduxs/action-type-utils';
import { GET_HOLIDAY_LIST } from 'reduxs/actions';
import { fetchFileAndStore } from 'utils';

function* fetchHolidays() {
  try {
    const holidaysFileList = ['holidays2022', 'holidays'];
    const resultList: HolidayFile[] = yield all(
      holidaysFileList.map(fileName => call(fetchFileAndStore, fileName, `${config.s3ResourceUrl}/${fileName}.json`))
    );
    const holidayList = resultList.filter(item => item != null).flatMap(item => item);
    yield put({
      type: SUCCESS(GET_HOLIDAY_LIST),
      payload: holidayList,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('fetchHolidays error', err);
  }
}

export default function* watchFetchHolidays() {
  yield takeLeading(GET_HOLIDAY_LIST, fetchHolidays);
}
