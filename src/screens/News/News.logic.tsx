import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { RefObject, useEffect, useRef } from 'react';
import { IProps } from './News.type';
import { PAGE_SIZE_NEWS } from 'reduxs';
import { debounce } from 'lodash';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { RefBtnScrollToTop } from 'components/ButtonScrollToTop';
import { navigate } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

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
      if (value === '') {
        propsRef.current.clearSearch();
        setState({
          searchValue: value,
        });

        return;
      }
      handlers.onSearch(value);
    },
    onSearch: debounce((value: string) => {
      setState({
        searchValue: value,
      });
      props.getNews({
        keyword: value,
        pageNumber: 0,
        pageSize: PAGE_SIZE_NEWS,
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
        pageNumber: 0,
        pageSize: PAGE_SIZE_NEWS,
        isRefresh: true,
      });
    },
    onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      btnScrollToTopRef.current?.onScroll(e);
    },
    goToSearch: () => {
      navigate({
        key: ScreenNames.SearchSymbolAndMember,
        params: {
          initTab: 'NEWS',
        },
      });
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
