import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useStyles from './styles';
import ImagesLogo from 'components/ImagesLogo';
import { useDispatch } from 'react-redux';
import { formatNumber, getColor, getSessionPrice, navigateToSymbolInfoOverview } from 'utils';
import { ACCOUNT_TYPE, LANG } from 'global';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import { useAppSelector } from 'hooks/useAppSelector';
import { putIncreaseSearch, putIncreaseSearchForKis } from 'reduxs/global-actions';
import { WatchListActions } from 'reduxs';
import { RowComponentProps } from 'components/SheetData3';
import useMemoizedStyles from 'hooks/useMemoizedStyles';
import Animated from 'react-native-reanimated';
import withInjectedProps from 'HOC/withInjectProps';

type AdditionalProps = {
  isChangePercent: boolean;
};

const CompositionItem = ({
  data: symbolCode,
  frozenStyle,
  isChangePercent,
}: RowComponentProps<string> & AdditionalProps) => {
  const dispatch = useDispatch();
  const { styles } = useStyles();

  const symbolData = useAppSelector(SymbolDataSelector.selectSymbol(symbolCode), {
    vietnameseName: true,
    englishName: true,
    ceilingPrice: true,
    referencePrice: true,
    floorPrice: true,
    session: true,
    expectedPrice: true,
    currentPrice: true,
    expectedChange: true,
    changePrice: true,
    expectedRate: true,
    changeRate: true,
  });
  const isNullData = symbolData == null;
  const lang = useAppSelector(state => state.lang);
  const selectedAccountType = useAppSelector(state => state.selectedAccount.type);

  const currentPrice = getSessionPrice(
    symbolData?.session,
    symbolData?.expectedPrice,
    symbolData?.currentPrice,
    symbolData?.referencePrice
  );
  const currentChange = getSessionPrice(symbolData?.session, symbolData?.expectedChange, symbolData?.changePrice);
  const currentRate = getSessionPrice(symbolData?.session, symbolData?.expectedRate, symbolData?.changeRate);
  const textColor = getColor(
    currentPrice,
    symbolData?.referencePrice,
    symbolData?.ceilingPrice,
    symbolData?.floorPrice
  ).textStyle;

  const isFuturesCode = symbolData?.symbolType === 'FUTURES';

  const goToStockInfoOverView = useCallback(() => {
    if (isNullData) return;
    switch (selectedAccountType) {
      case ACCOUNT_TYPE.VIRTUAL:
        dispatch(putIncreaseSearch({ code: symbolCode }));
        break;
      case ACCOUNT_TYPE.KIS:
        dispatch(putIncreaseSearchForKis({ code: symbolCode, partnerId: 'kis' }));
        break;
    }
    dispatch(
      WatchListActions.getSymbolIncludeWatchList({
        code: symbolCode,
      })
    );
    navigateToSymbolInfoOverview(symbolCode, dispatch);
  }, [isNullData, selectedAccountType, symbolCode]);

  const memoizedStyles = useMemoizedStyles({
    symbolContainer: [styles.symbolContainer, frozenStyle],
    priceStyles: [styles.number, textColor],
  });

  if (isNullData) return null;

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={goToStockInfoOverView}>
      <Animated.View style={memoizedStyles.symbolContainer}>
        <ImagesLogo codeLogo={symbolCode} logoSize={34} logoStyle={styles.logoContainer} />
        <View style={styles.symbolNameContainer}>
          <Text allowFontScaling={false} style={styles.stockCodeText}>
            {symbolCode}
          </Text>
          <Text allowFontScaling={false} style={styles.fullNameText} numberOfLines={2}>
            {lang === LANG.VI ? symbolData.vietnameseName : symbolData.englishName}
          </Text>
        </View>
      </Animated.View>
      <View style={styles.priceContainer}>
        <Text allowFontScaling={false} style={memoizedStyles.priceStyles}>
          {currentPrice != null
            ? isFuturesCode
              ? formatNumber(currentPrice, 1, undefined, true)
              : formatNumber(currentPrice / 1000, 2, undefined, true)
            : '-'}
        </Text>
      </View>
      {!isChangePercent ? (
        <View style={styles.priceContainer}>
          <Text allowFontScaling={false} style={memoizedStyles.priceStyles}>
            {isFuturesCode
              ? formatNumber(currentChange, 1, undefined, true)
              : formatNumber(currentChange / 1000, 2, undefined, true)}
          </Text>
        </View>
      ) : (
        <View style={styles.priceContainer}>
          <Text allowFontScaling={false} style={memoizedStyles.priceStyles}>
            {`${formatNumber(currentRate, 2, undefined, true)}%`}
          </Text>
        </View>
      )}
      <View style={styles.volumeContainer}>
        <Text allowFontScaling={false} style={styles.number}>
          {`${formatNumber(symbolData.tradingVolume, 2, undefined, true)}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default withInjectedProps<RowComponentProps<string>, AdditionalProps>(memo(CompositionItem));
