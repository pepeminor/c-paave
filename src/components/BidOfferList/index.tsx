import React, { useState } from 'react';
import { Text, View } from 'react-native';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { useAppSelector } from 'hooks/useAppSelector';
import { SymbolDataSelector } from 'reduxs/SymbolData';
import withMemo from 'HOC/withMemo';
import BidOfferComponent from './BidOffer';

type IBidOfferListProps = {
  vibratePrice?: () => void;
};

enum BID_ASK_OPTION {
  NORMAL = `Normal_B/A`,
  ODDLOT = `Oddlot_B/A`,
}

const BidOfferList = (props: IBidOfferListProps) => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const { styles } = useStyles();
  const currentSymbol = useAppSelector(SymbolDataSelector.selectCurrentSymbol, {
    market: true,
    bestBid: true,
    bestOffer: true,
    referencePrice: true,
    ceilingPrice: true,
    floorPrice: true,
    symbolType: true,
  });
  const [radioValue, setRadioValue] = useState<string>(BID_ASK_OPTION.NORMAL);

  useUpdateEffect(() => {
    if (radioValue === BID_ASK_OPTION.ODDLOT) {
      setRadioValue(BID_ASK_OPTION.NORMAL);
    }
  }, [isFocused]);

  return (
    <View style={currentSymbol?.symbolType === 'FUTURES' ? styles.container2 : styles.container}>
      <View style={styles.bidAskTitleContainerContainer}>
        <Text style={styles.textBid}>{t('Ask')}</Text>
        <Text style={styles.textBid}>{t('QTT')}</Text>
      </View>
      {currentSymbol != null && <BidOfferComponent vibratePrice={props.vibratePrice} currentSymbol={currentSymbol} />}
      <View style={styles.bidAskTitleContainerContainer2}>
        <Text style={styles.textBid}>{t('Bid')}</Text>
        <Text style={styles.textBid}>{t('QTT')}</Text>
      </View>
    </View>
  );
};

export default withMemo(BidOfferList);
