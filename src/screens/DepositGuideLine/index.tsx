import { memo } from 'react';
import DepositGuideLine from './DepositGuideLine.view';
import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';

export const mapStateToProps = (state: IState) => ({
  selectedAccount: state.selectedAccount,
});

export const mapDispatchToProps = {};

export default memo(connect(mapStateToProps, mapDispatchToProps)(DepositGuideLine));
