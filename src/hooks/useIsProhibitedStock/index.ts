import { useIsFocused } from '@react-navigation/native';
import { useMemo, useCallback } from 'react';
import { useAppSelector } from 'hooks';
import { alertMessage } from 'utils';

/**
 * useIsProhibitedStock hook is used to check if the stock is prohibited.
 * If the stock is prohibited, it will show an alert.
 *
 * @param stock The stock code to check.
 * @returns [The result of checking, The function to show the alert]
 *
 * @example
 * const [isProhibited, showProhibitedAlert] = useIsProhibitedStock('stockCode');
 */
const useIsProhibitedStock = (stock = '') => {
  const isFocused = useIsFocused();
  const selectedAccountType = useAppSelector(state => state.selectedAccount.type);
  const prohibitedStock = useAppSelector(state => state.prohibitedStock[selectedAccountType]);

  const showProhibitedAlert = useCallback(() => alertMessage('warning', 'STOCK_CODE_INPUT_LIMITED_TRADING'), []);

  const isProhibited = useMemo(() => {
    if (!isFocused) return false;
    const result = prohibitedStock?.includes(stock) ?? false;
    result && showProhibitedAlert();
    return result;
  }, [prohibitedStock, stock, isFocused]);

  return { isProhibited, showProhibitedAlert };
};

export default useIsProhibitedStock;
