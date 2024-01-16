import React, { memo, useEffect, useRef } from 'react';
import DiscoverStockInfoOverview from 'screens/DiscoverStockInfoOverview';
import IndexInfo from 'screens/IndexInfo';
import { StackScreenProps } from 'screens/RootNavigation';
import Orientation from 'react-native-orientation-locker';
import { useAppSelector } from 'hooks';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { useDispatch } from 'react-redux';
import { setCurrentSymbol } from 'reduxs';
import { useIsFocused } from '@react-navigation/native';

const SymbolInfoOverview = ({ navigation, route }: StackScreenProps<'SymbolInfoOverview'>) => {
  const { symbolType } = route.params ?? {};
  const dispatch = useDispatch();

  const isFocused = useIsFocused();
  const symbolCode = useAppSelector(state => state.SymbolData.currentSymbolCode);
  const symbolCodeRef = useRef<string>(symbolCode);

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  useUpdateEffect(() => {
    if (symbolCodeRef.current !== symbolCode && isFocused) {
      dispatch(setCurrentSymbol(symbolCodeRef.current));
    }
  }, [isFocused]);

  if (symbolType === 'INDEX') {
    return <IndexInfo navigation={navigation} />;
  }
  return <DiscoverStockInfoOverview navigation={navigation} />;
};

export default memo(SymbolInfoOverview);
