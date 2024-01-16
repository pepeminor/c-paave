import React, { useCallback } from 'react';
import { BID_ASK_TYPE } from 'interfaces/market';
import { BidOffer, SymbolDataSelector } from 'reduxs/SymbolData';
import withMemo from 'HOC/withMemo';
import { ISpecialPriceType, SymbolSession, SymbolType } from 'constants/enum';
import { MARKET } from 'global';
import { Text, TouchableOpacity, View } from 'react-native';
import globalStyles, { Colors } from 'styles';
import { formatNumber, getColor } from 'utils';
import { useAppSelector } from 'hooks/useAppSelector';
import { triggerFillPrice } from './actions';
import useStyles from './styles';
import { BidOfferElement_getPriceField, calculatePercent } from './helper';
import { store } from 'screens/App';

type IBidOfferElementProps = {
  data: BidOffer | null;
  type: BID_ASK_TYPE;
  key1: string;
  session?: keyof typeof SymbolSession;
  isSpecial?: boolean;
  vibratePrice?: () => void;
};

const BidOfferElement = (props: IBidOfferElementProps) => {
  const { styles } = useStyles();
  const fillPriceTriggered = useAppSelector(state => state.fillPriceTriggered);
  const currentSymbol = useAppSelector(SymbolDataSelector.selectCurrentSymbol, {
    market: true,
    bestBid: true,
    bestOffer: true,
    referencePrice: true,
    ceilingPrice: true,
    floorPrice: true,
    symbolType: true,
  });
  const onPressPrice = useCallback(() => {
    const price: number | ISpecialPriceType = props.data?.price ?? currentSymbol?.referencePrice ?? 0;

    if (props.isSpecial) {
      const isHose = currentSymbol?.market === MARKET.HOSE;
      const isHnx = currentSymbol?.market === MARKET.HNX;

      if (props.session === 'ATO' && isHose) {
        store.dispatch(triggerFillPrice({ value: ISpecialPriceType.ATO, change: !fillPriceTriggered.change }));
      } else if (props.session === 'ATC' && (isHose || isHnx)) {
        store.dispatch(triggerFillPrice({ value: ISpecialPriceType.ATC, change: !fillPriceTriggered.change }));
      }
      return;
    }

    props.vibratePrice?.();
    store.dispatch(triggerFillPrice({ value: price, change: !fillPriceTriggered.change }));
  }, [fillPriceTriggered.change, props.vibratePrice, currentSymbol, props.isSpecial]);

  const percent = calculatePercent(
    currentSymbol?.symbolType as SymbolType,
    currentSymbol?.bestOffer,
    currentSymbol?.bestBid,
    props.data?.volume
  );

  if (currentSymbol == null) return null;

  return (
    <View style={styles.elementContainer} key={props.key1}>
      <TouchableOpacity onPress={onPressPrice} style={styles.elementButton}>
        <Text
          allowFontScaling={false}
          style={[
            styles.textLeft,
            currentSymbol != null &&
              getColor(
                props.isSpecial === true || props.data?.price === 0 ? undefined : props.data?.price,
                currentSymbol.referencePrice,
                currentSymbol.ceilingPrice,
                currentSymbol.floorPrice
              ).textStyle,
          ]}
        >
          {BidOfferElement_getPriceField(props.data, currentSymbol, props.session, props.isSpecial)}
        </Text>
      </TouchableOpacity>
      <View style={styles.quantityTextContainer}>
        <View
          style={{
            ...globalStyles.fillHeight,
            backgroundColor: props.type === BID_ASK_TYPE.ASK ? Colors.Ask : Colors.Bid,
            width: percent,
          }}
        />
        <Text style={styles.quantityText}>{props.data?.volume ? formatNumber(props.data.volume, 2) : '-'}</Text>
      </View>
    </View>
  );
};

export default withMemo(BidOfferElement);
