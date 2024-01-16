import { ILeaderboardSettingParams } from 'interfaces/leaderBoard';
import { CHANGE_LEADER_BOARD_SETTING, LEADER_BOARD_SETTING } from 'reduxs/actions';
import { generateAction } from 'utils';

export const onEnterLeaderboardSettingScreen = generateAction(LEADER_BOARD_SETTING);
export const changeLeaderboardSetting = generateAction<ILeaderboardSettingParams>(CHANGE_LEADER_BOARD_SETTING);
