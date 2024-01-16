import React, { memo, useEffect } from 'react';
import { View } from 'react-native';
import useStyles from './styles';
// Icon
import { useDispatch } from 'react-redux';
import { onEnterOverview, onLeaveOverview } from './action';
import { useAppSelector } from 'hooks';
import { AIRating, FinancialInfo, ForeignTrade, Quote, TVChart, Theme } from './components';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import { SymbolType } from 'constants/enum';

const OverviewContent = () => {
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const currentSymbol = useAppSelector(SymbolDataSelector.selectCurrentSymbol, {
    symbolCode: true,
  });

  const isFuturesCode = currentSymbol?.symbolType === SymbolType.FUTURES;

  useEffect(() => {
    if (!currentSymbol) return;
    dispatch(onEnterOverview(currentSymbol?.symbolCode));
    return () => {
      dispatch(onLeaveOverview(null));
    };
  }, [currentSymbol?.symbolCode]);

  return (
    <>
      <TVChart />
      <FinancialInfo symbolCode={currentSymbol?.symbolCode as string} />
      <Quote />
      <View style={styles.grayLine} />
      {!isFuturesCode && <ForeignTrade />}
      <View style={styles.grayLine} />
      <Theme />
      <View style={styles.grayLine} />
      <AIRating />
    </>
  );
};

export default memo(OverviewContent);
