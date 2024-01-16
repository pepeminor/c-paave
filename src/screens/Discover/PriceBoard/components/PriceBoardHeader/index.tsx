import React from 'react';
import { View } from 'react-native';
import withMemo from 'HOC/withMemo';
import { useDispatch } from 'react-redux';
import { useStyles } from './styles';
import PriceBoardSelector from 'components/PriceBoardSelector';
import PriceBoardHeaderCell from '../PriceBoardHeaderCell.component';
import { useAppSelector } from 'hooks/useAppSelector';
import { PriceBoardActions } from 'reduxs';
import { MarketCategoriesLiteral } from 'screens/PriceBoardFullScreen';
import useHandlers from 'hooks/useHandlers';
import { SortType } from '../../PriceBoard.type';

const PriceBoardHeader = () => {
  const { styles } = useStyles();
  const dispatch = useDispatch();

  const {
    priceBoardType,
    selectedList,
    // Filter
    filterSymbol,
    filterPrice,
    filterChange,
    filterVolume,
    // Value type
    priceChangeType,
    totalType,
  } = useAppSelector(state => state.PriceBoardReducer);

  const handlers = useHandlers({
    setSelectedList: (value: MarketCategoriesLiteral) =>
      dispatch(PriceBoardActions.updatePriceBoardState({ selectedList: value })),
    setSortSymbol: (value: SortType) =>
      dispatch(
        PriceBoardActions.updatePriceBoardState({
          filterSymbol: value,
          filterPrice: undefined,
          filterChange: undefined,
          filterVolume: undefined,
        })
      ),
    setSortPrice: (value: SortType) =>
      dispatch(
        PriceBoardActions.updatePriceBoardState({
          filterSymbol: undefined,
          filterPrice: value,
          filterChange: undefined,
          filterVolume: undefined,
        })
      ),
    setSortChange: (value: SortType) =>
      dispatch(
        PriceBoardActions.updatePriceBoardState({
          filterSymbol: undefined,
          filterPrice: undefined,
          filterChange: value,
          filterVolume: undefined,
        })
      ),
    setSortVolume: (value: SortType) =>
      dispatch(
        PriceBoardActions.updatePriceBoardState({
          filterSymbol: undefined,
          filterPrice: undefined,
          filterChange: undefined,
          filterVolume: value,
        })
      ),
    togglePriceChangeType: () => dispatch(PriceBoardActions.togglePriceChangeType()),
    toggleTotalType: () => dispatch(PriceBoardActions.toggleTotalType()),
  });

  return (
    <>
      <PriceBoardSelector priceBoardType={priceBoardType} value={selectedList} onChange={handlers.setSelectedList} />
      <View style={styles.priceBoardHeaderRow}>
        <PriceBoardHeaderCell
          text="Symbol"
          value={filterSymbol}
          setValue={handlers.setSortSymbol}
          containerStyles={styles.priceBoardCol1}
        />
        <PriceBoardHeaderCell
          text="PRICE"
          value={filterPrice}
          setValue={handlers.setSortPrice}
          containerStyles={styles.priceBoardCol2}
        />
        <PriceBoardHeaderCell
          text={priceChangeType === 'Percent' ? '%' : '+/-'}
          value={filterChange}
          setValue={handlers.setSortChange}
          containerStyles={styles.priceBoardCol3}
          toggleType={handlers.togglePriceChangeType}
        />
        <PriceBoardHeaderCell
          text={totalType === 'Volume' ? 'Total Vol' : 'Total Val'}
          value={filterVolume}
          setValue={handlers.setSortVolume}
          containerStyles={styles.priceBoardCol4}
          toggleType={handlers.toggleTotalType}
        />
      </View>
    </>
  );
};

export default withMemo(PriceBoardHeader);
