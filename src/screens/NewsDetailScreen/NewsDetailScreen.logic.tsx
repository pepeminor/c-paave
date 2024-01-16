import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useRef } from 'react';
import { IProps } from './NewsDetailScreen.type';
import { Linking } from 'react-native';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import { navigate } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

const initializeState = {};

const useNewsDetailScreenLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state] = useMergingState(initializeState, propsRef);

  useEffect(() => {
    track(AMPLITUDE_EVENT.VIEW_NEWS, {
      newsId: props.newsData.newsId,
      title: props.newsData.title,
    });
  }, []);

  const handlers = useHandlers({
    onLink: () => {
      Linking.openURL(propsRef.current.newsData.url);
    },
    onPressComment: () => {
      propsRef.current.onPressComment({
        commentId: propsRef.current.dataPost.id,
        userName: propsRef.current.dataPost.account.userName,
      });
    },
    onViewLiked: () => {
      navigate({ key: ScreenNames.LikedScreen, params: { postId: propsRef.current.postId } });
    },
  });

  return {
    state,
    handlers,
  };
};

export { useNewsDetailScreenLogic };
