import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import Chart from './ChartWrapper.view';
export const mapStateToProps = (state: IState) => ({
  selectedAccount: state.selectedAccount,
});

export const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Chart);
