import APIList from 'config/api';
import { IAction, IResponse } from 'interfaces/common';
import { IGetAccountInfoResponse } from 'interfaces/user';
import { call, put } from 'redux-saga/effects';
import { AuthenticationActions } from 'reduxs/Authentication';
import { USER_ACCOUNT_INFO } from 'reduxs/actions';
import { query, createNormalApiQuerySaga } from 'utils';

const checkAvailablePassword = () => {
  return query(APIList.checkAvailablePassword);
};

interface ICheckAvailablePasswordResponse {
  data: {
    availablePassword: boolean;
  };
}

function* handleSuccess(response: IResponse<IGetAccountInfoResponse>, action: IAction<null>) {
  try {
    if (action.response != null) {
      yield put({
        type: action.response.success,
        payload: response.data,
      });
      yield put(AuthenticationActions.setSocialLinkAccounts(response.data.socialLinkAccounts));
    }
    const res: ICheckAvailablePasswordResponse = yield call(checkAvailablePassword);
    if (action.response != null) {
      yield put({
        type: action.response.success,
        payload: response.data,
      });
      yield put({
        type: action.response.success,
        payload: {
          isPasswordCreated: res.data.availablePassword,
        },
      });
      yield put(AuthenticationActions.setSocialLinkAccounts(response.data.socialLinkAccounts));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('err', error);
  }
}

function* handleFailed(action: IAction<null>) {
  if (action.response != null) {
    yield put({
      type: action.response.fail,
      hideLoading: true,
    });
  }
}

export default createNormalApiQuerySaga<null, IGetAccountInfoResponse>(
  APIList.getUserInfo,
  USER_ACCOUNT_INFO,
  handleSuccess,
  handleFailed
);
