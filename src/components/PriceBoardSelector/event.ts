import { useEffect } from 'react';
import { MarketCategoriesLiteral } from 'screens/PriceBoardFullScreen';
import { EventListener } from 'utils';

const PriceBoardListener = new EventListener();

export const SelectPriceBoardEventHandler = {
  onPriceBoardSelected(priceBoard: MarketCategoriesLiteral) {
    PriceBoardListener.propogate('PriceBoard/OnPriceBoardSelected', priceBoard);
  },
  useSubscribePriceBoardSelected(callBack: (priceBoard: unknown) => void) {
    useEffect(() => {
      const unSubs = PriceBoardListener.subscribe('PriceBoard/OnPriceBoardSelected', callBack);
      return unSubs;
    }, []);
  },
};
