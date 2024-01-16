import { IProfitLossItems } from 'interfaces/equity';
import { store } from 'screens/App';

export const compareCurrentValue = (a: IProfitLossItems, b: IProfitLossItems) => {
  const dataStockA = store.getState().SymbolData.mergeSymbolMap[a?.stockCode];
  const dataStockB = store.getState().SymbolData.mergeSymbolMap[b?.stockCode];
  const dataStockCurrentPrice_A = dataStockA?.currentPrice ?? 0;
  const dataStockCurrentPrice_B = dataStockB?.currentPrice ?? 0;

  //If dataStocks has no data of the code, get currentPrice from the return api, else get from dataStocks
  const newCurrentPrice_A = dataStockCurrentPrice_A <= 0 ? a?.currentPrice ?? 0 : dataStockA?.currentPrice ?? 0;
  const newCurrentPrice_B = dataStockCurrentPrice_B <= 0 ? b?.currentPrice ?? 0 : dataStockB?.currentPrice ?? 0;
  const ignoreRightQuantity_A = a?.balanceQuantity - (a?.rightOffering ?? 0);
  const ignoreRightQuantity_B = b?.balanceQuantity - (b?.rightOffering ?? 0);

  const currentValue_A = newCurrentPrice_A * ignoreRightQuantity_A;
  const currentValue_B = newCurrentPrice_B * ignoreRightQuantity_B;

  return currentValue_A - currentValue_B;
};

export const comparePL = (a: IProfitLossItems, b: IProfitLossItems, isPLRate: boolean) => {
  const dataStockA = store.getState().SymbolData.mergeSymbolMap[a?.stockCode];
  const dataStockB = store.getState().SymbolData.mergeSymbolMap[b?.stockCode];
  const dataStockCurrentPrice_A = dataStockA?.currentPrice ?? 0;
  const dataStockCurrentPrice_B = dataStockB?.currentPrice ?? 0;

  //If dataStocks has no data of the code, get currentPrice from the return api, else get from dataStocks
  const newCurrentPrice_A = dataStockCurrentPrice_A <= 0 ? a?.currentPrice ?? 0 : dataStockA?.currentPrice ?? 0;
  const newCurrentPrice_B = dataStockCurrentPrice_B <= 0 ? b?.currentPrice ?? 0 : dataStockB?.currentPrice ?? 0;
  const ignoreRightQuantity_A = a?.balanceQuantity - (a?.rightOffering ?? 0);
  const ignoreRightQuantity_B = b?.balanceQuantity - (b?.rightOffering ?? 0);

  if (isPLRate) {
    const profitLossRate_A =
      ((newCurrentPrice_A - a?.buyingPrice) * ignoreRightQuantity_A * 100) / (a?.buyingPrice * ignoreRightQuantity_A);
    const profitLossRate_B =
      ((newCurrentPrice_B - b?.buyingPrice) * ignoreRightQuantity_B * 100) / (b?.buyingPrice * ignoreRightQuantity_B);

    return profitLossRate_A - profitLossRate_B;
  }

  const profitLoss_A = (newCurrentPrice_A - a?.buyingPrice) * ignoreRightQuantity_A;
  const profitLoss_B = (newCurrentPrice_B - b?.buyingPrice) * ignoreRightQuantity_B;

  return profitLoss_A - profitLoss_B;
};
