import { View, Text } from 'react-native';
import React, { useCallback, useState } from 'react';
import withMemo from 'HOC/withMemo';
import { TouchableOpacity } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import ImagesLogo from 'components/ImagesLogo';
import { ACCOUNT_TYPE, LANG } from 'global';
import { useAppSelector } from 'hooks';
import {
  alertMessage,
  formatNumber,
  getColor,
  getIconColor,
  getSessionBasedValue,
  getSessionPrice,
  hexToRgba,
  isSymbolExist,
  navigate,
  navigateToSymbolInfoOverview,
  navigationRef,
} from 'utils';
import { useDispatch } from 'react-redux';
import {
  putIncreaseSearch,
  putIncreaseSearchForKis,
  putSearchUpdateHistory,
  queryFinancialRatioData,
} from 'reduxs/global-actions';
import { SymbolDataSelector, WatchListActions, setCurrentSymbol } from 'reduxs';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { useStyles } from './styles';
import FlashColorText from 'components/FlashColorText';
import IconIncrease from 'assets/icon/IconIncreaseSymbol.svg';
import IconDecrease from 'assets/icon/IconDecreaseSymbol.svg';
import IconReference from 'assets/icon/IconFreezeSymbol.svg';
import IconCeiling from 'assets/icon/IconCeilingSymbol.svg';
import IconFloor from 'assets/icon/IconFloorSymbol.svg';
import NoHeart from 'assets/icon/NoHeart.svg';
import Heart from 'assets/icon/Heart.svg';
import { SearchSymbolFlow } from '../type';
import useUpdateEffect from 'hooks/useUpdateEffect';

type Props = {
  code: string;
  flow: SearchSymbolFlow;
  onPressSymbol?: (code: string) => void;
  isInWatchList?: (code: string) => boolean;
};

