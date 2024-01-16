import React from 'react';
import { Platform } from 'react-native';
import withMemo from 'HOC/withMemo';
import { MarketCategoriesLiteral, PriceBoardType } from 'screens/PriceBoardFullScreen';
import IOSSelectorComponent from './components/IOSSelector.component';
import AndroidSelectorComponent from './components/AndroidSelector.component';
import { SelectPriceBoardEventHandler } from 'components/PriceBoardSelector/event';

interface PriceBoardSelector {
  priceBoardType: PriceBoardType;
  value: string;
  onChange: (value: MarketCategoriesLiteral) => void;
}

const PriceBoardSelector = (props: PriceBoardSelector) => {
  SelectPriceBoardEventHandler.useSubscribePriceBoardSelected(selectedList => {
    props.onChange(selectedList as MarketCategoriesLiteral);
  });

  return Platform.OS === 'ios' ? <IOSSelectorComponent {...props} /> : <AndroidSelectorComponent {...props} />;
};

export default withMemo(PriceBoardSelector);
