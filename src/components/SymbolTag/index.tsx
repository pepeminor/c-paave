import React from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle, TouchableOpacity, Platform } from 'react-native';
import {
  formatNumber,
  getColor,
  getIconColor,
  getSessionBasedValue,
  getSessionPrice,
  hexToRgba,
  navigateToSymbolInfoOverview,
} from 'utils';
import globalStyles, { Colors } from 'styles';
import useStyles from './styles';
import IconIncrease from 'assets/icon/IconIncreaseSymbol.svg';
import IconDecrease from 'assets/icon/IconDecreaseSymbol.svg';
import IconReference from 'assets/icon/IconFreezeSymbol.svg';
import IconCeiling from 'assets/icon/IconCeilingSymbol.svg';
import IconFloor from 'assets/icon/IconFloorSymbol.svg';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import { putIncreaseSearch, putIncreaseSearchForKis } from 'reduxs/global-actions';
import { ACCOUNT_TYPE, LANG } from 'global';
import FlashColorText from 'components/FlashColorText';
import { useAppSelector } from 'hooks/useAppSelector';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import withMemo from 'HOC/withMemo';

type ISymbolComponent = {
  readonly realTimeCode: {
    readonly code: string;
  };
  readonly symbolTagContainer?: StyleProp<ViewStyle>;
  readonly touchableOpacityContainer?: StyleProp<ViewStyle>;

  readonly leftIcon?: Element;

  readonly middleContainer?: StyleProp<ViewStyle>;

  readonly infoContainer?: StyleProp<ViewStyle>;
  readonly stockCode?: StyleProp<TextStyle>;
  readonly skeletonStockCode?: StyleProp<ViewStyle>;
  readonly stockName?: StyleProp<TextStyle>;
  readonly skeletonStockName?: StyleProp<ViewStyle>;

  readonly priceContainer?: StyleProp<ViewStyle>;
  readonly closePrice?: StyleProp<TextStyle>;
  readonly skeletonClosePrice?: StyleProp<ViewStyle>;
  readonly rateChange?: StyleProp<TextStyle>;
  readonly skeletonRateChange?: StyleProp<ViewStyle>;
  readonly changeGapPrice?: StyleProp<TextStyle>;
  readonly skeletonGapPrice?: StyleProp<ViewStyle>;
  readonly skeletonIcon?: StyleProp<ViewStyle>;

  readonly rightElement?: Element;
  readonly hideCode?: boolean;
  readonly hideCode2?: boolean;
  readonly isSpecialCase?: boolean;
  readonly totalTradingValue?: Element;
  readonly totalTradingVolume?: Element;

  readonly codeLogoItems?: Element;
  readonly disabled?: boolean;
};

const SYMBOL_TAG_PRICE_CONTAINER = [globalStyles.flexDirectionRow, globalStyles.alignCenter];

const SYMBOL_TAG_PRICE_WRAPPER = [globalStyles.flexDirectionCol, globalStyles.justifyCenter];

const SYMBOL_TAG_CENTER_ITEM = [globalStyles.container, globalStyles.centered];

