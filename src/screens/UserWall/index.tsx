import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import UserWall from './UserWall.view';
import { StackScreenProps } from 'screens/RootNavigation';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { resetTradingHistory, getTradingHistory } from 'reduxs/global-actions';
import { getFollowingDailyProfitLossByDate, getFollowingDailyProfitLossKisByDate } from 'reduxs/global-actions/Equity';
import { UserWallActions, UserWallSelectors, InvestmentActions, AdvisorSelectors } from 'reduxs';
import { ACCOUNT_TYPE } from 'global';

export const mapStateToProps = (state: IState, props: StackScreenProps<ScreenNames.UserWall>) => {
  const { userData, isFromSearch, isFromKis } = props.route.params;
  const selectedAccount = state.selectedAccount;
  const selectedAccountLeaderBoard = state.leaderboardAccountSelector;
  const isKis = (selectedAccountLeaderBoard === ACCOUNT_TYPE.KIS && !isFromSearch) || isFromKis;
  const isDemoAccount = selectedAccount.type === ACCOUNT_TYPE.DEMO;

  const advisorData = AdvisorSelectors.selectAdvisorInfo(userData.userId)(state);
  const dataProfitLoss = UserWallSelectors.selectUserDailyProfitLoss(
    isKis ? ACCOUNT_TYPE.KIS : ACCOUNT_TYPE.VIRTUAL,
    userData.userId
  )(state);

  const followingDailyProfitLossData = isKis
    ? state.followingDailyProfitLossKisByDate
    : state.followingDailyProfitLossByDate;

  return {
    advisorData,
    dataProfitLoss,
    vnindexReturn: state.UserWallReducer.vnindexReturn,
    isDemoAccount,
    isKis,
    followingDailyProfitLossData,
    dataByDate: state.UserWallReducer.dataByDate,
    holidays: state.holidays,
    selectedAccountLeaderBoard: state.leaderboardAccountSelector,
    currentSubContestUser: state.currentSubContestUser,
    tradingHistory: state.tradingHistory,
  };
};

export const mapDispatchToProps = {
  getFollowingDailyProfitLoss: UserWallActions.getUserProfitLoss,
  getFollowingDailyProfitLossByDate,
  getFollowingDailyProfitLossKisByDate,
  getTradingHistory,
  getFollowingProfitLoss: InvestmentActions.getInvestmentListRequest,
  getFollowingProfitLossKis: InvestmentActions.getInvestmentListKisRequest,
  resetTradingHistory,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserWall);
