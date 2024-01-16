import React, { useEffect, useRef, useState } from 'react';
import { ISymbolData } from 'interfaces/market';
import { ILoadingSymbolDataChildProps } from 'interfaces/ILoadingSymbolDataChildProps';
import { ILoadingReducer } from 'interfaces/reducer';
import { SymbolDataSubscribe } from 'utils';
import { IWrapper } from 'interfaces/IWrapper';
import withMemo from 'HOC/withMemo';

interface IShareSubscribeLoadingSymbolDataProps<T extends ILoadingSymbolDataChildProps> {
  symbol: string;
  childrenClass: React.FC<T>;
  subscriber?: SymbolDataSubscribe;
  screenId: string;
}

const ShareSubscribeLoadingSymbolData = <T extends ILoadingSymbolDataChildProps>(
  props: IShareSubscribeLoadingSymbolDataProps<T> & T
) => {
  const [renderSymbolData, setRenderSymbolData] = useState<ILoadingReducer<ISymbolData | undefined>>(props.symbolData);
  const renderSymbolDataRef = useRef<IWrapper<ILoadingReducer<ISymbolData | undefined>>>({ i: props.symbolData });
  const lastSubscribe = useRef<IWrapper<[string, string] | null>>({ i: null });

  const cleanup = () => {
    if (lastSubscribe.current.i != null) {
      props.subscriber?.unsubscribe(lastSubscribe.current.i[0], lastSubscribe.current.i[1]);
    }
  };

  const dataArrive = (symbolData: ISymbolData) => {
    renderSymbolDataRef.current.i = {
      status: renderSymbolDataRef.current.i.status,
      data: {
        ...renderSymbolDataRef.current.i.data,
        ...symbolData,
      },
    };
    setRenderSymbolData(renderSymbolDataRef.current.i);
  };

  const startSubscribe = () => {
    cleanup();
    props.subscriber?.subscribe(props.screenId, props.symbol, dataArrive);
    lastSubscribe.current.i = [props.screenId, props.symbol];
  };

  const childProps: T = {
    ...props,
    symbolData: renderSymbolData,
    symbol: undefined,
    subscriber: undefined,
    screenId: undefined,
  };

  useEffect(() => {
    return cleanup;
  }, []);

  useEffect(() => {
    renderSymbolDataRef.current.i = props.symbolData;
    setRenderSymbolData(props.symbolData);
    startSubscribe();
  }, [props.symbolData]);

  return <props.childrenClass {...childProps} />;
};

export default withMemo(ShareSubscribeLoadingSymbolData);
