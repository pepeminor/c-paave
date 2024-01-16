import { NOTIFICATION_PUT_MARK_AS_READ } from '../../actions';
import { IAction } from 'interfaces/common';
import APIList from 'config/api';
import { query } from 'utils';
import { put, select, takeEvery } from 'redux-saga/effects';
import { INotificationMarkAsReadParams } from 'interfaces/notification';
import { getNumberOfUnreadNotification, putMarkAsReadNotificationLocal } from 'reduxs/global-actions';
import { IState } from 'reduxs/global-reducers';

function* doPutMarkAsReadNotification(action: IAction<INotificationMarkAsReadParams>) {
  try {
    const isMarketTab: boolean = yield select((state: IState) => state.Notification.tab === 'MarketInfo');
    if (isMarketTab) {
      yield put(putMarkAsReadNotificationLocal(action.payload));
    } else {
      yield doPutMarkAsReadNotificationBE(action);
    }
  } catch (error) {
    //
  }
}

function* doPutMarkAsReadNotificationBE(action: IAction<INotificationMarkAsReadParams>) {
  try {
    yield query(APIList.NotificationMarkAsRead, action.payload);
    if (action.response) {
      yield put({
        type: action.response.success,
        hideLoading: true,
      });
    }
    yield put(getNumberOfUnreadNotification(null));
  } catch (error) {
    if (action.response) {
      yield put({
        type: action.response.fail,
        hideLoading: true,
      });
    }
  }
}

export default function* watchPutMarkAsReadNotification() {
  yield takeEvery(NOTIFICATION_PUT_MARK_AS_READ, doPutMarkAsReadNotification);
}
