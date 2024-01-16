import { call, put, select, takeLeading } from 'redux-saga/effects';
import { GET_LINKED_ACCOUNTS, LINK_ACCOUNTS } from '../../actions';
import { ILinkAccountsRequest, ILoginRealAccountKisResult, IRequest, ISubAccount } from 'interfaces/common';
import APIList from 'config/api';
import { alertMessage, query } from 'utils';
import { GLOBAL_ACCOUNT_LIST } from 'reduxs/global-reducers/AccountList';
import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';
import { RealAccountSec } from 'screens/AccountTrading';
import { IState } from 'reduxs/global-reducers';
import { SUCCESS } from 'reduxs/action-type-utils';
import { SELECTED_ACCOUNT } from 'components/AccountPicker/reducers';

const linkAccounts = (params: ILinkAccountsRequest) => {
  return query(APIList.linkAccounts, params);
};

export function* setGlobalAccountList(
  listSub: ISubAccount[],
  type: ACCOUNT_TYPE,
  ignoreDerivatives: boolean,
  username: string
) {
  if (listSub.length === 0) return;
  const filterAccount = (item: ISubAccount) =>
    ignoreDerivatives === false ||
    (item.accountSubs[0] != null && item.accountSubs[0].type !== SYSTEM_TYPE.DERIVATIVES);

  const subAccounts = listSub.filter(filterAccount);

  yield put({
    type: GLOBAL_ACCOUNT_LIST,
    payload: { [type]: { type, username, subAccounts } },
  });
}

function* doLinkAccounts(request: IRequest<ILinkAccountsRequest>) {
  try {
    yield call(linkAccounts, request.payload);
    yield put({
      type: request.response.success,
      hideLoading: true,
    });
    const loginRealAccountKISresult: ILoginRealAccountKisResult | null = yield select(
      (state: IState) => state.loginRealAccountKISresult
    );
    if (loginRealAccountKISresult != null && request.payload.realAccountType === RealAccountSec.KIS) {
      yield put({
        type: SELECTED_ACCOUNT,
        payload: {
          type: ACCOUNT_TYPE.KIS,
          username: loginRealAccountKISresult.userInfo.username,
          subAccounts: loginRealAccountKISresult.userInfo.accounts,
          selectedSubAccount: loginRealAccountKISresult.userInfo.accounts[0],
        },
      });
      yield setGlobalAccountList(
        loginRealAccountKISresult.userInfo.accounts,
        ACCOUNT_TYPE.KIS,
        false,
        loginRealAccountKISresult.userInfo.username
      );
      yield put({
        type: SUCCESS(GET_LINKED_ACCOUNTS),
        payload: [{ partnerId: 'kis', partnerUsername: loginRealAccountKISresult.userInfo.username }],
      });
      alertMessage('success', 'loginRealAccount.connectKISSuccess');
    }
  } catch (error) {
    // alertMessage('danger', 'Kis Link Account', error.code ?? error.message);
    yield put({
      type: request.response.fail,
      hideLoading: true,
    });
  }
}

export default function* watchLinkAccounts() {
  yield takeLeading(LINK_ACCOUNTS, doLinkAccounts);
}
