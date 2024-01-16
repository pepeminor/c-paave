import { ACCOUNT_TYPE } from 'global';
import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import LeaderBoard from './LeaderBoard.view';

export const mapStateToProps = (state: IState) => ({
  leaderBoardInvesting: state.leaderBoardInvesting,
  getVirtualCoreContestRanking: state.getVirtualCoreContestRanking,
  subMenuContest: state.contests?.subMenu,
  showQuestionContestLeaderBoardModal: state.showQuestionContestLeaderBoardModal,
  contestModalState: state.leaderboardContestModal,
  shouldContestModalShow: state.contests?.modal?.show,
  isHaveKisAccount: state.accountList.KIS != null,
  isVirtualLeaderboardSelected: state.leaderboardAccountSelector === ACCOUNT_TYPE.VIRTUAL,
  accountType: state.leaderboardAccountSelector,
  contestId: state.contests?.subMenu?.contestId,
  isShowDummyModal: state.showDummyModal,
  isKisSelected: state.leaderboardAccountSelector === ACCOUNT_TYPE.KIS,
});

export const mapDispatchToProps = {};

export const pageSizeLeaderboard = 30;

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);
