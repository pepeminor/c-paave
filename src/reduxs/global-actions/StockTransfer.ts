import { generateAction } from '../../utils';
import { RESET } from '../action-type-utils';
import {
  STOCK_TRANSFER_LIST_INSTRUMENT_PORTFOLIO,
  STOCK_TRANSFER_HISTORY_TRANSFER,
  STOCK_TRANSFER_DO_TRANSFER_STOCK,
  STOCK_TRANSFER_CHECK_TRANSFER_TIME,
} from '../actions';
import {
  IQueryListInstrumentPortfolioParams,
  IQueryStockTransferHistoryParams,
  IPostDoStockTransferParams,
  ICheckTimeStockTransferAvailableParams,
} from '../../interfaces/stockTransfer';

export const queryListInstrumentPortfolio = generateAction<IQueryListInstrumentPortfolioParams>(
  STOCK_TRANSFER_LIST_INSTRUMENT_PORTFOLIO
);

export const queyListStockTransferHistory = generateAction<IQueryStockTransferHistoryParams>(
  STOCK_TRANSFER_HISTORY_TRANSFER
);

export const doStockTransfer = generateAction<IPostDoStockTransferParams>(STOCK_TRANSFER_DO_TRANSFER_STOCK);

export const checkStockTransferAvailable = generateAction<ICheckTimeStockTransferAvailableParams>(
  STOCK_TRANSFER_CHECK_TRANSFER_TIME
);

export const resetCheckDoStockTransfer = generateAction(RESET(STOCK_TRANSFER_DO_TRANSFER_STOCK));

export const resetCheckTimeStockTransfer = generateAction(RESET(STOCK_TRANSFER_CHECK_TRANSFER_TIME));
