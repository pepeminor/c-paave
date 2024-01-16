import config from 'config';
import { ISpecialPriceType, SymbolSession, SymbolType } from 'constants/enum';
import { BidOffer, MergeMarketSymbol } from 'reduxs';
import { formatNumber, mapV2 } from 'utils';

export const BidOfferElement_getPriceField = (
  data: BidOffer | undefined | null,
  currentSymbol: MergeMarketSymbol,
  session?: keyof typeof SymbolSession,
  isSpecial?: boolean
) => {
  if (data?.price == null) {
    return '-';
  }

  const isFutureSymbol = currentSymbol.symbolType === 'FUTURES';

  if (!isSpecial) {
    if (data.price == null || data.price === 0) return '-';
    if (isFutureSymbol) return formatNumber(data.price, 1, undefined, true);
    return formatNumber(data.price / 1000, 2, undefined, true);
  }

  if (session === SymbolSession.ATO && currentSymbol.market?.match(isFutureSymbol ? /^(HNX)$/ : /^(HOSE)$/)) {
    return ISpecialPriceType.ATO;
  }

  if (session === SymbolSession.ATC && currentSymbol.market?.match(/^(HOSE|HNX)$/)) {
    return ISpecialPriceType.ATC;
  }

  return '-';
};

export const calculatePercent = (
  symbolType?: SymbolType,
  bestOffer?: BidOffer[],
  bestBid?: BidOffer[],
  volume?: number
) => {
  const maxLengthOfBidAsk =
    symbolType === 'FUTURES' ? config.MAX_LENGTH_BEST_BID_ASK_DER : config.MAX_LENGTH_BEST_BID_ASK_EQT;

  if ((bestOffer == null && bestBid == null) || volume == null) return '0%';

  const bestOfferLength = bestOffer?.length ?? 0;
  const bestBidLength = bestBid?.length ?? 0;

  const lengthOfBestOffer =
    bestBidLength <= config.bidOfferMinimumElement
      ? Math.max(bestBidLength, config.bidOfferMinimumElement)
      : Math.max(bestOfferLength, bestBidLength);
  const lengthOfBestBid =
    bestOfferLength <= config.bidOfferMinimumElement
      ? Math.max(bestBidLength, config.bidOfferMinimumElement)
      : Math.max(bestBidLength, bestOfferLength);

  const maxAsk = Math.max(
    ...mapV2(bestOffer?.slice(0, Math.min(lengthOfBestOffer, maxLengthOfBidAsk)), item => item.volume)
  );
  const maxBid = Math.max(
    ...mapV2(bestBid?.slice(0, Math.min(lengthOfBestBid, maxLengthOfBidAsk)), item => item.volume)
  );
  const maxVolume = Math.max(maxAsk, maxBid);

  if (maxVolume > 0) {
    return volume === maxVolume ? '100%' : `${(volume / maxVolume) * 100}%`;
  } else {
    return '0%';
  }
};
