import { INotificationOption } from 'constants/enum';

/* Account Notification */
export interface IAccountNotificationParams {
  option?: INotificationOption;
  pageSize?: number;
  pageNumber?: number;
  category?: string;
  type?: string;
}

export interface IAccountNotificationListResponse {
  id: number;
  date: string;
  title: string;
  titleVi?: string;
  contentVi: string;
  contentEn: string;
  type: string;
  read: boolean;
}

export interface IAccountNotificationResponse {
  list: IAccountNotificationListResponse[];
}

/* Notify MarkAsRead */
export interface INotificationMarkAsReadParams {
  notificationId?: number[];
  lastId?: number;
}

export interface INotificationMarkAsReadResponse {
  userId: number;
}

/* Delete notification */
export interface IDeleteNotificationParams {
  notificationId?: number | number[];
}

export interface IDeleteNotificationResponse {
  userId: number;
  message: string;
}

export interface INumberOfUnreadNotificationResponse {
  countedUnread: number;
}

export interface INotifyOtpPartner {
  forceSMS: boolean;
  matrixId: number;
  partnerId: string;
}

export interface ISendNotificationPreferenceParams {
  notificationInfoList: {
    notificationType: string;
    mode: string;
  }[];
}

export interface ISendNotificationPreferenceSuccess {
  data: any;
}
