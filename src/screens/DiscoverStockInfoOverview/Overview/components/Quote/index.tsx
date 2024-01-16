import React, { memo, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import useStyles from './styles';
import RightIcon from 'assets/icon/RightIcon.svg';
import TradeQuoteList1 from 'components/TradeQuoteList1';
import { useTranslation } from 'react-i18next';
import { navigate } from 'utils';
import VolumesAnalysis from 'components/VolumesAnalysis';
import { useAppSelector } from 'hooks/useAppSelector';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import { SymbolType } from 'constants/enum';

export const Quote = memo(() => {
  const currentSymbol = useAppSelector(SymbolDataSelector.selectCurrentSymbol, {
    symbolCode: true,
    market: true,
  });

  const isFuturesCode = currentSymbol?.symbolType === SymbolType.FUTURES;

  const { t } = useTranslation();
  const { styles } = useStyles();

  const goToQuote = useCallback(() => {
    navigate({ key: 'TradeQuote' });
  }, []);

  return (
    <>
      <View style={styles.grayLine} />
      <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.quoteTextContainer]}>
        <Text allowFontScaling={false} style={styles.quoteText}>
          {t('Quote')}
        </Text>
        <TouchableOpacity
          style={[
            globalStyles.flexDirectionRow,
            globalStyles.container,
            globalStyles.alignCenter,
            { justifyContent: 'flex-end' },
          ]}
        >
          <TouchableOpacity onPress={goToQuote}>
            <Text allowFontScaling={false} style={styles.hotSeeAllStockText}>
              {t('See all')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={goToQuote}>
            <RightIcon width={scaleSize(18)} height={scaleSize(18)} />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      {/* Quote list */}
      <View style={styles.quoteListContainer}>
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText1}>{t('Tick by tick')}</Text>
          <TradeQuoteList1 />
        </View>

        {!isFuturesCode && (
          <View style={styles.volumeAnalysisContainer}>
            <Text style={styles.quoteText1}>{t('Volumes Analysis')}</Text>
            <VolumesAnalysis />
          </View>
        )}
      </View>
    </>
  );
});
