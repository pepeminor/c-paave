import { InputAccessoryViewID } from 'constants/enum';
import { useEffect } from 'react';
import { EventListener } from 'utils';

export const Trade_GetLabelName = (nativeID: InputAccessoryViewID) => {
  switch (nativeID) {
    case InputAccessoryViewID.PRICE:
      return 'Price';
    case InputAccessoryViewID.STOP_PRICE:
    case InputAccessoryViewID.STOP_LIMIT_PRICE:
      return 'Stop Price';
    case InputAccessoryViewID.LIMIT_PRICE:
      return 'Limit Price';
    case InputAccessoryViewID.QUANTITY:
      return 'Quantity';
    default:
      return '';
  }
};

const TradeEventListener = new EventListener();

const useSubscribeEndReached = (callBack: () => void) => {
  useEffect(() => {
    const unSubs = TradeEventListener.subscribe('Trade/OnEndReached', callBack);
    return unSubs;
  }, []);
};

const onEndReached = () => {
  TradeEventListener.propogate('Trade/OnEndReached');
};

export const EndReachedEventHandler = {
  onEndReached,
  useSubscribeEndReached,
};
