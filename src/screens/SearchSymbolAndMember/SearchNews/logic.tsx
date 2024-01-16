import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { RefObject, useEffect, useRef } from 'react';
import { IProps } from './type';
import { PAGE_SIZE_NEWS } from 'reduxs';
import { debounce } from 'lodash';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { RefBtnScrollToTop } from 'components/ButtonScrollToTop';

const initializeState = {
  searchValue: '',
  refreshing: false,
};

const useNewsLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state, setState] = useMergingState(initializeState, propsRef);
  const flatListRef = useRef<FlatList>(null);
  const btnScrollToTopRef: RefObject<RefBtnScrollToTop | undefined> = useRef();

  useEffect(() => {
    if (propsRef.current.refreshing && props.listNews.length > 0) {
      setState({
        refreshing: false,
      });
    }
  }, [props.listNews]);

  const handlers = useHandlers({
    onChangeSearchValue: (value: string) => {
      setState({
        searchValue: value,
      });
      if (value === '') {
        propsRef.current.clearSearch();
        return;
      }
      handlers.onSearch(value);
    },
    onSearch: debounce((value: string) => {
      props.getNews({
        keyword: value,
        pageNumber: 0,
        pageSize: PAGE_SIZE_NEWS,
        isRefresh: true,
      });
    }, 500),
    onLoadMore: () => {
      if (
        propsRef.current.searchValue !== '' &&
        propsRef.current.listNewsSearch.length > 0 &&
        !propsRef.current.isEndListNewsSearch
      ) {
        props.getNews({
          keyword: propsRef.current.searchValue,
          pageNumber: Math.round(propsRef.current.listNewsSearch.length / PAGE_SIZE_NEWS),
          pageSize: PAGE_SIZE_NEWS,
        });
        return;
      }

      if (
        !propsRef.current.isEndListNews &&
        propsRef.current.searchValue === '' &&
        propsRef.current.listNews.length > 0
      ) {
        props.getNews({
          pageNumber: propsRef.current.listNews.length / PAGE_SIZE_NEWS,
          pageSize: PAGE_SIZE_NEWS,
        });
      }
    },
    onRefresh: () => {
      setState({ refreshing: true });
      props.getNews({
        keyword: propsRef.current.searchValue,
        pageNumber: 0,
        pageSize: PAGE_SIZE_NEWS,
        callback: () => {
          setState({ refreshing: false });
        },
      });
    },
    onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      btnScrollToTopRef.current?.onScroll(e);
    },
  });

  return {
    state,
    handlers,
    refs: {
      flatListRef,
      btnScrollToTopRef,
    },
  };
};

export { useNewsLogic };
