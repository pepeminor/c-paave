import { IAction } from 'interfaces/common';
import { ILoadingReducer, ReducerStatus } from 'interfaces/reducer';
import {
  IGetAccountInfo,
  IGetAccountInfoResponse,
  IGetKisAccountInfoResponse,
  IUserUpdateEmailParams,
  IUserUpdateResponse,
} from 'interfaces/user';
import { FAILURE, SUCCESS, RESET } from 'reduxs/action-type-utils';
import {
  USER_ACCOUNT_INFO,
  USER_KIS_ACCOUNT_INFO,
  USER_UPDATE_EMAIL,
  USER_UPDATE_FULLNAME,
  USER_ACCOUNT_BIO,
} from 'reduxs/actions';

export function GetUserAccountInfo(
  state: ILoadingReducer<IGetAccountInfo | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IGetAccountInfoResponse>
): ILoadingReducer<IGetAccountInfo | null> {
  switch (action.type) {
    case USER_ACCOUNT_INFO:
      return { ...state, status: ReducerStatus.LOADING };
    case RESET(USER_ACCOUNT_INFO):
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(USER_ACCOUNT_INFO):
      return {
        data: action.payload != null ? { ...state.data, ...action.payload } : null,
        status: ReducerStatus.SUCCESS,
      };
    case FAILURE(USER_ACCOUNT_INFO):
      return { ...state, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function GetUserKisAccountInfo(
  state: ILoadingReducer<IGetKisAccountInfoResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IGetKisAccountInfoResponse>
): ILoadingReducer<IGetKisAccountInfoResponse | null> {
  switch (action.type) {
    case USER_KIS_ACCOUNT_INFO:
      return { ...state, status: ReducerStatus.LOADING };
    case RESET(USER_KIS_ACCOUNT_INFO):
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(USER_KIS_ACCOUNT_INFO):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case FAILURE(USER_KIS_ACCOUNT_INFO):
      return { ...state, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function PutUserBio(
  state: ILoadingReducer<IUserUpdateResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IUserUpdateResponse>
): ILoadingReducer<IUserUpdateResponse | null> {
  switch (action.type) {
    case USER_ACCOUNT_BIO:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(USER_ACCOUNT_BIO):
      return { data: action.payload != null ? { ...action.payload } : null, status: ReducerStatus.SUCCESS };
    case FAILURE(USER_ACCOUNT_BIO):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function PutUpdateUsername(
  state: ILoadingReducer<IUserUpdateResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IUserUpdateResponse>
): ILoadingReducer<IUserUpdateResponse | null> {
  switch (action.type) {
    case USER_UPDATE_FULLNAME:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(USER_UPDATE_FULLNAME):
      return { data: action.payload != null ? action.payload : null, status: ReducerStatus.SUCCESS };
    case FAILURE(USER_UPDATE_FULLNAME):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}

export function PutUpdateEmail(
  state: ILoadingReducer<IUserUpdateEmailParams | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<IUserUpdateEmailParams>
): ILoadingReducer<IUserUpdateEmailParams | null> {
  switch (action.type) {
    case USER_UPDATE_EMAIL:
      return { data: null, status: ReducerStatus.LOADING };
    case SUCCESS(USER_UPDATE_EMAIL):
      return { data: action.payload != null ? action.payload : null, status: ReducerStatus.SUCCESS };
    case FAILURE(USER_UPDATE_EMAIL):
      return { data: null, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}
