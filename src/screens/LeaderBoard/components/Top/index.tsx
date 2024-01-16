import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import Top from './Top.view';
import { ACCOUNT_TYPE } from 'global';

export const mapStateToProps = (state: IState) => ({
  currentTime: state.currentTime,
  accountContestRegistered: state.accountContestRegistered.data,
  lastJoinableFromJson: state.contests?.subMenu.lastJoinable,
  getVirtualCoreContestListed: state.getVirtualCoreContestListed,
  subMenuContest: state.contests?.subMenu,
  isHaveKISAccount: state.accountList.KIS != null,
  leaderboardAccountSelector: state.leaderboardAccountSelector,
  isKisLeaderboardSelected: state.leaderboardAccountSelector === ACCOUNT_TYPE.KIS,
  isDemoSelected: state.selectedAccount.type === ACCOUNT_TYPE.DEMO,
  isOptBoardLeaderboard: state.leaderboardSetting.data?.optBoard,
  subAccountJoinLeaderboard: state.leaderboardSetting.data?.subAccount,
});

export const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Top);
