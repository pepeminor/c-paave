import config from 'config';
import { BannerFile } from 'interfaces/File';
import { call, put, takeLeading } from 'redux-saga/effects';
import { SUCCESS } from 'reduxs/action-type-utils';
import { GET_BANNER_LIST } from 'reduxs/actions';
import { fetchFileAndStore } from 'utils';

const fileName = 'banner-control';

function* fetchBanners() {
  try {
    const bannerFile: BannerFile | null = yield call(
      fetchFileAndStore,
      fileName,
      `${config.s3ResourceUrl}/${fileName}.json`
    );
    yield put({
      type: SUCCESS(GET_BANNER_LIST),
      payload: bannerFile,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('fetchBanners error', err);
  }
}

export default function* watchFetchContest() {
  yield takeLeading(GET_BANNER_LIST, fetchBanners);
}
