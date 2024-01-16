import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import TradeScreen from './TradeScreen.view';
import { InvestmentSelectors, SymbolDataSelector, setCurrentSymbol } from 'reduxs';
import { ACCOUNT_TYPE } from 'global';

export const mapStateToProps = (state: IState) => ({
  currentSymbol: SymbolDataSelector.selectCurrentSymbolTradeScreen(state),
  profitLossStockCodes: InvestmentSelectors.selectedProfitLossStockCodes(false)(state),
  isRealAccount: state.selectedAccount.type === ACCOUNT_TYPE.KIS,
  keyboardHeight: state.keyboardHeight,
});

export const mapDispatchToProps = {
  setCurrentSymbol,
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeScreen);
