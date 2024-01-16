import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import { debounce } from 'lodash';
import { MutableRefObject } from 'react';

const OFFSET_FOREIGN_TRADE = 820;
const OFFSET_QUOTE = 350;

export const checkViewInTab = debounce(
  (
    offset: number,
    symbolCode: string,
    isTrackQuote: MutableRefObject<boolean>,
    isTrackForeignTrade: MutableRefObject<boolean>
  ) => {
    if (offset > OFFSET_FOREIGN_TRADE && isTrackForeignTrade.current) {
      // do something
      isTrackForeignTrade.current = false;
      isTrackQuote.current = true; //reset tracking Quote
      track(AMPLITUDE_EVENT.VIEW_FOREIGN_TRADE_STOCK_INFO, {
        symbolCode,
      });
      return;
    }

    if (offset > OFFSET_QUOTE && offset < OFFSET_FOREIGN_TRADE && isTrackQuote.current) {
      // do something
      isTrackForeignTrade.current = true; //reset tracking ForeignTrade
      isTrackQuote.current = false;
      track(AMPLITUDE_EVENT.VIEW_QUOTE_STOCK_INFO, {
        symbolCode,
      });

      return;
    }

    if (offset < OFFSET_QUOTE) {
      isTrackForeignTrade.current = true; //reset tracking ForeignTrade
      isTrackQuote.current = true; //reset tracking Quote
    }
  },
  3000
);
