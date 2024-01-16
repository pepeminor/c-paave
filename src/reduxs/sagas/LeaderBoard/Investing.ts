import { LEADER_BOARD_GET_INVESTING } from '../../actions';
import { IAction, IResponse } from 'interfaces/common';
import APIList from 'config/api';
import { ILeaderBoardInvestingInvestorsResponse, ILeaderBoardInvestingParams } from 'interfaces/leaderBoard';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { ILeaderBoardInvestingPeriod } from 'constants/enum';
import { IState } from 'reduxs/global-reducers';
import { query } from 'utils';
import { FAILURE, SUCCESS } from 'reduxs/action-type-utils';
import { isEqual } from 'lodash';
import { ACCOUNT_TYPE } from 'global';
import { pageSizeLeaderboard } from 'screens/LeaderBoard';
import { isObjectEmpty } from 'utils/common';

function* doGetVirtualContestInvesting(action: IAction<ILeaderBoardInvestingParams>) {
  try {
    const leaderboardAccountSelected: ACCOUNT_TYPE = yield select((state: IState) => state.leaderboardAccountSelector);

    const isVirtualSelected =
      leaderboardAccountSelected === ACCOUNT_TYPE.VIRTUAL || leaderboardAccountSelected === ACCOUNT_TYPE.DEMO;
    const whichApiCall = isVirtualSelected ? APIList.leaderBoardInvesting : APIList.realLeaderBoardInvesting;

    const defaultParam: ILeaderBoardInvestingParams = {
      pageNumber: action.payload.pageNumber ?? 0,
      pageSize: action.payload.pageSize ?? pageSizeLeaderboard,
      period: action.payload.period ?? ILeaderBoardInvestingPeriod.DAY,
      partnerId: action.payload.partnerId ?? '',
    };

    defaultParam.partnerId =
      leaderboardAccountSelected === ACCOUNT_TYPE.KIS ? ACCOUNT_TYPE.KIS.toString().toLowerCase() : '';

    const prevData: IResponse<ILeaderBoardInvestingInvestorsResponse> = yield select(
      (state: IState) => state.leaderBoardInvesting
    );

    const response: IResponse<ILeaderBoardInvestingInvestorsResponse> = yield call(query, whichApiCall, {
      ...defaultParam,
    });

    // handle case when response is empty
    if (response.data.investors == null) return;

    //handle case when response is empty at first-page (0)
    if (action.payload.pageNumber === 0 && (isObjectEmpty(response?.data) || response.data.investors == null)) {
      const newData = {
        ...response.data,
        ...defaultParam,
        investors: [],
      };
      yield put({
        type: SUCCESS(LEADER_BOARD_GET_INVESTING),
        payload: newData,
      });
      return;
    }

    const isLimit = action.payload.pageNumber >= 0 && response.data.investors.length < action.payload.pageSize;

    // check prevData first-time
    if (prevData.data !== null) {
      let newData = {};
      const paramChanged =
        prevData.data.partnerId?.toUpperCase() !== action.payload.partnerId?.toUpperCase() ||
        prevData.data.period !== action.payload.period;

      if (paramChanged) {
        newData = {
          ...response.data,
          ...defaultParam,
          investors: [...response.data.investors],
        };
        response.data.isLimit = isLimit;
        yield action.callBack?.handleSuccess?.(response);
        yield put({
          type: SUCCESS(LEADER_BOARD_GET_INVESTING),
          payload: newData,
        });
        return;
      }

      // handle check data duplicate
      if (isEqual(prevData.data.investors, response.data.investors)) {
        newData = {
          ...prevData.data,
          ...defaultParam,
          investors: [...prevData.data.investors],
        };
      } else {
        newData = {
          ...prevData.data,
          ...defaultParam,
          investors: [...prevData.data.investors, ...response.data.investors],
        };
      }

      // handle prevent load more when no-data in next pageNumber
      response.data.isLimit = isLimit;
      yield action.callBack?.handleSuccess?.(response);
      yield put({
        type: SUCCESS(LEADER_BOARD_GET_INVESTING),
        payload: newData,
      });
    } else {
      yield put({
        type: SUCCESS(LEADER_BOARD_GET_INVESTING),
        payload: {
          ...response.data,
          ...defaultParam,
          investors: [...response.data.investors],
        },
      });
      yield action.callBack?.handleSuccess?.(response);
    }
  } catch (err) {
    yield put({
      type: FAILURE(LEADER_BOARD_GET_INVESTING),
    });
  }
}

export default function* watchGetVirtualCoreContestRanking() {
  yield takeLatest(LEADER_BOARD_GET_INVESTING, doGetVirtualContestInvesting);
}
