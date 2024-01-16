import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useMemo, useRef } from 'react';
import { IProps } from './News.type';
import { navigate } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { useDispatch } from 'react-redux';
import { PAGE_SIZE_NEWS, SocialPostActions } from 'reduxs';

const initializeState = {};

const useNewsLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state] = useMergingState(initializeState, propsRef);
  const dispatch = useDispatch();

  const listNews = useMemo(() => {
    return props.listNews.slice(1, 5);
  }, [props.listNews]);

  useEffect(() => {
    dispatch(SocialPostActions.getPostDetailRequest({ postId: props.newsLatest?.socialNewsId }));
  }, [props.newsLatest?.socialNewsId]);

  useEffect(() => {
    props.getNewsRequest({
      pageNumber: 0,
      pageSize: PAGE_SIZE_NEWS,
      isRefresh: true,
    });
  }, []);

  const handlers = useHandlers({
    onNavigateNews: () => {
      navigate({
        key: ScreenNames.PostDetailScreen,
        params: {
          newsId: propsRef.current.newsLatest.newsId,
          postId: propsRef.current.newsLatest.socialNewsId,
        },
      });
    },
    onNavigateNewsList: () => {
      navigate({ key: ScreenNames.News });
    },
  });

  return {
    state,
    handlers,
    listNews,
  };
};

export { useNewsLogic };
