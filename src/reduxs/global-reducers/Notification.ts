import { IAction } from 'interfaces/common';
import { IAccountNotificationListResponse, INumberOfUnreadNotificationResponse } from 'interfaces/notification';
import { ILoadingReducer, ReducerStatus } from 'interfaces/reducer';
import { FAILURE, RESET, SUCCESS } from 'reduxs/action-type-utils';
import { NOTIFICATION_GET_ACCOUNT_NOTIFICATION, NOTIFICATION_GET_NUMBER_OF_UNREAD } from 'reduxs/actions';

export function AccountNotificationList(
  state: ILoadingReducer<IAccountNotificationListResponse[] | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IAccountNotificationListResponse[]>
): ILoadingReducer<IAccountNotificationListResponse[] | null> {
  switch (action.type) {
    case NOTIFICATION_GET_ACCOUNT_NOTIFICATION:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(NOTIFICATION_GET_ACCOUNT_NOTIFICATION):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(NOTIFICATION_GET_ACCOUNT_NOTIFICATION):
      return { data: null, status: ReducerStatus.FAILED };
    case RESET(NOTIFICATION_GET_ACCOUNT_NOTIFICATION):
      return { data: null, status: ReducerStatus.LOADING };
    default:
      return state;
  }
}

export function NumberOfUnreadNotification(
  state: ILoadingReducer<INumberOfUnreadNotificationResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<INumberOfUnreadNotificationResponse>
): ILoadingReducer<INumberOfUnreadNotificationResponse | null> {
  switch (action.type) {
    case NOTIFICATION_GET_NUMBER_OF_UNREAD:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(NOTIFICATION_GET_NUMBER_OF_UNREAD):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(NOTIFICATION_GET_NUMBER_OF_UNREAD):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}
