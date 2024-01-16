import { ACCOUNT_TYPE } from 'global';
import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import CustomHeader from './CustomHeader.view';

export const mapStateToProps = (state: IState) => ({
  currentTime: state.currentTime,
  contests: state.contests?.contests,
  subMenuContests: state.contests?.subMenu,
  getVirtualCoreContest: state.getVirtualCoreContest,
  getVirtualCoreContestListed: state.getVirtualCoreContestListed,
  isVirtualselected:
    state.leaderboardAccountSelector === ACCOUNT_TYPE.VIRTUAL || state.leaderboardAccountSelector === ACCOUNT_TYPE.DEMO,
});

export const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CustomHeader);
