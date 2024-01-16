import { NOTIFICATION_GET_ACCOUNT_NOTIFICATION } from '../../actions';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { query } from 'utils';
import { put, select, takeEvery } from 'redux-saga/effects';
import { IAccountNotificationParams, IAccountNotificationResponse } from 'interfaces/notification';
import { getNumberOfUnreadNotification } from 'reduxs/global-actions';
import { IState } from 'reduxs/global-reducers';
import { NotificationCategories } from 'reduxs/Notification';

function* doGetAccountNotification(action: IAction<IAccountNotificationParams>) {
  try {
    const { data }: IResponse<IAccountNotificationResponse> = yield query(APIList.accountNotification, action.payload);
    if (action.payload.category === NotificationCategories.MarketInfo) {
      // Handle read notification locally for market info notification
      const localRead: Record<number, boolean> = yield select(
        (state: IState) => state.userBasedReducer.data.readNotification ?? {}
      );
      const lastId: number = yield select((state: IState) => state.userBasedReducer.data.latestReadNotificationId ?? 0);
      data.list.forEach(item => {
        if (localRead[item.id] || item.id <= lastId) {
          item.read = true;
        }
      });
    }
    yield put({
      type: action.response?.success,
      payload: data.list,
    });
    yield put(getNumberOfUnreadNotification(null));
    yield action.callBack?.handleSuccess?.(data.list);
  } catch (error) {
    yield put({
      type: action.response?.fail,
      hideLoading: true,
    });
  }
}

export default function* watchGetAccountNotification() {
  yield takeEvery(NOTIFICATION_GET_ACCOUNT_NOTIFICATION, doGetAccountNotification);
}
