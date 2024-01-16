import React from 'react';
import { View } from 'react-native';
import { useTradeFormLayoutLogic } from './TradeFormLayout.logic';
import { IProps } from './TradeFormLayout.type';
import withMemo from 'HOC/withMemo';
import globalStyles from 'styles';
import SymbolHeader from 'components/SymbolHeader';
import BidOfferList from 'components/BidOfferList';
import { TradeForm } from './components';

const TradeFormLayout = (props: IProps) => {
  const { handlers, state } = useTradeFormLayoutLogic(props);
  return (
    <View style={globalStyles.container}>
      <SymbolHeader
        vibratePrice={handlers.onVibratePrice}
        reload={state.reload}
        customNavigate={handlers.goToAiRating}
      />
      <View style={globalStyles.flexDirectionRow}>
        <BidOfferList vibratePrice={handlers.onVibratePrice} />
        <TradeForm
          ref={props.tradeFormRef}
          isHaveCurrentSymbol={props.isHaveCurrentSymbol}
          triggerReload={props.triggerReload}
          nativeIDForAndroid={props.nativeIDForAndroid}
          priceAccessoriesData={props.priceAccessoriesData}
          onChangeNativeIDForAndroid={props.onChangeNativeIDForAndroid}
        />
      </View>
    </View>
  );
};

export default withMemo(TradeFormLayout);
