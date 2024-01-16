import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useRef } from 'react';
import { IProps, ILoadMoreParams } from './Watchlist.type';
import { onLoadMoreWatchlistSymbol } from '../../action';
import { useDispatch } from 'react-redux';
import { listType } from '../WatchListType/WatchListType.logic';
import { navigate } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { ViewToken } from '@shopify/flash-list';
import { SymbolDataAction } from 'reduxs';
import { debounce } from 'lodash';
import { useIsFocused } from '@react-navigation/native';

const initializeState = {
  scrollContainerHeight: 0,
  currentIndexWatchList: 1,
  currentY: 0,
  isScrolling: false,
};

const useWatchlistLogic = (props: IProps) => {
  const [state] = useMergingState(initializeState);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const previousSearchTermRef = useRef<number>();
  const previousScrolling = useRef<boolean>();

  const previousListCode = useRef([] as string[]);

  useEffect(() => {
    if (!isFocused) return;

    dispatch(
      SymbolDataAction.subscribeSymbols({
        symbols: previousListCode.current,
        channelType: ['BID_OFFER', 'QUOTE'],
        noCleanData: true,
      })
    );

    return () => {
      dispatch(
        SymbolDataAction.unsubscribeSymbols({
          symbols: previousListCode.current,
          channelType: ['BID_OFFER', 'QUOTE'],
          noCleanData: true,
        })
      );
    };
  }, [isFocused]);

  const propsRefJson = {
    ...props,
    ...state,
  };
  const propsRef = useRef(propsRefJson);
  propsRef.current = propsRefJson;

  const handlers = useHandlers({
    onLoadMoreSymbol: ({ pageNumber, pageSize, ignoreHasMore }: ILoadMoreParams) => {
      dispatch(
        onLoadMoreWatchlistSymbol({
          pageNumber,
          pageSize,
          ignoreHasMore,
        })
      );
    },
    changeType: () => {
      const index = propsRef.current.watchListType.index;
      if (index === listType.length - 1) {
        dispatch(propsRef.current.changeTypeWatchList({ type: listType[0] }));

        return;
      }
      dispatch(propsRef.current.changeTypeWatchList({ type: listType[index + 1] }));
    },
    goToAddSymbolsToWatchList: () => {
      navigate({ key: ScreenNames.AddSymbolsToWatchlist });
    },
    onViewableItemsChanged: (info: { viewableItems: ViewToken[] }) => {
      const { viewableItems } = info;
      handlers.onSubscribeSymbol(viewableItems);
    },
    onSubscribeSymbol: debounce((viewableItems: ViewToken[]) => {
      const symbols = viewableItems.map(item => item.item.code) as string[];
      const listSubscribe = symbols.filter(item => !previousListCode.current.includes(item));
      const listUnsubscribe = previousListCode.current.filter(item => !symbols.includes(item));
      previousListCode.current = symbols;

      dispatch(
        SymbolDataAction.unsubscribeSymbols({
          symbols: listUnsubscribe,
          channelType: ['BID_OFFER', 'QUOTE'],
          noCleanData: true,
        })
      );

      dispatch(
        SymbolDataAction.subscribeSymbols({
          symbols: listSubscribe,
          channelType: ['BID_OFFER', 'QUOTE'],
          noCleanData: true,
        })
      );
    }, 200),
    changeTypeScroll: (moveRight: boolean) => {
      const index = propsRef.current.watchListType.index;
      const newIndex = moveRight ? index + 1 : index - 1;
      if (index === listType.length - 1 && moveRight) {
        dispatch(propsRef.current.changeTypeWatchList({ type: listType[0] }));

        return;
      }

      if (index === 0 && !moveRight) {
        dispatch(propsRef.current.changeTypeWatchList({ type: listType[listType.length - 1] }));

        return;
      }
      dispatch(propsRef.current.changeTypeWatchList({ type: listType[newIndex] }));
    },
  });

  return {
    state,
    handlers,
    refs: {
      previousSearchTermRef,
      previousScrolling,
    },
  };
};

export { useWatchlistLogic };