const SymbolTag = ({
  realTimeCode,
  symbolTagContainer,
  touchableOpacityContainer,
  leftIcon,
  middleContainer,
  infoContainer,
  stockCode,
  stockName,
  priceContainer,
  closePrice,
  rateChange,
  changeGapPrice,
  rightElement,
  hideCode,
  hideCode2,
  isSpecialCase,
  totalTradingValue,
  totalTradingVolume,
  codeLogoItems,
  disabled,
}: ISymbolComponent) => {
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const lang = useSelector((state: IState) => state.lang);
  const selectedAccount = useSelector((state: IState) => state.selectedAccount);
  const symbolData = useAppSelector(SymbolDataSelector.selectCurrentSymbol, {
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
    vietnameseName: true,
    englishName: true,
  });
  if (!symbolData) {
    return null;
  }
  const goToStockInfoOverView = (code: string) => {
    if (selectedAccount.type === ACCOUNT_TYPE.VIRTUAL) {
      dispatch(putIncreaseSearch({ code: code }));
    }
    if (selectedAccount.type === ACCOUNT_TYPE.KIS) {
      dispatch(putIncreaseSearchForKis({ code: code, partnerId: 'kis' }));
    }
    navigateToSymbolInfoOverview(code, dispatch);
  };

  const isOpenCloseTradingSession = symbolData.session?.match(/ATO|ATC/) != null;

  const getColorValue = (isOpenCloseTradingSession && symbolData?.expectedPrice) || symbolData.currentPrice;

  const sessionPrice = getSessionPrice(
    symbolData.session,
    symbolData.expectedPrice,
    symbolData.currentPrice,
    symbolData.referencePrice
  );

  const sessionPriceColor = getColor(
    getColorValue,
    symbolData.referencePrice,
    symbolData.ceilingPrice,
    symbolData.floorPrice,
    false
  ).textStyle.color;

  const sessionBaseValue = getSessionBasedValue(
    isOpenCloseTradingSession,
    symbolData.expectedChange,
    symbolData.changePrice
  );

  const sessionBaseValue2 = getSessionBasedValue(
    isOpenCloseTradingSession,
    symbolData.expectedRate,
    symbolData.changeRate
  );

  return (
    <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, symbolTagContainer]}>
      <TouchableOpacity
        style={[globalStyles.flexDirectionRow, touchableOpacityContainer]}
        onPress={() => goToStockInfoOverView(realTimeCode.code)}
        disabled={disabled}
      >
        {leftIcon}
        <View style={middleContainer}>
          <View style={globalStyles.flexDirectionRow}>
            <View>{codeLogoItems}</View>
            <View style={infoContainer}>
              {!hideCode2 && (
                <Text allowFontScaling={false} style={stockCode}>
                  {!hideCode && realTimeCode.code}
                </Text>
              )}
              <Text allowFontScaling={false} style={stockName} numberOfLines={2}>
                {lang === LANG.VI ? symbolData.vietnameseName : symbolData.englishName}
              </Text>
            </View>
          </View>
          {isSpecialCase === true ? (
            <View style={globalStyles.container}>
              <View style={[priceContainer, globalStyles.justifyStart]}>
                {getColorValue ? (
                  <FlashColorText
                    changeNumber={sessionPrice}
                    displayValue={
                      symbolData.symbolType === 'FUTURES' || symbolData.symbolType === 'INDEX'
                        ? formatNumber(sessionPrice, 1, undefined, true)
                        : formatNumber(sessionPrice / 1000, 2, undefined, true)
                    }
                    containerStyles={styles.sessionPriceContainer}
                    textStyles={[(closePrice as object) || {}, globalStyles.textFontWeightBold]}
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
                  <View>
                    <View style={styles.skeletonLayout} />
                  </View>
                )}
                <View style={SYMBOL_TAG_PRICE_WRAPPER}>
                  {sessionPriceColor != null ? (
                    <View style={SYMBOL_TAG_PRICE_CONTAINER}>
                      <Text
                        allowFontScaling={false}
                        style={[
                          getColor(
                            getColorValue,
                            symbolData.referencePrice,
                            symbolData.ceilingPrice,
                            symbolData.floorPrice,
                            false
                          ).textStyle,
                          changeGapPrice,
                        ]}
                      >
                        {symbolData.changePrice != null
                          ? symbolData.symbolType === 'FUTURES' || symbolData.symbolType === 'INDEX'
                            ? `${formatNumber(sessionBaseValue, 1, undefined, true)}`
                            : `${formatNumber(sessionBaseValue / 1000, 2, undefined, true)}`
                          : '-'}
                      </Text>
                      <View
                        style={
                          Platform.OS === 'android'
                            ? symbolData.symbolType === 'FUTURES'
                              ? styles.iconContainerAndroid
                              : {}
                            : styles.iconContainerIOS
                        }
                      >
                        {getIconColor(
                          getColorValue,
                          symbolData.referencePrice,
                          symbolData.ceilingPrice,
                          symbolData.floorPrice,
                          <IconIncrease />,
                          <IconDecrease />,
                          <IconReference />,
                          <IconCeiling />,
                          <IconFloor />
                        )}
                      </View>
                    </View>
                  ) : (
                    <View>
                      <View style={styles.skeletonLayout2} />
                    </View>
                  )}

                  <Text
                    allowFontScaling={false}
                    style={[
                      getColor(
                        getColorValue,
                        symbolData.referencePrice,
                        symbolData.ceilingPrice,
                        symbolData.floorPrice,
                        false
                      ).textStyle,
                      rateChange,
                    ]}
                  >
                    {symbolData.changeRate != null ? `${formatNumber(sessionBaseValue2, 2, undefined, true)}` : '-'}%
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <>
              <View style={infoContainer}>
                {!hideCode2 && (
                  <Text allowFontScaling={false} style={stockCode}>
                    {!hideCode && realTimeCode.code}
                  </Text>
                )}

                <Text allowFontScaling={false} style={stockName} numberOfLines={2}>
                  {lang === LANG.VI ? symbolData.vietnameseName : symbolData.englishName}
                </Text>
              </View>
              <View style={priceContainer}>
                <Text
                  allowFontScaling={false}
                  style={[
                    getColor(
                      symbolData.currentPrice,
                      symbolData.referencePrice,
                      symbolData.ceilingPrice,
                      symbolData.floorPrice,
                      false
                    ).textStyle,
                    closePrice,
                  ]}
                >
                  {symbolData.currentPrice === 0
                    ? formatNumber(symbolData.referencePrice, 2)
                    : formatNumber(symbolData.currentPrice, 2)}
                </Text>
                <View style={SYMBOL_TAG_PRICE_CONTAINER}>
                  {symbolData != null ? (
                    <Text
                      allowFontScaling={false}
                      style={[
                        getColor(
                          symbolData.currentPrice,
                          symbolData.referencePrice,
                          symbolData.ceilingPrice,
                          symbolData.floorPrice,
                          false
                        ).textStyle,
                        rateChange,
                      ]}
                    >
                      {formatNumber(symbolData.changeRate, 1)}%
                    </Text>
                  ) : (
                    <View>
                      <View style={styles.skeletonLayout2} />
                    </View>
                  )}
                  {getIconColor(
                    symbolData.currentPrice,
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
                      getColor(
                        symbolData.currentPrice,
                        symbolData.referencePrice,
                        symbolData.ceilingPrice,
                        symbolData.floorPrice,
                        false
                      ).textStyle,
                      changeGapPrice,
                    ]}
                  >
                    {formatNumber(symbolData.changePrice, 2)}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
        {rightElement != null && <View style={SYMBOL_TAG_CENTER_ITEM}>{rightElement}</View>}
        {totalTradingValue && <View style={SYMBOL_TAG_CENTER_ITEM}>{totalTradingValue}</View>}
        {totalTradingVolume && <View style={SYMBOL_TAG_CENTER_ITEM}>{totalTradingVolume}</View>}
      </TouchableOpacity>
    </View>
  );
};

export default withMemo(SymbolTag);
