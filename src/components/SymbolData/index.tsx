import React, { useEffect, useState, useRef } from 'react';
import { ISymbolData, ISymbolQuote } from '../../interfaces/market';
import { SCChannel } from 'sc-channel';
import { Global } from '../../constants/main';
import { WS } from '../../constants/enum';
import { IWsBidOffer } from '../../interfaces/market/IWsBidOffer';
import { ISymbolDataChildProps } from '../../interfaces/ISymbolDataChildProps';
import { IWrapper } from 'interfaces/IWrapper';

type ISymbolDataProps<T extends ISymbolDataChildProps> = {
  symbolData?: ISymbolData;
  subscribeQuote?: boolean;
  subscribeBidOffer?: boolean;
  subscribeExtra?: boolean;
  childrenClass: React.FC<T>;
  childProps: T;
};

const unsubscribe = (ch: SCChannel | null | undefined) => {
  if (ch != null) {
    ch.unwatch();
    ch.unsubscribe();
    ch.destroy();
  }
};

const SymbolData = <T extends ISymbolDataChildProps>(props: ISymbolDataProps<T>) => {
  const [renderSymbolData, setRenderSymbolData] = useState<ISymbolData | undefined>(props.symbolData);
  const quoteChannel = useRef<IWrapper<SCChannel | undefined>>({ i: undefined });
  const bidOfferChannel = useRef<IWrapper<SCChannel | undefined>>({ i: undefined });
  const extraChannel = useRef<IWrapper<SCChannel | undefined>>({ i: undefined });

  const cleanup = () => {
    unsubscribe(quoteChannel.current.i);
    unsubscribe(bidOfferChannel.current.i);
    unsubscribe(extraChannel.current.i);
  };

  useEffect(() => {
    const socket = Global.sockets[WS.PRICE_BOARD];
    if (props.symbolData != null) {
      if (props.subscribeExtra) {
        extraChannel.current.i = socket?.subscribe(`market.extra.${props.symbolData.s}`);
        if (extraChannel.current.i != null) {
          extraChannel.current.i.watch((data: ISymbolData | undefined) => {
            if (data == null) {
              return;
            }
            setRenderSymbolData({
              ...renderSymbolData,
              ...(data as any as ISymbolData),
            });
          });
        }
      }
      if (props.subscribeBidOffer) {
        bidOfferChannel.current.i = socket?.subscribe(`market.bidOffer.${props.symbolData.s}`);
        if (bidOfferChannel.current.i != null) {
          bidOfferChannel.current.i.watch((data: IWsBidOffer | undefined) => {
            if (data == null) {
              return;
            }
            setRenderSymbolData({
              ...renderSymbolData,
              ...(data as any as ISymbolData),
            });
          });
        }
      }
      if (props.subscribeQuote) {
        quoteChannel.current.i = socket?.subscribe(`market.quote.${props.symbolData.s}`);
        if (quoteChannel.current.i != null) {
          quoteChannel.current.i.watch((data: ISymbolQuote | undefined) => {
            if (data == null) {
              return;
            }
            setRenderSymbolData({
              ...renderSymbolData,
              ...(data as any as ISymbolData),
            });
          });
        }
      }
    }

    return cleanup;
  }, []);

  return <props.childrenClass {...props.childProps} symbolData={renderSymbolData} />;
};

export default SymbolData;
