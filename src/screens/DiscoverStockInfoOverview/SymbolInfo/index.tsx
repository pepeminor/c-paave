import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import { formatNumber, handleNumberAI, navigateReplace } from 'utils';
import SymbolTag from 'components/SymbolTag';
import ImagesLogo from 'components/ImagesLogo';
import { ReducerStatus } from 'interfaces/reducer';
import AskScore from 'assets/icon/AskScore.svg';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'hooks';
import AIRatingModal from 'components/AIRatingModal';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import withMemo from 'HOC/withMemo';

const SymbolInfo = () => {
  const currentSymbol = useAppSelector(SymbolDataSelector.selectCurrentSymbol, {
    symbolCode: true,
    symbolType: true,
    ceilingPrice: true,
    referencePrice: true,
    floorPrice: true,
  });
  const { t } = useTranslation();
  const { styles } = useStyles();
  const aiRatingData = useAppSelector(state => state.aiRatingData);
  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  const SYMBOL_INFO_CLOSE_PRICE_STYLE = [
    styles.closePrice,
    currentSymbol?.symbolType === 'FUTURES' ? styles.fontSize20 : {},
  ];

  const SYMBOL_INFO_CLOSE_RATE_CHANGE_STYLE = [
    styles.rateChange,
    currentSymbol?.symbolType === 'FUTURES' ? [styles.fontSize12, styles.spacePrice] : {},
  ];

  const SYMBOL_INFO_CHANGE_GAP_PRICE_STYLE = [
    styles.changeGapPrice,
    currentSymbol?.symbolType === 'FUTURES' ? [styles.fontSize12, styles.spacePrice] : {},
  ];

  const handleVisible = () => {
    setVisibleModal(pre => !pre);
  };

  const goToAIRatingScreen = () => {
    navigateReplace(ScreenNames.HomeTab, { tab: 'Insights' });
    setVisibleModal(false);
  };

  return (
    <View style={styles.stockInfoContainer2}>
      <View style={globalStyles.container}>
        {currentSymbol?.symbolCode ? (
          <SymbolTag
            codeLogoItems={
              <ImagesLogo codeLogo={currentSymbol.symbolCode} logoSize={32} logoStyle={styles.logoContainer} />
            }
            realTimeCode={{ code: currentSymbol.symbolCode }}
            symbolTagContainer={styles.symbolTagContainer}
            touchableOpacityContainer={styles.touchableOpacityContainer}
            middleContainer={styles.middleContainer}
            infoContainer={styles.infoContainer}
            stockName={styles.stockName}
            priceContainer={styles.priceContainer}
            closePrice={SYMBOL_INFO_CLOSE_PRICE_STYLE}
            rateChange={SYMBOL_INFO_CLOSE_RATE_CHANGE_STYLE}
            changeGapPrice={SYMBOL_INFO_CHANGE_GAP_PRICE_STYLE}
            hideCode={true}
            hideCode2={true}
            isSpecialCase={true}
            disabled={true}
          />
        ) : (
          <View style={globalStyles.container} />
        )}
      </View>

      <View style={styles.containerRight}>
        <View style={styles.containerAiRating}>
          {aiRatingData.status === ReducerStatus.SUCCESS &&
            aiRatingData.data != null &&
            aiRatingData.data[0] != null && (
              <>
                <View style={styles.scoreContainer}>
                  <Text allowFontScaling={false} style={styles.score}>
                    {handleNumberAI(aiRatingData.data[0].overall)}
                  </Text>
                </View>
                <TouchableOpacity onPress={handleVisible}>
                  <AskScore width={scaleSize(20)} height={scaleSize(20)} style={styles.askScoreIcon} />
                </TouchableOpacity>
              </>
            )}
        </View>

        <View style={styles.wrapCurrentSymbol}>
          <View style={styles.containerPrice}>
            <Text style={styles.textPrice}>{t('CE')}</Text>
            <TouchableOpacity>
              <Text allowFontScaling={false} style={styles.textCeiling}>
                {currentSymbol && currentSymbol.ceilingPrice
                  ? currentSymbol.symbolType === 'FUTURES'
                    ? formatNumber(currentSymbol.ceilingPrice, 1, undefined, true)
                    : formatNumber(currentSymbol.ceilingPrice / 1000, 2, undefined, true)
                  : '-'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerPrice}>
            <Text style={styles.textPrice}>{t('REF')}</Text>
            <TouchableOpacity>
              <Text allowFontScaling={false} style={styles.textRef}>
                {currentSymbol
                  ? currentSymbol.symbolType === 'FUTURES'
                    ? formatNumber(currentSymbol.referencePrice, 1, undefined, true)
                    : formatNumber(currentSymbol.referencePrice / 1000, 2, undefined, true)
                  : '-'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containerPrice}>
            <Text style={styles.textPrice}>{t('FL')}</Text>
            <TouchableOpacity>
              <Text allowFontScaling={false} style={styles.textFloor}>
                {currentSymbol && currentSymbol.floorPrice
                  ? currentSymbol.symbolType === 'FUTURES'
                    ? formatNumber(currentSymbol.floorPrice, 1, undefined, true)
                    : formatNumber(currentSymbol.floorPrice / 1000, 2, undefined, true)
                  : '-'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {visibleModal === true && <AIRatingModal handleVisible={handleVisible} goToAIRatingScreen={goToAIRatingScreen} />}
    </View>
  );
};

export default withMemo(SymbolInfo);
