import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import Derivatives from './Derivatives.view';
export const mapStateToProps = (state: IState) => ({
  selectedAccount: state.selectedAccount,
  selectedAccountType: state.selectedAccount.type,
  derivativePortfolio: state.derivativePortfolio,
});

export const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Derivatives);
