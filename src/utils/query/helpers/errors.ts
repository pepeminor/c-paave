import { IError } from 'interfaces/common';
import { Requester } from '../requester';

export class RequestError<R, P> extends Error {
  requester?: Requester<R, P>;
  response?: Response;

  constructor(message: string, requester?: Requester<R, P>, response?: Response) {
    super(message);
    this.requester = requester;
    this.response = response;
  }
}

export class FulfilledRequestError<R, P> extends RequestError<R, P> {
  requester: Requester<R, P>;
  response: Response;
  data: IError;

  constructor(message: string, requester: Requester<R, P>, response: Response, data: IError = {}) {
    super(message, requester, response);
    this.requester = requester;
    this.response = response;
    this.data = data;
  }
}

export const CommonError = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  LOGIN_REQUIRED: 'LOGIN_REQUIRED',
  SUB_ID_REQUIRED: 'SUB_ID_REQUIRED',
  NETWORK_REQUEST_FAILED: 'NETWORK_REQUEST_FAILED',
  TIMEOUT: 'TIMEOUT',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  OTP_TOKEN_IS_EXPIRED: 'OTP_TOKEN_IS_EXPIRED',
  OTP_TOKEN_IS_REQUIRED: 'OTP_TOKEN_IS_REQUIRED',
  TOKEN_ERROR: 'TOKEN_ERROR',
  OBJECT_NOT_FOUND: 'OBJECT_NOT_FOUND',
  OPJECT_NOT_FOUND: 'OPJECT_NOT_FOUND',
  SUB_ACCOUNT_IS_DISABLED: 'SUB_ACCOUNT_IS_DISABLED',
  CANNOT_PLACE_ORDER_WITH_DISABLED_SUBACCOUNT: 'CANNOT_PLACE_ORDER_WITH_DISABLED_SUBACCOUNT',
  BIOMETRIC_ACTIVE_ON_ANOTHER_DEVICE: 'BIOMETRIC_ACTIVE_ON_ANOTHER_DEVICE',
  INVALID_OWNERSHIP_STOCK: 'INVALID_OWNERSHIP_STOCK',
  REQUEST_ERROR: 'REQUEST_ERROR',
  SESSION_EXPIRED: 'SESSION_EXPIRED',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  LOGIN_KIS_REQUIRED: 'LOGIN_KIS_REQUIRED',
  URI_NOT_FOUND: 'URI_NOT_FOUND',
  REQUEST_ABORTED: 'REQUEST_ABORTED',
};
