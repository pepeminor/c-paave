import React, { useCallback, useEffect, useState } from 'react';
import PieChart from 'components/Chart/PieChart';
import NoDataPieChart from 'components/Chart/NoDataPieChart';
import { useAppSelector } from 'hooks';
import withMemo from 'HOC/withMemo';
import { ReducerStatus } from 'interfaces/reducer';
import { ActivityIndicator, View } from 'react-native';
import globalStyles from 'styles';
import StockList from 'components/StockList';
import { InvestmentSelectors } from 'reduxs';
import { filterV2, mapV2 } from 'utils/common';

const LoadingContainerStyle = { ...globalStyles.centered, ...globalStyles.fillHeight };

const StockCodeList = () => {
  const followingProfitLoss = useAppSelector(InvestmentSelectors.selectedProfitLoss(true));
  const profitLossItems = useAppSelector(InvestmentSelectors.selectedProfitLossItems(true));
  const profitLossStockCodes = useAppSelector(InvestmentSelectors.selectedProfitLossStockCodes(true));

  const [listItems, setListItems] = useState(profitLossItems ?? []);
  const [listCodes, setListCodes] = useState(profitLossStockCodes ?? []);

  useEffect(() => {
    setListItems(profitLossItems);
    setListCodes(profitLossStockCodes);
  }, [profitLossItems]); //Avoid rendering 2 times unnecessarily, only rerun when "profitLossItems" changes

  const setDataFilter = useCallback(
    (industry: string) => {
      if (industry !== '') {
        const data = filterV2(profitLossItems, item => item.sectorName === industry);
        const listStockCodes = mapV2(data, item => item.stockCode);
        setListItems(data);
        setListCodes(listStockCodes);

        return;
      }

      setListItems(profitLossItems);
      setListCodes(profitLossStockCodes);
      // dispatch(InvestmentActions.onFilterProfitLossItem({ industry, isOtherUser: false, index }));
    },
    [profitLossItems, profitLossStockCodes]
  );

  if (followingProfitLoss.status === ReducerStatus.LOADING) {
    return (
      <View style={LoadingContainerStyle}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  if (followingProfitLoss?.data == null || followingProfitLoss?.data?.profitLossItems?.length === 0) {
    return <NoDataPieChart />;
  }

  return (
    <>
      <PieChart
        setData={setDataFilter}
        data={followingProfitLoss.data!}
        isVisibleStockBalance={false}
        status={followingProfitLoss.status}
      />

      <StockList
        setDataStock={setListCodes}
        scrollEnabled={false}
        isFullData={true}
        isOtherUser={true}
        listItems={listItems}
        listCodes={listCodes}
        isOwner={false}
      />
    </>
  );
};

export default withMemo(StockCodeList);
