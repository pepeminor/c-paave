import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import Portfolio from './Portfolio.view';
import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';

export const mapStateToProps = (state: IState) => ({
  selectedAccount: state.selectedAccount,
  isSubD:
    state.selectedAccount.type === ACCOUNT_TYPE.KIS &&
    state.selectedAccount.selectedSubAccount?.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES,
  isSubXorM:
    state.selectedAccount.type === ACCOUNT_TYPE.KIS &&
    state.selectedAccount.selectedSubAccount?.accountSubs[0].type === SYSTEM_TYPE.EQUITY,
  lang: state.lang,
  noticeShow: state.noticeShow,
  accountNumber: state.selectedAccount.selectedSubAccount ? state.selectedAccount.selectedSubAccount.accountNumber : '',
  subAccountNumber: state.accountContestRegistered.data,
});

export const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
