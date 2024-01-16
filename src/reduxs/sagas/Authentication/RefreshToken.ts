import { IAuthTokenResponse, IRefreshAuthTokenParams } from 'interfaces/authentication';
import { AUTHENTICATION_REFRESH_TOKEN } from 'reduxs/actions';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { setAuthToken } from 'reduxs/global-actions/Authentication';
import { query } from 'utils';
import { IState } from 'reduxs/global-reducers';
import { put, select, takeLatest } from 'redux-saga/effects';
import { ACCOUNT_TYPE } from 'global';

function* handleRefreshAuthToken(action: IAction<IRefreshAuthTokenParams>) {
  try {
    const response: IResponse<IAuthTokenResponse> = yield query<IAuthTokenResponse, IRefreshAuthTokenParams>(
      APIList.refreshToken,
      action.payload
    );
    const authToken: IAuthTokenResponse = yield select((state: IState) => state.authToken);
    const selectedAccountType: ACCOUNT_TYPE = yield select((state: IState) => state.selectedAccount.type);
    const removeLastLogin: object =
      selectedAccountType === ACCOUNT_TYPE.DEMO
        ? {
            lastLoggedInAt: undefined,
          }
        : {};
    const newToken = {
      ...authToken,
      accessToken: response.data.accessToken,
      accExpiredTime: response.data.accExpiredTime,
      ...removeLastLogin,
    };
    yield put(setAuthToken(newToken));
  } catch (error) {
    //
  }
}

export default function* watchRefreshToken() {
  yield takeLatest(AUTHENTICATION_REFRESH_TOKEN, handleRefreshAuthToken);
}
