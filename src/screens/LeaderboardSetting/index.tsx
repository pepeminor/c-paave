import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import LeaderboardSetting from './LeaderboardSetting.view';
import { SYSTEM_TYPE } from 'global';

export const mapStateToProps = (state: IState) => ({
  kisSubAccount: state.accountList?.KIS?.subAccounts?.filter(i => i.accountSubs[0].type !== SYSTEM_TYPE.DERIVATIVES),
  leaderboardSetting: state.leaderboardSetting,
  isShowDummyModal: state.showDummyModal,
});

export const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardSetting);
