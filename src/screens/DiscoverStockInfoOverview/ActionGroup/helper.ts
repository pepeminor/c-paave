import { BidOffer } from 'reduxs/SymbolData';

export const calTotalVolume = (data?: BidOffer[]) => {
  if (data == null) return 0;

  return data.reduce((acc, item) => {
    return acc + item.volume;
  }, 0);
};
