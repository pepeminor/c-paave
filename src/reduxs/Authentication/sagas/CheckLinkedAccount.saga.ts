import APIList from 'config/api';
import { IGetLinkedAccountsResponse, IResponse } from 'interfaces/common';
import { query } from 'utils';
import { store } from 'screens/App';
import { logOutAction } from 'screens/UserInfo/AlreadyLogin/actions';
import { ACCOUNT_TYPE } from 'global';
import { IAuthTokenReducer } from 'interfaces/reducers/IAuthTokenReducer';
import { select } from 'redux-saga/effects';
import { IState } from 'reduxs/global-reducers';

export function* doCheckLinkedAccounts() {
  try {
    const isDemo: boolean = yield select((state: IState) => state.selectedAccount.type === ACCOUNT_TYPE.DEMO);
    const paaveToken: IAuthTokenReducer = yield select((state: IState) => state.authToken);
    if (isDemo || paaveToken.refreshToken == null || paaveToken.refreshToken === '') {
      return;
    }
    const kisResponse: IResponse<IGetLinkedAccountsResponse[]> = yield query(APIList.getLinkedAccounts);
    if (kisResponse.data.find(item => item.partnerId === 'kis') != null) {
      const kisToken: IAuthTokenReducer = yield select((state: IState) => state.kisAuthToken);
      if (
        kisToken.accessToken == null ||
        kisToken.accessToken === '' ||
        kisToken.refreshToken == null ||
        kisToken.refreshToken === ''
      ) {
        const isDemoAccount: boolean = store.getState().selectedAccount.type === ACCOUNT_TYPE.DEMO;
        const refreshTokenVersion = paaveToken.version || 0;
        store.dispatch(
          logOutAction({
            isDemoAccount,
            version: refreshTokenVersion,
            refreshToken: paaveToken.refreshToken,
          })
        );
      }
    }
  } catch (error) {
    //
  }
}
