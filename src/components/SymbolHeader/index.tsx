import React, { useCallback, useMemo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

import AskScore from 'assets/icon/AskScore.svg';
import IconIncrease from 'assets/icon/IconIncrease.svg';
import IconIncreaseCeiling from 'assets/icon/IconIncreaseCeiling.svg';
import ReferenceIcon from 'assets/icon/ReferenceIcon.svg';
import IconDecrease2 from 'assets/icon/IconDecrease2.svg';
import IconDecreaseFloor from 'assets/icon/IconDecreaseFloor.svg';
import { triggerFillPrice } from 'components/BidOfferList/BidOffer/BidOfferElement/actions';
import AiRatingModal from 'components/AIRatingModal';
import MiniChart from 'components/Chart/MiniChart';
import {
  formatNumber,
  getColor,
  getIconColor,
  getSessionBasedValue,
  getSessionPrice,
  hexToRgba,
  navigateToSymbolInfoOverview,
} from 'utils';
import { ReducerStatus } from 'interfaces/reducer';
import { useAppSelector } from 'hooks';
import useStyles from './styles';
import globalStyles, { scaleSize } from 'styles';
import ImagesLogo from 'components/ImagesLogo';
import { handleNumberAI } from '../../utils';
import { putIncreaseSearch } from 'reduxs/global-actions';
import { useTranslation } from 'react-i18next';
import { ACCOUNT_TYPE } from 'global';
import FlashColorText, { IBackgroundConfig } from 'components/FlashColorText';
import { useColors } from 'hooks/useStyles';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import withMemo from 'HOC/withMemo';
import { WatchListActions } from 'reduxs';

type ISymbolHeaderProps = {
  reload: boolean;
  vibratePrice?: () => void;
  customNavigate?(): void;
};

const SymbolHeader_ChartContainerStyle = [globalStyles.container, globalStyles.centered];
const SymbolHeader_ChartConfig = { hideXAxis: true, hideYAxis: true };

const SymbolHeader = ({ reload, customNavigate, vibratePrice }: ISymbolHeaderProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const Colors = useColors();

  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const fillPriceTriggered = useAppSelector(state => state.fillPriceTriggered);
  const currentSymbol = useAppSelector(SymbolDataSelector.selectCurrentSymbol, {
    symbolCode: true,
    session: true,
    market: true,
    expectedPrice: true,
    expectedRate: true,
    changeRate: true,
    currentPrice: true,
    referencePrice: true,
    ceilingPrice: true,
    floorPrice: true,
    tradingVolume: true,
  });
  const aiRatingData = useAppSelector(state => state.aiRatingData);
  const isFuturesCode = currentSymbol?.symbolType === 'FUTURES';

  const onPressPrice = useCallback(
    (price: number) => {
      vibratePrice?.();
      dispatch(triggerFillPrice({ value: price, change: !fillPriceTriggered.change }));
    },
    [vibratePrice, fillPriceTriggered.change]
  );

  const handleVisible = useCallback(() => {
    setVisibleModal(pre => !pre);
  }, []);

  const goToAIRatingScreen = useCallback(() => {
    customNavigate && customNavigate();
    setVisibleModal(false);
  }, [customNavigate]);

  const goToStockInfoOverView = useCallback(() => {
    if (currentSymbol) {
      if (selectedAccount.type === ACCOUNT_TYPE.VIRTUAL) {
        dispatch(putIncreaseSearch({ code: currentSymbol.symbolCode }));
      }
      dispatch(
        WatchListActions.getSymbolIncludeWatchList({
          code: currentSymbol.symbolCode,
        })
      );
      navigateToSymbolInfoOverview(currentSymbol.symbolCode, dispatch);
    }
  }, [currentSymbol, selectedAccount.type]);

  const isOpenCloseTradingSession = currentSymbol?.session?.match(/ATO|ATC/) != null;

  const getColorValue = (isOpenCloseTradingSession && currentSymbol?.expectedPrice) || currentSymbol?.currentPrice;

  const sessionPrice = getSessionPrice(
    currentSymbol?.session,
    currentSymbol?.expectedPrice,
    currentSymbol?.currentPrice,
    currentSymbol?.referencePrice
  );

  const sessionPriceColor = getColor(
    getColorValue,
    currentSymbol?.currentPrice === 0 ? 0 : currentSymbol?.referencePrice,
    currentSymbol?.ceilingPrice,
    currentSymbol?.floorPrice
  ).textStyle.color;

  const onPressCurrentPrice = useCallback(() => {
    if (currentSymbol?.currentPrice != null) {
      onPressPrice(currentSymbol.currentPrice === 0 ? currentSymbol.referencePrice : currentSymbol.currentPrice);
    }
  }, [currentSymbol?.currentPrice, currentSymbol?.referencePrice, onPressPrice]);

  const colorConfig = useMemo<IBackgroundConfig>(
    () => ({
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
    }),
    [sessionPriceColor, Colors]
  );

  const volumeTextColorConfig = useMemo<IBackgroundConfig>(
    () => ({
      start: {
        bgColor: hexToRgba(Colors.LIGHTTextContent, 0.5),
        txtColor: Colors.LIGHTTextContent,
      },
      steady: {
        bgColor: hexToRgba(Colors.LIGHTTextContent, 0.5),
        txtColor: Colors.LIGHTTextContent,
      },
    }),
    [Colors]
  );

  const onPressCeilingPrice = useCallback(() => {
    if (currentSymbol?.ceilingPrice != null) {
      onPressPrice(currentSymbol.ceilingPrice);
    }
  }, [currentSymbol?.ceilingPrice, onPressPrice]);

  const onPressFloorPrice = useCallback(() => {
    if (currentSymbol?.floorPrice != null) {
      onPressPrice(currentSymbol.floorPrice);
    }
  }, [currentSymbol?.floorPrice, onPressPrice]);

  return (
    <View>
      <View style={styles.symbolHeaderContainer}>
        <View style={styles.chartLeft}>
          <View style={styles.imageOutContainer}>
            <View style={styles.marginRight10}>
              <View style={globalStyles.flexDirectionRow}>
                <View style={styles.imageContainer}>
                  {currentSymbol != null && (
                    <TouchableOpacity style={styles.fakeImage} onPress={goToStockInfoOverView}>
                      <ImagesLogo codeLogo={currentSymbol.symbolCode} logoSize={40} logoStyle={styles.logoContainer} />
                    </TouchableOpacity>
                  )}
                </View>
                {currentSymbol != null && (
                  <View style={globalStyles.justifyCenter}>
                    <TouchableOpacity style={styles.stockCodeContainer} onPress={goToStockInfoOverView}>
                      <Text allowFontScaling={false} style={styles.stockCode}>
                        {currentSymbol.symbolCode}
                      </Text>
                    </TouchableOpacity>
                    <View style={globalStyles.justifyStart}>
                      <Text allowFontScaling={false} style={styles.marketNameText}>
                        {currentSymbol.market}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
            {aiRatingData.status === ReducerStatus.SUCCESS ? (
              aiRatingData.data != null &&
              aiRatingData.data[0] != null && (
                <View style={styles.scoreContainer}>
                  <Text allowFontScaling={false} style={styles.score}>
                    {handleNumberAI(aiRatingData.data[0].overall)}
                  </Text>
                </View>
              )
            ) : (
              <View>
                <View style={styles.scoreContainerPlaceHolder} />
              </View>
            )}
            {aiRatingData.data != null &&
              aiRatingData.data[0] != null &&
              aiRatingData.status === ReducerStatus.SUCCESS && (
                <TouchableOpacity onPress={handleVisible}>
                  <AskScore width={scaleSize(20)} height={scaleSize(20)} style={styles.askScoreIcon} />
                </TouchableOpacity>
              )}
          </View>
          <View style={styles.price1Container}>
            <View style={globalStyles.flexDirectionRow}>
              <TouchableOpacity onPress={onPressCurrentPrice}>
                {getColorValue && (
                  <FlashColorText
                    changeNumber={sessionPrice}
                    displayValue={
                      isFuturesCode
                        ? formatNumber(sessionPrice, 1, undefined, true)
                        : formatNumber(sessionPrice / 1000, 2, undefined, true)
                    }
                    textStyles={styles.price1}
                    allowFontScaling={false}
                    colorConfig={colorConfig}
                  />
                )}
              </TouchableOpacity>
              <View style={styles.view2}>
                {getColorValue && (
                  <FlashColorText
                    changeNumber={sessionPrice}
                    displayValue={
                      currentSymbol.changePrice != null
                        ? isFuturesCode
                          ? `${formatNumber(
                              getSessionBasedValue(
                                isOpenCloseTradingSession,
                                currentSymbol.expectedChange,
                                currentSymbol.changePrice
                              ),
                              1,
                              undefined,
                              true
                            )}`
                          : `${formatNumber(
                              getSessionBasedValue(
                                isOpenCloseTradingSession,
                                currentSymbol.expectedChange,
                                currentSymbol.changePrice
                              ) / 1000,
                              2,
                              undefined,
                              true
                            )}`
                        : '-'
                    }
                    containerStyles={styles.price2InContainer}
                    textStyles={styles.price2}
                    allowFontScaling={false}
                    colorConfig={colorConfig}
                  />
                )}
                {/* <View style={[globalStyles.flexDirectionRow, globalStyles.alignEnd]}> */}
                {getIconColor(
                  getColorValue,
                  currentSymbol?.currentPrice === 0 ? 0 : currentSymbol?.referencePrice,
                  currentSymbol?.ceilingPrice,
                  currentSymbol?.floorPrice,
                  <IconIncrease width={scaleSize(8)} height={scaleSize(6.67)} style={styles.iconStyle} />,
                  <IconDecrease2 width={scaleSize(8)} height={scaleSize(6.67)} style={styles.iconStyle} />,
                  <ReferenceIcon width={scaleSize(14)} height={scaleSize(14)} style={styles.iconStyle1} />,
                  <IconIncreaseCeiling width={scaleSize(8)} height={scaleSize(6.67)} style={styles.iconStyle} />,
                  <IconDecreaseFloor width={scaleSize(8)} height={scaleSize(6.67)} style={styles.iconStyle} />
                )}
                {getColorValue && (
                  <FlashColorText
                    changeNumber={getSessionBasedValue(
                      isOpenCloseTradingSession,
                      currentSymbol.expectedRate,
                      currentSymbol.changeRate
                    )}
                    displayValue={
                      currentSymbol.changeRate != null
                        ? isFuturesCode
                          ? `${formatNumber(
                              getSessionBasedValue(
                                isOpenCloseTradingSession,
                                currentSymbol.expectedRate,
                                currentSymbol.changeRate
                              ),
                              1,
                              undefined,
                              true
                            )}%`
                          : `${formatNumber(
                              getSessionBasedValue(
                                isOpenCloseTradingSession,
                                currentSymbol.expectedRate,
                                currentSymbol.changeRate
                              ),
                              2,
                              undefined,
                              true
                            )}%`
                        : '-%'
                    }
                    containerStyles={globalStyles.justifyEnd}
                    textStyles={styles.price2}
                    allowFontScaling={false}
                    colorConfig={colorConfig}
                  />
                )}
                {/* </View> */}
              </View>
            </View>
          </View>
        </View>
        <View style={styles.chartRight}>
          <View style={styles.chartContainer}>
            {currentSymbol ? (
              <MiniChart
                containerStyle={SymbolHeader_ChartContainerStyle}
                chartConfig={SymbolHeader_ChartConfig}
                chartStyle={styles.symbolHeaderChartStyle}
                placeHolderStyle={styles.symbolHeaderChartStyle}
                symbolCode={currentSymbol.symbolCode}
                reload={reload}
                ignoreLunchTime={true}
                resolution={'1'}
              />
            ) : (
              <View style={globalStyles.container} />
            )}
            <View style={styles.priceContainer}>
              <View style={globalStyles.centered}>
                <Text style={styles.textPrice}>{t('Vol')}</Text>
                <FlashColorText
                  changeNumber={currentSymbol?.tradingVolume ?? 0}
                  displayValue={formatNumber(currentSymbol?.tradingVolume, undefined, undefined, true)}
                  textStyles={styles.volumeText}
                  colorConfig={volumeTextColorConfig}
                />
              </View>
              <View style={globalStyles.centered}>
                <Text style={styles.textPrice}>{t('CE')}</Text>
                <TouchableOpacity onPress={onPressCeilingPrice}>
                  <Text allowFontScaling={false} style={styles.ceilingText}>
                    {currentSymbol?.ceilingPrice != null
                      ? isFuturesCode
                        ? formatNumber(currentSymbol.ceilingPrice, 1, undefined, true)
                        : formatNumber(currentSymbol.ceilingPrice / 1000, 2, undefined, true)
                      : '-'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={globalStyles.centered}>
                <Text style={styles.textPrice}>{t('FL')}</Text>
                <TouchableOpacity onPress={onPressFloorPrice}>
                  <Text allowFontScaling={false} style={styles.floorText}>
                    {currentSymbol?.floorPrice
                      ? isFuturesCode
                        ? formatNumber(currentSymbol.floorPrice, 1, undefined, true)
                        : formatNumber(currentSymbol.floorPrice / 1000, 2, undefined, true)
                      : '-'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      {visibleModal === true && <AiRatingModal handleVisible={handleVisible} goToAIRatingScreen={goToAIRatingScreen} />}
    </View>
  );
};

export default withMemo(SymbolHeader);
