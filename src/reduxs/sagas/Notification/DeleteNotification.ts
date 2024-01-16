import { NOTIFICATION_GET_ACCOUNT_NOTIFICATION, NOTIFICATION_PUT_DELETE } from '../../actions';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';
import { put, select } from 'redux-saga/effects';
import {
  IAccountNotificationListResponse,
  IDeleteNotificationParams,
  IDeleteNotificationResponse,
} from 'interfaces/notification';
import { SUCCESS } from 'reduxs/action-type-utils';
import { getNumberOfUnreadNotification } from 'reduxs/global-actions';
import { IState } from 'reduxs/global-reducers';

function* handlePutDeleteNotificationSuccess(
  response: IResponse<IDeleteNotificationResponse>,
  action: IAction<IDeleteNotificationParams>
) {
  if (action.response && response.data) {
    yield put({
      type: action.response.success,
      hideLoading: true,
    });
    const notificationList: IAccountNotificationListResponse[] | null = yield select(
      (state: IState) => state.accountNotificationList.data
    );
    if (notificationList != null) {
      const notificationId = notificationList.findIndex(item => item.id === action.payload.notificationId);
      notificationList.splice(notificationId, 1);
      yield put({
        type: SUCCESS(NOTIFICATION_GET_ACCOUNT_NOTIFICATION),
        payload: notificationList.slice(),
      });
    }
    yield put(getNumberOfUnreadNotification(null));
    action.callBack?.handleSuccess && action.callBack?.handleSuccess();
  }
}

function* handlePutDeleteNotificationFailed(action: IAction<IDeleteNotificationParams>) {
  if (action.response) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<IDeleteNotificationParams, IDeleteNotificationResponse>(
  APIList.NotificationDelete,
  NOTIFICATION_PUT_DELETE,
  handlePutDeleteNotificationSuccess,
  handlePutDeleteNotificationFailed
);
