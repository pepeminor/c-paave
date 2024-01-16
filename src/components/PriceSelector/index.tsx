import React, { useEffect, useMemo } from 'react';
import { ISpecialPriceType, SymbolType } from 'constants/enum';
import { formatNumber, priceStep, roundLot } from 'utils';
import useRefState from 'hooks/useRefState';
import ValueSelector, { ValueSelectorProps } from 'components/ValueSelector';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { MergeMarketSymbol } from 'reduxs/SymbolData';
import { MARKET } from 'global';
import withMemo from 'HOC/withMemo';

const SPECIAL_CASE = /(^0$)|(\.$)|(\.0$)|(\.00$)|(\.\d0$)/; // 0 or ends with . or .0 or .00 or .x0
const PRICE_REGEX = /^\d*\.?\d{0,2}$/;
const PRICE_REGEX_3_DECIMAL = /^\d*\.?\d{0,3}$/;

const formatFilledPrice = (price: number | ISpecialPriceType, isFuturesCode: boolean, fixed = true) => {
  if (typeof price !== 'number') return price;
  if (price === 0) return '';
  return isFuturesCode ? formatNumber(price, 1, undefined, fixed) : formatNumber(price / 1000, 2, undefined, fixed);
};

interface PriceSelectorProps extends Omit<ValueSelectorProps, 'value' | 'onMinus' | 'onPlus'> {
  readonly value: number | ISpecialPriceType;
  readonly symbolInfo: MergeMarketSymbol;
}

const PriceSelector = ({ value, symbolInfo, onBlur, onChangeText, ...valueSelectorProps }: PriceSelectorProps) => {
  const isFuturesCode = useMemo(() => {
    return symbolInfo.symbolType === SymbolType.FUTURES;
  }, [symbolInfo.symbolType]);
  const [currentValue, setCurrentValue] = useRefState(formatFilledPrice(value, isFuturesCode));
  const market = symbolInfo.market as MARKET;

  useEffect(() => {
    if (typeof value === 'string') {
      setCurrentValue(value);
      return;
    }
    if (value !== Number(currentValue.current.replace(/,/g, '')) * 1000) {
      setCurrentValue(formatFilledPrice(value, isFuturesCode, !isFuturesCode));
      return;
    }
    !SPECIAL_CASE.test(currentValue.current) && setCurrentValue(formatFilledPrice(value, isFuturesCode, false));
  }, [value]);

  const handleOnChange = (newValue: string | number) => {
    if (typeof newValue === 'number') {
      onChangeText?.(String(newValue));
      setCurrentValue(formatFilledPrice(newValue, isFuturesCode));
      return;
    }
    onChangeText?.(newValue);
  };

  const onMinus = () => {
    if (typeof value !== 'number') return;
    if (symbolInfo.symbolType === SymbolType.CW || symbolInfo.symbolType === SymbolType.ETF) {
      handleOnChange(
        roundLot(value - 10, market, symbolInfo.symbolType) // truyen currentSymbolInfo.symbolType để lot step là 10
      );
    } else if (isFuturesCode) {
      market != null &&
        handleOnChange(
          roundLot(value - priceStep(value, market, symbolInfo.symbolType), market, symbolInfo.symbolType)
        );
    } else {
      market != null && handleOnChange(roundLot(value - priceStep(value, market), market));
    }
  };

  const onPlus = () => {
    if (typeof value !== 'number') return;
    if (symbolInfo.symbolType === SymbolType.CW || symbolInfo.symbolType === SymbolType.ETF) {
      handleOnChange(
        roundLot(value + 10, market, symbolInfo.symbolType) // truyen currentSymbolInfo.symbolType để lot step là 10
      );
    } else if (isFuturesCode) {
      market != null &&
        handleOnChange(
          roundLot(value + priceStep(value, market, symbolInfo.symbolType), market, symbolInfo.symbolType)
        );
    } else {
      market != null && handleOnChange(roundLot(value + priceStep(value, market), market));
    }
  };

  const onChangePrice = (newPrice: string) => {
    const formattedInputPrice = formatInputPrice(newPrice);
    setCurrentValue(formattedInputPrice);
    const standardForm = toStandardForm(formattedInputPrice);
    handleOnChange(standardForm);
  };

  const formatInputPrice = (newPrice: string) => {
    const price = newPrice.replace(/,$/g, '.').replace(/,/g, '');
    if (PRICE_REGEX.test(price)) return newPrice.replace(/,$/g, '.');
    if (PRICE_REGEX_3_DECIMAL.test(price)) return formatFilledPrice(Number(toStandardForm(price)), isFuturesCode);
    return currentValue.current;
  };

  const toStandardForm = (price: string) => {
    price = price.replace(/,/g, '');
    const numericPrice = (Number(price) * (isFuturesCode ? 1 : 1000)).toFixed(1);
    return String(numericPrice);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlur?.(e);
    if (currentValue.current === '') return;
    if ((Object.values(ISpecialPriceType) as string[]).includes(currentValue.current)) return;
    setCurrentValue(formatNumber(Number(currentValue.current.replace(/,/g, '')), 2, undefined, true));
  };

  return (
    <ValueSelector
      {...valueSelectorProps}
      value={currentValue.current}
      onChangeText={onChangePrice}
      onMinus={onMinus}
      onPlus={onPlus}
      onBlur={handleBlur}
      keyboardType={'decimal-pad'}
    />
  );
};

export default withMemo(PriceSelector);
