import { ACCOUNT_TYPE } from 'global';
import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import LeaderBoardVirtualContestRanking from './LeaderBoardVirtualContestRanking.view';

export const mapStateToProps = (state: IState) => ({
  currentTime: state.currentTime,
  contests: state.contests?.contests,
  getVirtualCoreContestRanking: state.getVirtualCoreContestRanking,
  leaderBoardInvesting: state.leaderBoardInvesting,
  contestId: state.contests != null && state.contests.subMenu.contestId != null ? state.contests.subMenu.contestId : '',
  accountContestRegistered: state.accountContestRegistered,
  selectedAccount: state.selectedAccount.type,
  subMenuContest: state.contests?.subMenu,
  getVirtualCoreContest: state.getVirtualCoreContest,
  getVirtualCoreContestListed: state.getVirtualCoreContestListed,
  isVirtualSelected:
    state.leaderboardAccountSelector === ACCOUNT_TYPE.VIRTUAL || state.leaderboardAccountSelector === ACCOUNT_TYPE.DEMO,
});

export const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardVirtualContestRanking);
