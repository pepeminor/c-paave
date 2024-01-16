import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import TradeFormLayout from './TradeFormLayout.view';
import { SymbolDataSelector } from 'reduxs';
import { isNotNilOrEmpty } from 'ramda-adjunct';

export const mapStateToProps = (state: IState) => ({
  currentUserSetting: state.currentUserSetting,
  isHaveCurrentSymbol: isNotNilOrEmpty(SymbolDataSelector.selectCurrentSymbolTradeScreen(state)),
});

export const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TradeFormLayout);