const SearchItem = ({ code, flow, onPressSymbol, isInWatchList }: Props) => {
  const { styles, dynamicColors } = useStyles();
  const dispatch = useDispatch();

  const [inWatchlist, setInWatchlist] = useState(isInWatchList?.(code));

  const lang = useAppSelector(state => state.lang);
  const selectedAccountType = useAppSelector(state => state.selectedAccount.type);
  const symbolData = useAppSelector(SymbolDataSelector.selectSymbol(code), {
    vietnameseName: true,
    englishName: true,
    session: true,
    expectedPrice: true,
    currentPrice: true,
    referencePrice: true,
    ceilingPrice: true,
    floorPrice: true,
    expectedChange: true,
    changePrice: true,
    expectedRate: true,
    changeRate: true,
  });

  const handleSymbolItemCode = useCallback(() => {
    if (!isSymbolExist(code)) {
      alertMessage('warning', 'This symbol is no longer available');
      return;
    }

    switch (flow) {
      case 'Search': {
        dispatch(
          WatchListActions.getSymbolIncludeWatchList({
            code,
          })
        );
        navigateToSymbolInfoOverview(code);
        dispatch(
          queryFinancialRatioData({
            code,
          })
        );
        break;
      }
      case 'Trade': {
        navigationRef.current?.goBack();
        break;
      }
      case 'Watchlist': {
        onPressSymbol?.(code);
        setInWatchlist(prev => !prev);
        return;
      }
    }

    if (selectedAccountType === ACCOUNT_TYPE.VIRTUAL) {
      dispatch(putIncreaseSearch({ code }));
    }
    if (selectedAccountType === ACCOUNT_TYPE.KIS) {
      dispatch(putIncreaseSearchForKis({ code, partnerId: 'kis' }));
    }
    dispatch(putSearchUpdateHistory({ code }));
    dispatch(setCurrentSymbol(code));
  }, [code, selectedAccountType, onPressSymbol]);

  const gotoAddWatchlist = useCallback(() => {
    dispatch(setCurrentSymbol(code));
    dispatch(
      WatchListActions.getSymbolIncludeWatchList({
        code,
      })
    );
    navigate({ key: ScreenNames.AddToWatchlists });
  }, [code]);

  const sessionPrice = getSessionPrice(
    symbolData?.session,
    symbolData?.expectedPrice,
    symbolData?.currentPrice,
    symbolData?.referencePrice
  );
  const sessionPriceColor =
    symbolData &&
    getColor(sessionPrice, symbolData.referencePrice, symbolData.ceilingPrice, symbolData.floorPrice, false).textStyle
      .color;

  useUpdateEffect(() => {
    setInWatchlist(isInWatchList?.(code));
  }, [code]);

  if (symbolData == null) return null;

  return (
    <TouchableOpacity style={styles.symbolItemContainer} key={code} onPress={handleSymbolItemCode}>
      <ImagesLogo codeLogo={code} logoSize={34} logoStyle={styles.logoContainer} />
      <View style={styles.nameContainer}>
        <Text allowFontScaling={false} style={styles.stockCodeText}>
          {code}
        </Text>
        <Text allowFontScaling={false} style={styles.fullNameText}>
          {lang === LANG.VI ? symbolData.vietnameseName : symbolData.englishName}
        </Text>
      </View>
      <View style={styles.priceContainer}>
        {symbolData != null && sessionPriceColor != null ? (
          <FlashColorText
            changeNumber={sessionPrice}
            displayValue={
              symbolData.symbolType === 'FUTURES'
                ? formatNumber(sessionPrice, 1, undefined, true)
                : formatNumber(sessionPrice / 1000, 2, undefined, true)
            }
            textStyles={styles.priceText}
            colorConfig={{
              start: {
                bgColor: hexToRgba(sessionPriceColor, 0.5),
                txtColor: sessionPriceColor,
              },
              steady: {
                bgColor: hexToRgba(sessionPriceColor, 0.5),
                txtColor: sessionPriceColor,
              },
              end: {
                bgColor: dynamicColors.Transparent,
                txtColor: sessionPriceColor,
              },
            }}
          />
        ) : (
          <Text>-</Text>
        )}
        <View style={[globalStyles.flexDirectionRow, globalStyles.alignEnd]}>
          <Text
            allowFontScaling={false}
            style={[
              styles.number,
              symbolData != null &&
                getColor(sessionPrice, symbolData.referencePrice, symbolData.ceilingPrice, symbolData.floorPrice, false)
                  .textStyle,
            ]}
          >
            {symbolData != null && symbolData.changePrice != null
              ? symbolData.symbolType === 'FUTURES'
                ? `${formatNumber(
                    getSessionBasedValue(
                      symbolData.session?.match(/^(ATO|ATC)$/) != null,
                      symbolData.expectedChange,
                      symbolData.changePrice
                    ),
                    1,
                    undefined,
                    true
                  )}`
                : `${formatNumber(
                    getSessionBasedValue(
                      symbolData.session?.match(/^(ATO|ATC)$/) != null,
                      symbolData.expectedChange,
                      symbolData.changePrice
                    ) / 1000,
                    2,
                    undefined,
                    true
                  )}`
              : '-'}
          </Text>

          {symbolData != null &&
            getIconColor(
              sessionPrice,
              symbolData.referencePrice,
              symbolData.ceilingPrice,
              symbolData.floorPrice,
              <IconIncrease />,
              <IconDecrease />,
              <IconReference />,
              <IconCeiling />,
              <IconFloor />
            )}

          <Text
            allowFontScaling={false}
            style={[
              styles.number,
              symbolData != null &&
                getColor(sessionPrice, symbolData.referencePrice, symbolData.ceilingPrice, symbolData.floorPrice, false)
                  .textStyle,
            ]}
          >
            {symbolData != null && symbolData.changeRate != null
              ? `${formatNumber(
                  getSessionBasedValue(
                    symbolData.session?.match(/^(ATO|ATC)$/) != null,
                    symbolData.expectedRate,
                    symbolData.changeRate
                  ),
                  2,
                  undefined,
                  true
                )}%`
              : '-%'}
          </Text>
        </View>
      </View>
      {flow === 'Search' && (
        <TouchableOpacity onPress={gotoAddWatchlist} style={styles.heartContainer}>
          <NoHeart width={scaleSize(20)} height={scaleSize(19)} />
        </TouchableOpacity>
      )}
      {flow === 'Watchlist' && (
        <View style={styles.heartContainer}>
          {inWatchlist && <Heart width={scaleSize(20)} height={scaleSize(19)} />}
          {!inWatchlist && <NoHeart width={scaleSize(20)} height={scaleSize(19)} />}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default withMemo(SearchItem);
