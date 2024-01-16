import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import Chart from './Chart.view';
import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';
export const mapStateToProps = (state: IState) => {
  const selectedAccountType = state.selectedAccount.type;
  const selectedAccountNumber = state.selectedAccount.selectedSubAccount?.accountNumber;
  const username = state.selectedAccount.username;

  const accountNumber =
    selectedAccountType === ACCOUNT_TYPE.KIS
      ? selectedAccountNumber // accountNumber KIS
      : selectedAccountType === ACCOUNT_TYPE.DEMO
      ? ACCOUNT_TYPE.DEMO // accountNumber Demo
      : username; // accountNumber VT
  return {
    selectedAccountType,
    dailyProfitLoss: state.DailyProfitLossReducer.dailyProfitLoss[selectedAccountType].data[accountNumber!],
    vnindexReturn: state.DailyProfitLossReducer.vnindexReturn,
    dailyProfitLossStatus: state.DailyProfitLossReducer.dailyProfitLossStatus,
    dailyProfitLossRefresh: state.DailyProfitLossReducer.refreshing,
    subAccountNumber: state.accountContestRegistered.data,
    selectedSubAccount: state.selectedAccount.selectedSubAccount,
    selectedAccount: state.selectedAccount,
    // dailyProfitLossLoaded: state.DailyPLList != null,dailyProfitLoss
    isSubD:
      state.selectedAccount.type === ACCOUNT_TYPE.KIS &&
      state.selectedAccount.selectedSubAccount?.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES,
    isSubXorM:
      state.selectedAccount.type === ACCOUNT_TYPE.KIS &&
      state.selectedAccount.selectedSubAccount?.accountSubs[0].type === SYSTEM_TYPE.EQUITY,
  };
};

export const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
