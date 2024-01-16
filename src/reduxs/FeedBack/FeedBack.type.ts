import { IActionCallBack } from 'interfaces/common';
import { ReducerStatus } from 'interfaces/reducer';

export interface IPostNewFeedbackRequest {
  message: string;
  rating: number;
  deviceId: string;
  appVersion: string;
  callback: IActionCallBack;
  userId: number;
}

export interface IPostNewFeedbackResponse {
  id: number;
  status: string;
}

export interface IPostNewFeedbackData {
  userId: number;
}

export interface IInitialState {
  feedBack: {
    data: IPostNewFeedbackData;
    status: ReducerStatus;
  };
  timeFeedbackPrevious: { [key: string]: number };
}
