import {
  IEqtEnquiryPortfolioParams,
  IKisCancelEqtOrderParams,
  IKisGetEqtAssetInfoParams,
  IKisGetEqtGenBuyAllParams,
  IKisGetEqtStockInfoParams,
  IKisModifyEqtOrderParams,
} from 'interfaces/services';
import {
  SERVICE_GET_EQUITY_ASSET_INFO,
  SERVICE_GET_EQUITY_ENQUIRY_HISTORY_ORDER,
  SERVICE_GET_EQUITY_ENQUIRY_ORDER,
  SERVICE_GET_EQUITY_ENQUIRY_PORTFOLIO,
  SERVICE_GET_EQUITY_GEN_BUY_ALL,
  SERVICE_GET_EQUITY_STOCK_INFO,
  SERVICE_PUT_EQUITY_CANCEL_ORDER,
  SERVICE_PUT_EQUITY_MODIFY_ORDER,
  SERVICE_GET_EQUITY_STOCK_INFO_ORDER_BOOK,
  SERVICE_GET_EQUITY_ASSET_INFO_ORDER_BOOK,
  SERVICE_GET_EQUITY_GEN_BUY_ALL_ORDER_BOOK,
} from 'reduxs/actions';
import { generateAction } from 'utils';

export const kisGetEqtStockInfo = generateAction<IKisGetEqtStockInfoParams>(SERVICE_GET_EQUITY_STOCK_INFO);

export const kisGetEqtAssetInfo = generateAction<IKisGetEqtAssetInfoParams>(SERVICE_GET_EQUITY_ASSET_INFO);

export const kisGetEqtGenBuyAll = generateAction<IKisGetEqtGenBuyAllParams>(SERVICE_GET_EQUITY_GEN_BUY_ALL);

export const kisGetEqtStockInfoOrderBook = generateAction<IKisGetEqtStockInfoParams>(
  SERVICE_GET_EQUITY_STOCK_INFO_ORDER_BOOK
);

export const kisGetEqtAssetInfoOrderBook = generateAction<IKisGetEqtAssetInfoParams>(
  SERVICE_GET_EQUITY_ASSET_INFO_ORDER_BOOK
);

export const kisGetEqtGenBuyAllOrderBook = generateAction<IKisGetEqtGenBuyAllParams>(
  SERVICE_GET_EQUITY_GEN_BUY_ALL_ORDER_BOOK
);

export const kisGetEqtEnquiryOrder = generateAction(SERVICE_GET_EQUITY_ENQUIRY_ORDER);

export const kisGetEqtEnquiryHistoryOrder = generateAction(SERVICE_GET_EQUITY_ENQUIRY_HISTORY_ORDER);

export const kisModifyEqtOrder = generateAction<IKisModifyEqtOrderParams>(SERVICE_PUT_EQUITY_MODIFY_ORDER);

export const kisCancelEqtOrder = generateAction<IKisCancelEqtOrderParams>(SERVICE_PUT_EQUITY_CANCEL_ORDER);

export const kisGetEqtEnquiryPortfolio = generateAction<IEqtEnquiryPortfolioParams>(
  SERVICE_GET_EQUITY_ENQUIRY_PORTFOLIO
);
