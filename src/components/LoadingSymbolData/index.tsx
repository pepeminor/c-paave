import React, { useEffect, useState, useRef } from 'react';
import { ISymbolData, ISymbolQuote } from '../../interfaces/market';
import { SCChannel } from 'sc-channel';
import { Global } from '../../constants/main';
import { WS } from '../../constants/enum';
import { IWsBidOffer } from '../../interfaces/market/IWsBidOffer';
import { ILoadingSymbolDataChildProps } from '../../interfaces/ILoadingSymbolDataChildProps';
import { ILoadingReducer } from '../../interfaces/reducer';
import { IWrapper } from 'interfaces/IWrapper';

type ILoadingSymbolDataProps<T extends ILoadingSymbolDataChildProps> = {
  symbolData: ILoadingReducer<ISymbolData | undefined>;
  subscribeQuote?: boolean;
  subscribeBidOffer?: boolean;
  subscribeExtra?: boolean;
  childrenClass: React.FC<T>;
  childProps: T;
  pause?: boolean;
};

const unsubscribe = (ch: SCChannel | null | undefined) => {
  if (ch != null) {
    ch.unwatch();
    ch.unsubscribe();
    ch.destroy();
  }
};

const LoadingSymbolData = <T extends ILoadingSymbolDataChildProps>(props: ILoadingSymbolDataProps<T>) => {
  const [renderSymbolData, setRenderSymbolData] = useState<ILoadingReducer<ISymbolData | undefined>>(props.symbolData);
  const startedSubscribe = useRef<IWrapper<string | undefined>>({ i: undefined });
  const quoteChannel = useRef<IWrapper<SCChannel | undefined>>({ i: undefined });
  const bidOfferChannel = useRef<IWrapper<SCChannel | undefined>>({ i: undefined });
  const extraChannel = useRef<IWrapper<SCChannel | undefined>>({ i: undefined });
  const pauseRef = useRef<IWrapper<boolean>>({ i: props.pause === true });
  const pauseRenderSymbolData = useRef<IWrapper<ISymbolData | undefined>>({ i: undefined });

  useEffect(() => {
    // update ref. no rerender
    if (!pauseRef.current.i && props.pause === true) {
      setRenderSymbolData({
        ...renderSymbolData,
        data: pauseRenderSymbolData.current.i,
      });
    }
    pauseRef.current.i = props.pause === true;
  }, [props.pause]);

  const cleanup = () => {
    unsubscribe(quoteChannel.current.i);
    unsubscribe(bidOfferChannel.current.i);
    unsubscribe(extraChannel.current.i);
  };

  const startSubscribe = () => {
    if (props.symbolData.data != null && startedSubscribe.current.i !== props.symbolData.data.s) {
      cleanup();
      startedSubscribe.current.i = props.symbolData.data.s;
      const socket = Global.sockets[WS.PRICE_BOARD];
      if (props.subscribeExtra) {
        extraChannel.current.i = socket?.subscribe(`market.extra.${props.symbolData.data.s}`);
        if (extraChannel.current.i != null) {
          extraChannel.current.i.watch((data: ISymbolData | undefined) => {
            if (data == null) {
              return;
            }
            if (pauseRef.current.i) {
              pauseRenderSymbolData.current.i = {
                ...renderSymbolData.data,
                ...(data as any as ISymbolData),
              };
              return;
            }
            setRenderSymbolData({
              ...renderSymbolData,
              data: {
                ...renderSymbolData.data,
                ...(data as any as ISymbolData),
              },
            });
          });
        }
      }
      if (props.subscribeBidOffer) {
        bidOfferChannel.current.i = socket?.subscribe(`market.bidOffer.${props.symbolData.data.s}`);
        if (bidOfferChannel.current.i != null) {
          bidOfferChannel.current.i.watch((data: IWsBidOffer | undefined) => {
            if (data == null) {
              return;
            }
            if (pauseRef.current.i) {
              pauseRenderSymbolData.current.i = {
                ...renderSymbolData.data,
                ...(data as any as ISymbolData),
              };
              return;
            }
            setRenderSymbolData({
              ...renderSymbolData,
              data: {
                ...renderSymbolData.data,
                ...(data as any as ISymbolData),
              },
            });
          });
        }
      }
      if (props.subscribeQuote) {
        quoteChannel.current.i = socket?.subscribe(`market.quote.${props.symbolData.data.s}`);
        if (quoteChannel.current.i != null) {
          quoteChannel.current.i.watch((data: ISymbolQuote | undefined) => {
            if (data == null) {
              return;
            }
            if (pauseRef.current.i) {
              pauseRenderSymbolData.current.i = {
                ...renderSymbolData.data,
                ...(data as any as ISymbolData),
              };
              return;
            }
            setRenderSymbolData({
              ...renderSymbolData,
              data: {
                ...renderSymbolData.data,
                ...(data as any as ISymbolData),
              },
            });
          });
        }
      }
    }
  };

  useEffect(() => {
    startSubscribe();
    return cleanup;
  }, []);

  useEffect(() => {
    setRenderSymbolData(props.symbolData);
    startSubscribe();
  }, [props.symbolData]);

  return <props.childrenClass {...props.childProps} symbolData={renderSymbolData} />;
};

export default LoadingSymbolData;
