import React, { ReactElement } from 'react';
import { BID_ASK_TYPE } from 'interfaces/market';
import config from 'config';
import { MergeMarketSymbol } from 'reduxs/SymbolData';
import withMemo from 'HOC/withMemo';
import BidOfferElement from './BidOfferElement';

type IBidOfferProps = {
  currentSymbol: MergeMarketSymbol;
  vibratePrice?: () => void;
};

const BidOffer = ({ currentSymbol, vibratePrice }: IBidOfferProps) => {
  const { symbolType, bestBid, bestOffer, session } = currentSymbol;
  const maxLengthOfBidAsk =
    symbolType === 'FUTURES' ? config.MAX_LENGTH_BEST_BID_ASK_DER : config.MAX_LENGTH_BEST_BID_ASK_EQT;
  const bidOfferList: (ReactElement | null)[] = [];

  if (!bestBid || !bestOffer) {
    for (let index = 0; index < config.bidOfferMinimumElement; index++) {
      bidOfferList.push(
        <BidOfferElement
          data={null}
          type={BID_ASK_TYPE.ASK}
          key={`bo-empty-${index}`}
          key1={`bo-empty-${index}`}
          vibratePrice={vibratePrice}
        />
      );
      bidOfferList.push(
        <BidOfferElement
          data={null}
          type={BID_ASK_TYPE.BID}
          key={`bb-empty-${index}`}
          key1={`bb-empty-${index}`}
          vibratePrice={vibratePrice}
        />
      );
    }
    return <>{bidOfferList}</>;
  }
  // ASK
  let lengthOfBestOffer;

  if (bestBid == null || bestBid.length <= config.bidOfferMinimumElement) {
    lengthOfBestOffer = Math.max(bestOffer.length, config.bidOfferMinimumElement);
  } else {
    lengthOfBestOffer = Math.max(bestOffer.length, bestBid.length);
  }

  for (let index = 0; index < Math.min(lengthOfBestOffer, maxLengthOfBidAsk); index++) {
    const layout =
      bestBid[index] == null ? (
        <BidOfferElement
          data={null}
          type={BID_ASK_TYPE.ASK}
          key={`bo-empty-${index}`}
          key1={`bo-empty-${index}`}
          vibratePrice={vibratePrice}
        />
      ) : (
        <BidOfferElement
          data={bestOffer[index]}
          type={BID_ASK_TYPE.ASK}
          key={`bo-${index}-${bestBid[index].volume}`}
          key1={`bo-${index}-${bestBid[index].volume}`}
          session={session}
          isSpecial={index === 0 && bestOffer[index].price === 0 && bestOffer[index].volume !== 0}
          vibratePrice={vibratePrice}
        />
      );

    bidOfferList.unshift(layout);
  }

  // BID
  let lengthOfBestBid;

  if (bestOffer == null || bestOffer.length <= config.bidOfferMinimumElement) {
    lengthOfBestBid = Math.max(bestBid.length, config.bidOfferMinimumElement);
  } else {
    lengthOfBestBid = Math.max(bestBid.length, bestOffer.length);
  }

  for (let index = 0; index < Math.min(lengthOfBestBid, maxLengthOfBidAsk); index++) {
    const layout =
      bestBid[index] == null ? (
        <BidOfferElement
          data={null}
          type={BID_ASK_TYPE.BID}
          key={`bb-empty-${index}`}
          key1={`bb-empty-${index}`}
          vibratePrice={vibratePrice}
        />
      ) : (
        <BidOfferElement
          data={bestBid[index]}
          type={BID_ASK_TYPE.BID}
          key={`bb-${index}-${bestBid[index].volume}`}
          key1={`bb-${index}-${bestBid[index].volume}`}
          session={session}
          isSpecial={index === 0 && bestBid[index].price === 0 && bestBid[index].volume !== 0}
          vibratePrice={vibratePrice}
        />
      );

    bidOfferList.push(layout);
  }

  return <>{bidOfferList}</>;
};

const BidOffer_compareReRenderFunction = (prevProps: IBidOfferProps, nextProps: IBidOfferProps) => {
  if (prevProps.currentSymbol.symbolType !== nextProps.currentSymbol.symbolType) {
    return false;
  }
  if (prevProps.currentSymbol.bestBid !== nextProps.currentSymbol.bestBid) {
    return false;
  }
  if (prevProps.currentSymbol.bestOffer !== nextProps.currentSymbol.bestOffer) {
    return false;
  }
  if (prevProps.currentSymbol.session !== nextProps.currentSymbol.session) {
    return false;
  }
  if (prevProps.vibratePrice !== nextProps.vibratePrice) {
    return false;
  }
  return true;
};

export default withMemo(BidOffer, BidOffer_compareReRenderFunction);
