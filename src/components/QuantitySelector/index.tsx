import React, { memo, useCallback } from 'react';
import { formatNumber, roundLot } from 'utils';
import { ACCOUNT_TYPE, MARKET } from 'global';
import { IState } from 'reduxs/global-reducers';
import { useSelector } from 'react-redux';
import ValueSelector, { ValueSelectorProps } from 'components/ValueSelector';
import PercentPicker from './PercentPicker';
import { MergeMarketSymbol } from 'reduxs/SymbolData';

interface QuantitySelectorProps extends Omit<ValueSelectorProps, 'value' | 'onMinus' | 'onPlus'> {
  readonly value: number;
  readonly avlQty?: number;
  readonly showPercentPicker: boolean;
  readonly symbolInfo: MergeMarketSymbol;
}

const QuantitySelector = ({
  value,
  onChangeText,
  avlQty,
  showPercentPicker,
  symbolInfo,
  ...valueSelectorProps
}: QuantitySelectorProps) => {
  const selectedAccount = useSelector((state: IState) => state.selectedAccount);

  const handleOnChange = (newValue: string) => {
    onChangeText?.(newValue);
  };

  const onMinus = () => {
    if (symbolInfo.symbolType === 'FUTURES') {
      if (value - 1 <= 0) {
        handleOnChange(`0`);
      } else {
        handleOnChange(`${value - 1}`);
      }
    } else {
      if (value - 100 <= 0) {
        handleOnChange(`0`);
      } else {
        handleOnChange(`${value - 100}`);
      }
    }
  };

  const onPlus = () => {
    if (symbolInfo.symbolType === 'FUTURES') {
      handleOnChange(`${value + 1}`);
    } else {
      handleOnChange(`${value + 100}`);
    }
  };

  const onChangeQuantity = useCallback(
    (text: string) => {
      const text1 = text.replace(/,/g, '');
      if (!isNaN(Number(text1))) {
        handleOnChange(text1);
      } else {
        handleOnChange('0');
      }
    },
    [handleOnChange]
  );

  const onPressMax = useCallback(() => {
    if (avlQty == null) return;
    if (symbolInfo.symbolType === 'FUTURES') {
      onChangeQuantity(`${Math.floor(avlQty)}`);
    } else {
      if (selectedAccount.type === ACCOUNT_TYPE.VIRTUAL) {
        onChangeQuantity(`${roundLot(avlQty, MARKET.HNX)}`); // truyền HNX để lot step là 100
      } else {
        onChangeQuantity(`${Math.floor(avlQty)}`);
      }
    }
  }, [selectedAccount.type, avlQty, onChangeQuantity]);

  const onPress75Percent = useCallback(() => {
    if (avlQty == null) return;
    if (symbolInfo.symbolType === 'FUTURES') {
      onChangeQuantity(`${Math.floor(avlQty * 0.75)}`);
    } else {
      if (selectedAccount.type === ACCOUNT_TYPE.VIRTUAL) {
        onChangeQuantity(`${roundLot(avlQty * 0.75, MARKET.HNX)}`); // truyền HNX để lot step là 100
      } else {
        onChangeQuantity(`${Math.floor(avlQty * 0.75)}`);
      }
    }
  }, [selectedAccount.type, avlQty, onChangeQuantity]);

  const onPress50Percent = useCallback(() => {
    if (avlQty == null) return;
    if (symbolInfo.symbolType === 'FUTURES') {
      onChangeQuantity(`${Math.floor(avlQty * 0.5)}`);
    } else {
      if (selectedAccount.type === ACCOUNT_TYPE.VIRTUAL) {
        onChangeQuantity(`${roundLot(avlQty * 0.5, MARKET.HNX)}`); // truyền HNX để lot step là 100
      } else {
        onChangeQuantity(`${Math.floor(avlQty * 0.5)}`);
      }
    }
  }, [selectedAccount.type, avlQty, onChangeQuantity]);

  const onPress25Percent = useCallback(() => {
    if (avlQty == null) return;
    if (symbolInfo.symbolType === 'FUTURES') {
      onChangeQuantity(`${Math.floor(avlQty * 0.25)}`);
    } else {
      if (selectedAccount.type === ACCOUNT_TYPE.VIRTUAL) {
        onChangeQuantity(`${roundLot(avlQty * 0.25, MARKET.HNX)}`); // truyền HNX để lot step là 100
      } else {
        onChangeQuantity(`${Math.floor(avlQty * 0.25)}`);
      }
    }
  }, [selectedAccount.type, avlQty, onChangeQuantity]);

  return (
    <ValueSelector
      {...valueSelectorProps}
      value={value === 0 ? '' : formatNumber(value)}
      onChangeText={onChangeQuantity}
      onMinus={onMinus}
      onPlus={onPlus}
      keyboardType={'number-pad'}
      BottomSelector={
        <PercentPicker
          showPercentPicker={showPercentPicker}
          onPress25Percent={onPress25Percent}
          onPress50Percent={onPress50Percent}
          onPress75Percent={onPress75Percent}
          onPressMax={onPressMax}
        />
      }
    />
  );
};

export default memo(QuantitySelector);
