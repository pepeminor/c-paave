import config from 'config';
import { TKisInfoModal } from 'interfaces/File';
import { IAction } from 'interfaces/common';
import { call, put, takeLeading } from 'redux-saga/effects';
import { SUCCESS } from 'reduxs/action-type-utils';
import { GET_KIS_INFO_MODAL } from 'reduxs/actions';
import { fetchFileAndStore } from 'utils/fetchFiles';

const fileName = 'kisleaderboard-noti';

function* fetchKisInfoModal(action: IAction<null>) {
  try {
    const contestFile: TKisInfoModal | null = yield call(
      fetchFileAndStore,
      fileName,
      `${config.s3ResourceUrl}/${fileName}.json`
    );
    yield put({
      type: SUCCESS(GET_KIS_INFO_MODAL),
      payload: contestFile,
    });
    if (action.callBack != null && action.callBack.handleSuccess != null) {
      action.callBack.handleSuccess();
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('fetchKisInfoModal error', err);
  }
}

export default function* watchFetchKisInfoModal() {
  yield takeLeading(GET_KIS_INFO_MODAL, fetchKisInfoModal);
}
