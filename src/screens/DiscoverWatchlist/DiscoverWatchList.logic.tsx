/* eslint-disable @typescript-eslint/no-var-requires */
import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useRef, useCallback, useEffect } from 'react';
import { IProps } from './DiscoverWatchList.type';
import { ScrollView } from 'react-native';
import { IPagination } from 'interfaces/common';
import { useIsFocused } from '@react-navigation/native';
import config from 'config';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import useUpdateEffect from 'hooks/useUpdateEffect';
import useAppStateChange from 'hooks/useAppStateChange';
import { AppStateStatus } from 'constants/enum';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';

const initializeState = {
  firstWLLRender: true,
};

const useDiscoverWatchListLogic = (props: IProps) => {
  const [state] = useMergingState(initializeState);

  const scrollRef = useRef<ScrollView>();
  const isFocused = useIsFocused();

  const pagination = useRef<IPagination>({
    pageNumber: 0,
    pageSize: config.pageSize,
  });

  const propsRefJson = {
    ...props,
    ...state,
  };

  const propsRef = useRef(propsRefJson);
  propsRef.current = propsRefJson;

  useAppStateChange(
    useCallback((currentAppState, nextAppState) => {
      if (currentAppState === AppStateStatus.BACKGROUND && nextAppState === AppStateStatus.ACTIVE) {
        props.onEnterScreen({ screenId: ScreenNames.DiscoverWatchlist, pageSize: config.pageSize, refresh: false });
      }
    }, []),
    true
  );

  useEffect(() => {
    if (isFocused) {
      track(AMPLITUDE_EVENT.WATCH_LIST_DETAIL);
    }
  }, [isFocused]);

  useUpdateEffect(() => {
    if (!isFocused) return;
    scrollRef.current?.scrollTo?.({
      y: 0,
      animated: true,
    });
    props.onEnterScreen({ screenId: ScreenNames.DiscoverWatchlist, pageSize: config.pageSize, refresh: false });
  }, [isFocused]);

  const handlers = useHandlers({
    goToAddSymbolsToWatchList: () => {
      propsRef.current.navigation.navigate(ScreenNames.AddSymbolsToWatchlist);
    },
    goToDeleteSymbolsToWatchList: () => {
      propsRef.current.navigation.navigate(ScreenNames.DeleteSymbolsWatchList);
    },

    onResetPagination: () => {
      pagination.current = {
        pageNumber: 0,
        pageSize: config.pageSize,
      };
    },
  });

  return {
    state,
    handlers,
    refs: {
      pagination,
    },
  };
};

export { useDiscoverWatchListLogic };
