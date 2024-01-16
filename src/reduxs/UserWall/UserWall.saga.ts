import { takeLeading } from 'redux-saga/effects';
import { UserWallActions } from './UserWall.redux';
import { doGetFollowingDailyProfitLoss } from './sagas/getFollowingDailyProfitLoss';

export function* UserWallSagas() {
  yield takeLeading(UserWallActions.getUserProfitLoss.type, doGetFollowingDailyProfitLoss);
}
