import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';
import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import LeaderBoardInvestingList from './LeaderBoardInvestingList.view';

export const mapStateToProps = (state: IState) => ({
  selectedAccountType: state.selectedAccount.type,
  getVirtualCoreContestRanking: state.getVirtualCoreContestRanking,
  leaderBoardInvesting: state.leaderBoardInvesting,
  isHaveKisAccount: state.accountList.KIS != null,
  isSubXorM:
    state.selectedAccount.type === ACCOUNT_TYPE.KIS &&
    state.selectedAccount.selectedSubAccount?.accountSubs[0].type === SYSTEM_TYPE.EQUITY,
  isVirtualSelected:
    state.leaderboardAccountSelector === ACCOUNT_TYPE.VIRTUAL || state.leaderboardAccountSelector === ACCOUNT_TYPE.DEMO,
});

export const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoardInvestingList);
