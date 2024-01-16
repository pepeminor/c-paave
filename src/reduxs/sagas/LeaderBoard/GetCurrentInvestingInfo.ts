// 1890 - contest
import APIList from 'config/api';
import { ILeaderBoardInvestingPeriod } from 'constants/enum';
import { ACCOUNT_TYPE } from 'global';
import { IAccount, IAction, IResponse } from 'interfaces/common';
import {
  ILeaderBoardCurrentInvestingInfoParams,
  ILeaderBoardCurrentInvestingInfoResponse,
} from 'interfaces/leaderBoard';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { FAILURE, SUCCESS } from 'reduxs/action-type-utils';
import { LEADER_BOARD_GET_CURRENT_INVESTING_INFO } from 'reduxs/actions';
import { IState } from 'reduxs/global-reducers';
import { query } from 'utils';

function* doGetCurrentInvestingInfo(action: IAction<ILeaderBoardCurrentInvestingInfoParams>) {
  try {
    const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);

    const isHaveKisAccount: boolean = yield select((state: IState) => state.accountList.KIS != null);
    const isDemoAccount = selectedAccount.type === ACCOUNT_TYPE.DEMO;
    if (isDemoAccount) return;

    const isVirtualAccount = selectedAccount.type === ACCOUNT_TYPE.VIRTUAL;
    const isKisAccount = selectedAccount.type === ACCOUNT_TYPE.KIS;

    const leaderboardAccountSelector: ACCOUNT_TYPE = yield select((state: IState) => state.leaderboardAccountSelector);
    const isVirtualLeaderboardSelected = leaderboardAccountSelector === ACCOUNT_TYPE.VIRTUAL;
    const isKisLeaderboardSelected = leaderboardAccountSelector === ACCOUNT_TYPE.KIS;

    if (isKisLeaderboardSelected && !isHaveKisAccount) return;
    // it need to refactor later
    const handleCheckForAnotherScreen = () => {
      if (action.payload.currentScreen != null) {
        // case when in another screen
        // then check if Virtual-Account selected
        return isVirtualAccount ? APIList.leaderBoardCurrentInvestingInfo : APIList.realLeaderBoardCurrentInvestingInfo;
      } else {
        // case when in Leaderboard screen
        // then check if Virtual-Leaderboard is selected
        return isVirtualLeaderboardSelected
          ? APIList.leaderBoardCurrentInvestingInfo
          : APIList.realLeaderBoardCurrentInvestingInfo;
      }
    };

    const defaultParam: ILeaderBoardCurrentInvestingInfoParams = {
      period: action.payload.period || ILeaderBoardInvestingPeriod.WEEK,
    };

    if (isKisLeaderboardSelected || isKisAccount) {
      defaultParam.partnerId = 'kis';
    }

    const response: IResponse<ILeaderBoardCurrentInvestingInfoResponse> = yield call(
      query,
      handleCheckForAnotherScreen(),
      {
        ...defaultParam,
      }
    );

    yield put({
      type: SUCCESS(LEADER_BOARD_GET_CURRENT_INVESTING_INFO),
      payload: response.data,
    });
  } catch (err) {
    yield put({
      type: FAILURE(LEADER_BOARD_GET_CURRENT_INVESTING_INFO),
    });
  }
}

export default function* watchGetCurrentInvestingInfo() {
  yield takeLatest(LEADER_BOARD_GET_CURRENT_INVESTING_INFO, doGetCurrentInvestingInfo);
}
