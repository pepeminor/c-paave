import { call, put, select } from 'redux-saga/effects';
import { SocialPostActions } from '../SocialPost.redux';
import { query } from 'utils';
import APIList from 'config/api';
import { IState } from 'reduxs/global-reducers';
import { ACCOUNT_TYPE } from 'global';

export function* checkLimitSocial() {
  try {
    const isDemo: boolean = yield select((state: IState) => state.selectedAccount.type === ACCOUNT_TYPE.DEMO);
    if (isDemo) return;
    const res: { data: { limited: boolean } } = yield call(query, APIList.getAccessSocial);
    if (res.data) {
      yield put(SocialPostActions.checkLimitSocialSuccess(res.data.limited));
    }
  } catch (err) {
    yield put(SocialPostActions.checkLimitSocialFalse());
  }
}
