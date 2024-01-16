import React, { useCallback, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import {
  formatCurrency,
  formatNumber,
  getColor,
  getIconColor,
  getSessionBasedValue,
  getSessionPrice,
  hexToRgba,
  navigateToSymbolInfoOverview,
  isSymbolExist,
} from 'utils';
import globalStyles, { Colors, lightColors } from 'styles';
import useStyles from './styles';
import IconIncrease from 'assets/icon/IconIncreaseSymbol.svg';
import IconDecrease from 'assets/icon/IconDecreaseSymbol.svg';
import IconReference from 'assets/icon/IconFreezeSymbol.svg';
import IconCeiling from 'assets/icon/IconCeilingSymbol.svg';
import IconFloor from 'assets/icon/IconFloorSymbol.svg';
import { useDispatch } from 'react-redux';
import { ACCOUNT_TYPE, LANG } from 'global';
import { putIncreaseSearch, putIncreaseSearchForKis } from 'reduxs/global-actions';
import { useTranslation } from 'react-i18next';
import withMemo from 'HOC/withMemo';
import FlashColorText from 'components/FlashColorText';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import MiniChart from 'components/Chart/MiniChart';
import { WatchListActions, WatchListSelectors } from 'reduxs';
import { WATCH_LIST_TYPE } from 'screens/DiscoverWatchlist/components/WatchListType/WatchListType.type';
import ImagesLogo from 'components/ImagesLogo';
import Animated, { FadeIn, FadeInRight } from 'react-native-reanimated';
import { useAppSelector } from 'hooks/useAppSelector';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import InfoIcon from 'assets/icon/Info.svg';
import Tooltip from 'react-native-walkthrough-tooltip';

type ISymbolComponent = {
  readonly hideCode?: boolean;
  readonly totalTradingValue?: string;
  readonly totalTradingVolume?: string;
  readonly symbolCode: string;

  readonly handleNavigate?: () => void;
  readonly source?: string;

  showChart?: boolean;
  showTotalTrading?: boolean;
  isWatchList?: boolean;
};

const chartConfig = { hideXAxis: true, hideYAxis: true };

const SymbolTag = ({
  hideCode,
  totalTradingValue,
  totalTradingVolume,
  symbolCode,
  handleNavigate,
  showChart,
  source,
  isWatchList = false,
  showTotalTrading = false,
}: ISymbolComponent) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { styles } = useStyles();
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const lang = useAppSelector(state => state.lang);
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const symbolData = useAppSelector(SymbolDataSelector.selectSymbol(symbolCode), {
    symbolCode: true,
    session: true,
    expectedPrice: true,
    expectedRate: true,
    expectedChange: true,
    currentPrice: true,
    changeRate: true,
    referencePrice: true,
    ceilingPrice: true,
    floorPrice: true,
    vietnameseName: true,
    englishName: true,
    tradingValue: true,
    tradingVolume: true,
  });
  const watchListType = useAppSelector(state =>
    isWatchList ? WatchListSelectors.selectWatchListType(state) : WATCH_LIST_TYPE.PRICE
  );

  // tooltip show when delisted stocks
  const contentTooltip = (
    <View style={globalStyles.container2}>
      <Text style={styles.textSymbolNoAvailable}>{t('This symbol is no longer available')}</Text>
    </View>
  );

  const goToStockInfoOverView = useCallback(() => {
    if (!isSymbolExist(symbolCode)) return;
    if (handleNavigate) handleNavigate();
    dispatch(
      WatchListActions.getSymbolIncludeWatchList({
        code: symbolCode,
      })
    );
    track(AMPLITUDE_EVENT.VIEW_STOCK_INFO_DETAIL, {
      selectedAccount: selectedAccount?.selectedSubAccount?.accountName ?? 'NON_LOGIN',
      source: source,
      symbolCode: symbolCode,
    });
    if (selectedAccount.type === ACCOUNT_TYPE.VIRTUAL) {
      dispatch(putIncreaseSearch({ code: symbolCode }));
    }
    if (selectedAccount.type === ACCOUNT_TYPE.KIS) {
      dispatch(putIncreaseSearchForKis({ code: symbolCode, partnerId: 'kis' }));
    }
    navigateToSymbolInfoOverview(symbolCode, dispatch);
  }, [symbolCode, handleNavigate, dispatch, source, selectedAccount?.selectedSubAccount?.accountName]);

  const showNoticeDelistedStocks = useCallback(() => {
    setShowTooltip(pre => !pre);
  }, []);

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

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={goToStockInfoOverView}
      disabled={!symbolData || !isSymbolExist(symbolCode) ? true : false}
    >
      <View style={[styles.leftContainer, showChart && styles.leftContainerWithChart]}>
        <ImagesLogo codeLogo={symbolCode} logoSize={34} logoStyle={styles.logoCode} />
        <View
          style={[
            !symbolData || !isSymbolExist(symbolCode) ? [globalStyles.flexDirectionRow, globalStyles.alignCenter] : {},
            styles.containerInfoSymbol,
          ]}
        >
          <Text allowFontScaling={false} style={styles.stockCode}>
            {!hideCode && symbolCode}
          </Text>
          {!symbolData || !isSymbolExist(symbolCode) ? (
            <TouchableOpacity activeOpacity={1} onPress={showNoticeDelistedStocks} style={styles.spaceButton}>
              <Tooltip
                isVisible={showTooltip}
                content={contentTooltip}
                placement="top"
                onClose={showNoticeDelistedStocks}
                backgroundColor={Colors.Transparent}
                contentStyle={styles.tooltip}
                tooltipStyle={styles.tooltipContainer}
                disableShadow={true}
              >
                <InfoIcon />
              </Tooltip>
            </TouchableOpacity>
          ) : (
            <Text allowFontScaling={false} style={styles.stockName} numberOfLines={1}>
              {lang === LANG.VI ? symbolData.vietnameseName : symbolData.englishName}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.middleContainer}>
        {showChart && watchListType === WATCH_LIST_TYPE.PRICE && symbolData != null && (
          <Animated.View style={styles.chart} entering={FadeIn.duration(500).delay(500)}>
            <MiniChart
              containerStyle={styles.chart}
              chartConfig={chartConfig}
              chartStyle={styles.chartStyle}
              placeHolderStyle={styles.chartStyle}
              symbolCode={symbolData.symbolCode}
              ignoreLunchTime={true}
            />
          </Animated.View>
        )}
        {watchListType === WATCH_LIST_TYPE.PRICE && (
          <Animated.View style={styles.priceContainer} entering={FadeIn.duration(500)}>
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
                    bgColor: Colors.Transparent,
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
                    getColor(
                      sessionPrice,
                      symbolData.referencePrice,
                      symbolData.ceilingPrice,
                      symbolData.floorPrice,
                      false
                    ).textStyle,
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
                    getColor(
                      sessionPrice,
                      symbolData.referencePrice,
                      symbolData.ceilingPrice,
                      symbolData.floorPrice,
                      false
                    ).textStyle,
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
          </Animated.View>
        )}

        {watchListType === WATCH_LIST_TYPE.TRADING_VOLUME && (
          <Animated.View style={styles.containerTradingVolume} entering={FadeIn.duration(500)}>
            {symbolData?.tradingVolume != null ? (
              <FlashColorText
                changeNumber={symbolData.tradingVolume}
                displayValue={formatNumber(symbolData.tradingVolume)}
                containerStyles={[globalStyles.container, globalStyles.justifyCenter, globalStyles.alignEnd]}
                textStyles={styles.priceText}
                colorConfig={{
                  start: {
                    bgColor: hexToRgba(lightColors.BLACK_1, 0.5),
                    txtColor: lightColors.BLACK_1,
                  },
                  steady: {
                    bgColor: hexToRgba(lightColors.BLACK_1, 0.5),
                    txtColor: lightColors.BLACK_1,
                  },
                  end: {
                    bgColor: Colors.Transparent,
                    txtColor: lightColors.BLACK_1,
                  },
                }}
              />
            ) : (
              <Text style={styles.priceText}>-</Text>
            )}
            {symbolData?.tradingValue != null ? (
              <FlashColorText
                changeNumber={symbolData.tradingValue}
                displayValue={formatCurrency(symbolData.tradingValue)}
                containerStyles={[globalStyles.container, globalStyles.justifyCenter, globalStyles.alignEnd]}
                textStyles={styles.priceTextBold}
                colorConfig={{
                  start: {
                    bgColor: hexToRgba(lightColors.BLACK_1, 0.5),
                    txtColor: lightColors.BLACK_1,
                  },
                  steady: {
                    bgColor: hexToRgba(lightColors.BLACK_1, 0.5),
                    txtColor: lightColors.BLACK_1,
                  },
                  end: {
                    bgColor: Colors.Transparent,
                    txtColor: lightColors.BLACK_1,
                  },
                }}
              />
            ) : (
              <Text style={styles.priceText}>-</Text>
            )}
          </Animated.View>
        )}

        {watchListType === WATCH_LIST_TYPE.FOREIGNER_VOLUME && (
          <Animated.View style={styles.containerForeignTradingVolume} entering={FadeInRight.duration(500)}>
            {symbolData?.foreignData?.buyVolume != null && symbolData.currentPrice != null && (
              <View style={styles.priceContainer}>
                <FlashColorText
                  changeNumber={symbolData.foreignData.buyVolume}
                  displayValue={formatNumber(symbolData.foreignData.buyVolume)}
                  containerStyles={[globalStyles.container, globalStyles.justifyCenter, globalStyles.alignEnd]}
                  textStyles={styles.priceText}
                  colorConfig={{
                    start: {
                      bgColor: hexToRgba(lightColors.DARK_GREEN, 0.5),
                      txtColor: lightColors.DARK_GREEN,
                    },
                    steady: {
                      bgColor: hexToRgba(lightColors.DARK_GREEN, 0.5),
                      txtColor: lightColors.DARK_GREEN,
                    },
                    end: {
                      bgColor: Colors.Transparent,
                      txtColor: lightColors.DARK_GREEN,
                    },
                  }}
                />
                <FlashColorText
                  changeNumber={symbolData.foreignData.buyVolume}
                  displayValue={formatCurrency(symbolData.foreignData.buyVolume * symbolData.currentPrice)}
                  containerStyles={[globalStyles.container, globalStyles.justifyCenter, globalStyles.alignEnd]}
                  textStyles={styles.priceTextBold}
                  colorConfig={{
                    start: {
                      bgColor: hexToRgba(lightColors.DARK_GREEN, 0.5),
                      txtColor: lightColors.DARK_GREEN,
                    },
                    steady: {
                      bgColor: hexToRgba(lightColors.DARK_GREEN, 0.5),
                      txtColor: lightColors.DARK_GREEN,
                    },
                    end: {
                      bgColor: Colors.Transparent,
                      txtColor: lightColors.DARK_GREEN,
                    },
                  }}
                />
              </View>
            )}
            {symbolData?.foreignData?.sellVolume != null && symbolData.currentPrice != null && (
              <View style={styles.priceContainer}>
                <FlashColorText
                  changeNumber={symbolData.foreignData.sellVolume}
                  displayValue={formatNumber(symbolData.foreignData.sellVolume)}
                  containerStyles={[globalStyles.container, globalStyles.justifyCenter, globalStyles.alignEnd]}
                  textStyles={styles.priceText}
                  colorConfig={{
                    start: {
                      bgColor: hexToRgba(lightColors.LIGHTRed2, 0.5),
                      txtColor: lightColors.LIGHTRed2,
                    },
                    steady: {
                      bgColor: hexToRgba(lightColors.LIGHTRed2, 0.5),
                      txtColor: lightColors.LIGHTRed2,
                    },
                    end: {
                      bgColor: Colors.Transparent,
                      txtColor: lightColors.LIGHTRed2,
                    },
                  }}
                />
                <FlashColorText
                  changeNumber={symbolData.foreignData.sellVolume}
                  displayValue={formatCurrency(symbolData.foreignData.sellVolume * symbolData.currentPrice)}
                  containerStyles={[globalStyles.container, globalStyles.justifyCenter, globalStyles.alignEnd]}
                  textStyles={styles.priceTextBold}
                  colorConfig={{
                    start: {
                      bgColor: hexToRgba(lightColors.LIGHTRed2, 0.5),
                      txtColor: lightColors.LIGHTRed2,
                    },
                    steady: {
                      bgColor: hexToRgba(lightColors.LIGHTRed2, 0.5),
                      txtColor: lightColors.LIGHTRed2,
                    },
                    end: {
                      bgColor: Colors.Transparent,
                      txtColor: lightColors.LIGHTRed2,
                    },
                  }}
                />
              </View>
            )}
          </Animated.View>
        )}
      </View>
      {totalTradingValue != null && totalTradingVolume != null && (
        <View style={styles.tradingContainer}>
          <Text style={styles.textTradingValue}>{totalTradingVolume}</Text>
          <Text style={styles.textTradingVolume}>{totalTradingValue}</Text>
        </View>
      )}
      {showTotalTrading && (
        <Animated.View style={styles.containerTradingVolume2} entering={FadeIn.duration(500)}>
          {symbolData?.tradingVolume != null ? (
            <FlashColorText
              changeNumber={symbolData.tradingVolume}
              displayValue={formatNumber(symbolData.tradingVolume)}
              containerStyles={[globalStyles.container, globalStyles.justifyCenter, globalStyles.alignEnd]}
              textStyles={styles.priceText}
              colorConfig={{
                start: {
                  bgColor: hexToRgba(lightColors.BLACK_1, 0.5),
                  txtColor: lightColors.BLACK_1,
                },
                steady: {
                  bgColor: hexToRgba(lightColors.BLACK_1, 0.5),
                  txtColor: lightColors.BLACK_1,
                },
                end: {
                  bgColor: Colors.Transparent,
                  txtColor: lightColors.BLACK_1,
                },
              }}
            />
          ) : (
            <Text style={styles.priceText}>-</Text>
          )}
          {symbolData?.tradingValue != null ? (
            <FlashColorText
              changeNumber={symbolData.tradingValue}
              displayValue={formatCurrency(symbolData.tradingValue, showTotalTrading)}
              containerStyles={[globalStyles.container, globalStyles.justifyCenter, globalStyles.alignEnd]}
              textStyles={styles.priceTextBold}
              colorConfig={{
                start: {
                  bgColor: hexToRgba(lightColors.BLACK_1, 0.5),
                  txtColor: lightColors.BLACK_1,
                },
                steady: {
                  bgColor: hexToRgba(lightColors.BLACK_1, 0.5),
                  txtColor: lightColors.BLACK_1,
                },
                end: {
                  bgColor: Colors.Transparent,
                  txtColor: lightColors.BLACK_1,
                },
              }}
            />
          ) : (
            <Text style={styles.priceText}>-</Text>
          )}
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

export default withMemo(SymbolTag);
