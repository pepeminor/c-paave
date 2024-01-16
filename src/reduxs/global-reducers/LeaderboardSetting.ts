import { IAction } from 'interfaces/common';
import { ILeaderboardSettingResponse } from 'interfaces/leaderBoard';
import { ILoadingReducer, ReducerStatus } from 'interfaces/reducer';
import { FAILURE, REQUEST, RESET, SUCCESS } from 'reduxs/action-type-utils';
import { LEADER_BOARD_SETTING } from 'reduxs/actions';

export function LeaderboardSetting(
  state: ILoadingReducer<ILeaderboardSettingResponse | null> = {
    data: null,
    status: ReducerStatus.LOADING,
  },
  action: IAction<ILeaderboardSettingResponse>
): ILoadingReducer<ILeaderboardSettingResponse | null> {
  switch (action.type) {
    case REQUEST(LEADER_BOARD_SETTING):
      return { ...state, status: ReducerStatus.LOADING };
    case SUCCESS(LEADER_BOARD_SETTING):
      return { data: action.payload, status: ReducerStatus.SUCCESS };
    case RESET(LEADER_BOARD_SETTING):
      return { data: null, status: ReducerStatus.LOADING };
    case FAILURE(LEADER_BOARD_SETTING):
      return { data: action.payload, status: ReducerStatus.FAILED };
    default:
      return state;
  }
}
