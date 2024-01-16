import config from 'config';
import { FeatureConfigurationFile } from 'interfaces/File';
import { IAction } from 'interfaces/common';
import { call, put, takeLeading } from 'redux-saga/effects';
import { SUCCESS } from 'reduxs/action-type-utils';
import { FEATURE_CONFIGURATION } from 'reduxs/actions';
import { fetchFileAndStore } from 'utils';

const fileName = 'featureConfiguration';

function* fetchFeatureConfiguration(action: IAction<null>) {
  try {
    const file: FeatureConfigurationFile | null = yield call(
      fetchFileAndStore,
      fileName,
      `${config.s3ResourceUrl}/${fileName}.json`
    );
    yield put({
      type: SUCCESS(FEATURE_CONFIGURATION),
      payload: file,
    });
    yield action.callBack?.handleSuccess?.();
  } catch (err) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('fetchFeatureConfiguration error', err);
  }
}

export default function* watchFetchFeatureConfiguration() {
  yield takeLeading(FEATURE_CONFIGURATION, fetchFeatureConfiguration);
}
