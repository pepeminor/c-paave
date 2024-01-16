import { connect } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import TradeForm from './TradeForm.view';
import { InvestmentActions, SymbolDataSelector, initMarket, setCurrentSymbol } from 'reduxs';
import { ACCOUNT_TYPE } from 'global';
import {
  kisGetEqtEnquiryPortfolio,
  kisGetEqtGenBuyAll,
  queryEquityBuyable,
  queryEquitySellable,
  queryAIRatingScore,
  kisGetEqtStockInfo,
  kisGetEqtAssetInfo,
  realTradingPostEqtOrder,
  setTradeTabOption,
  handleOrderKisSuccess,
  realTradingPostEqtOrderOddLot,
  realTradingPostDerOrder,
  postOrderEquity,
  postOrderStopEquity,
  kisGetDerEnquiryOrder,
  setSellBuyType,
} from 'reduxs/global-actions';
import { showNonLoginModal } from 'reduxs/global-actions/NonLogin';
import { queryDerivativesPurchasingPower, queryMaxBuySellAction } from './action';
import { getDerivativePortfolio } from 'reduxs/global-actions/Derivative';

export const mapStateToProps = (state: IState) => {
  const selectedAccount = state.selectedAccount;

  const accountNumber = selectedAccount.selectedSubAccount?.accountNumber!;

  return {
    currentSymbol: SymbolDataSelector.selectCurrentSymbol(state),
    selectedAccount,
    selectedAccountType: selectedAccount.type,
    accountNumber: accountNumber,
    accessToken: state.authToken.accessToken,
    isRealAccount: selectedAccount.type === ACCOUNT_TYPE.KIS,
    kisEqtGenBuyAll: state.kisEqtGenBuyAll,
    kisEqtAssetInfo: state.kisEqtAssetInfo,
    kisEqtStockInfo: state.kisEqtStockInfo,
    buyableInfo: state.buyableInfo,
    maxBuySell: state.maxBuySell,
    sellableInfo: state.sellableInfo,
    kisEquityEnquiryPortfolio: state.kisEquityEnquiryPortfolio,
    derivativesPurchasingPower: state.derivativesPurchasingPower,
    showExecuteModal: state.onExecuteModal,
    fillPriceTriggered: state.fillPriceTriggered,
    orderKISSuccess: state.orderKISSuccess,
    orderSuccess: state.orderSuccess,
    queryMaxBuySellSuccessTrigger: state.queryMaxBuySellSuccessTrigger,
    sellBuyType: state.sellBuyType,
    keyboardHeight: state.keyboardHeight,
  };
};

export const mapDispatchToProps = {
  showNonLoginModal,
  kisGetEqtGenBuyAll,
  kisGetEqtEnquiryPortfolio,
  queryEquityBuyable,
  queryEquitySellable,
  queryAIRatingScore,
  kisGetEqtStockInfo,
  kisGetEqtAssetInfo,
  queryDerivativesPurchasingPower,
  queryMaxBuySellAction,
  realTradingPostEqtOrder,
  setTradeTabOption,
  handleOrderKisSuccess,
  realTradingPostEqtOrderOddLot,
  realTradingPostDerOrder,
  postOrderEquity,
  postOrderStopEquity,
  kisGetDerEnquiryOrder,
  getDerivativePortfolio,
  setCurrentSymbol,
  initMarket,
  setSellBuyType,
  getInvestmentListRequest: InvestmentActions.getInvestmentListRequest,
};

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(TradeForm);
