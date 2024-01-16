import { NOTIFICATION_GET_NUMBER_OF_UNREAD } from '../../actions';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { createNormalApiQuerySaga } from 'utils';
import { put } from 'redux-saga/effects';
import { INumberOfUnreadNotificationResponse } from 'interfaces/notification';

function* handleSuccess(response: IResponse<INumberOfUnreadNotificationResponse>, action: IAction<null>) {
  if (action.response && response.data) {
    yield put({
      type: action.response.success,
      payload: response.data,
      hideLoading: true,
    });
  }
}

function* handleFailed(action: IAction<null>) {
  if (action.response) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<null, INumberOfUnreadNotificationResponse>(
  APIList.NotificationNumberGetOfUnread,
  NOTIFICATION_GET_NUMBER_OF_UNREAD,
  handleSuccess,
  handleFailed
);
