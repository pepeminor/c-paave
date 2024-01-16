import { useIsFocused } from '@react-navigation/native';
import { RealtimeChannelDataType } from 'constants/enum';
import useMemoizedParams from 'hooks/useMemoizedParams';
import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { SymbolDataAction } from 'reduxs/SymbolData';

/**
 * useSubscribeSymbol hook is used to subscribe to a symbol.
 *
 * @param codes List symbol code to subscribe to.
 * @param channels List channel type to subscribe to.
 * @param noCleanData If true, the old data will not be cleaned when the symbol is subscribed.
 *
 * @todo: TODO: Throttle symbolCodes change for future optimization
 *
 * @example
 * const symbolCode = 'BTCUSDT';
 * const subDataTypes = [RealtimeChannelDataType.TRADE, RealtimeChannelDataType.KLINE];
 *
 * useSubscribeSymbol(symbolCode, subDataTypes);
 */
export default function useSubscribeSymbol(
  codes: (string | undefined)[] = [],
  channels: (keyof typeof RealtimeChannelDataType)[],
  noCleanData?: boolean
) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const symbolCodes = useMemoizedParams(codes);
  const channelType = useMemoizedParams(channels);

  useEffect(() => {
    if (!isFocused) return;

    const symbols = symbolCodes.filter(s => !!s) as string[];

    dispatch(SymbolDataAction.subscribeSymbols({ symbols, channelType, noCleanData }));

    return () => {
      dispatch(SymbolDataAction.unsubscribeSymbols({ symbols, channelType }));
    };
  }, [isFocused, symbolCodes, channelType, noCleanData]);
}

export function useControlledSubscribeSymbol(
  codes: (string | undefined)[] = [],
  channels: (keyof typeof RealtimeChannelDataType)[],
  initSymbols = 10,
  noCleanData?: boolean
) {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const symbolCodes = useMemoizedParams(codes);
  const channelType = useMemoizedParams(channels);

  const oldSymbolCodes = useRef<string[]>([]);
  const oldChannelType = useRef<(keyof typeof RealtimeChannelDataType)[]>([]);

  const unsubscribe = () => {
    dispatch(
      SymbolDataAction.unsubscribeSymbols({ symbols: oldSymbolCodes.current, channelType: oldChannelType.current })
    );
  };

  const subscribe = useCallback(
    (startIndex: number, endIndex: number) => {
      unsubscribe();
      const symbols = symbolCodes.slice(startIndex, endIndex).filter(s => !!s) as string[];
      dispatch(SymbolDataAction.subscribeSymbols({ symbols, channelType, noCleanData }));
      oldSymbolCodes.current = symbols;
      oldChannelType.current = channelType;
    },
    [symbolCodes, channelType, noCleanData]
  );

  const subscribeRef = useRef(subscribe);
  subscribeRef.current = subscribe;

  useEffect(() => {
    if (!isFocused) return;
    subscribe(0, initSymbols);
    return unsubscribe;
  }, [isFocused, symbolCodes, channelType]);

  return {
    subscribe,
    subscribeRef,
  };
}
