import APIList from 'config/api';
import { IAction, IResponse } from 'interfaces/common';
import { ILeaderboardSettingParams } from 'interfaces/leaderBoard';
import { IChangeLeaderboardSettingResponse } from 'interfaces/leaderBoard';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { FAILURE, REQUEST } from 'reduxs/action-type-utils';
import { LEADER_BOARD_SETTING, OPEN_DUMMY_MODAL } from 'reduxs/actions';
import { CHANGE_LEADER_BOARD_SETTING } from 'reduxs/actions';
import { onEnterLeaderboardSettingScreen } from 'screens/LeaderboardSetting/action';
import { query, alertMessage } from 'utils';

function* doChangeLeaderboardSetting(action: IAction<ILeaderboardSettingParams>) {
  try {
    yield put({ type: REQUEST(LEADER_BOARD_SETTING) });

    // this one call because
    // when User want to change their subAccount Opt-IN
    // then at FE need to reset to Opt-OUT
    // after that FE put to OPT-IN with subaccountNumber need to change
    yield call(query, APIList.changeLeaderBoardSetting, {
      partnerId: action.payload.partnerId,
      optBoard: false,
      subAccount: action.payload.subAccount,
    });

    if (action.payload.optBoard === false) {
      yield put(onEnterLeaderboardSettingScreen({}));
      yield action.callBack?.handleSuccess?.();
      yield delay(800);
      yield put({ type: OPEN_DUMMY_MODAL });
      return;
      // If user want to Opt-OUT
      // then just stop handle at here...
    }

    const response: IResponse<IChangeLeaderboardSettingResponse> = yield call(query, APIList.changeLeaderBoardSetting, {
      partnerId: action.payload.partnerId,
      optBoard: action.payload.optBoard,
      subAccount: action.payload.subAccount,
    });

    if (response?.data?.message === 'UPDATED_SUCCESSFULLY') {
      yield put(onEnterLeaderboardSettingScreen({}));
      yield action.callBack?.handleSuccess?.();
      yield delay(800);
      yield put({ type: OPEN_DUMMY_MODAL });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log(err);
    yield put({ type: FAILURE(LEADER_BOARD_SETTING) });
    yield action.callBack?.handleFail?.();
    yield alertMessage('warning', 'Please, Try again later');
  }
}

export default function* watchAccountContestRegistered() {
  yield takeLatest(CHANGE_LEADER_BOARD_SETTING, doChangeLeaderboardSetting);
}
