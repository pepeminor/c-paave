import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useRef } from 'react';
import { IProps } from './NewFeed.type';
import { navigate } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { useIsFocused } from '@react-navigation/native';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';

const initializeState = {};

const useNewFeedLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state] = useMergingState(initializeState, propsRef);
  const isFocused = useIsFocused();

  useEffect(() => {
    props.getNewsFeed({
      params: {
        limit: 10,
      },
    });
  }, []);

  useEffect(() => {
    if (isFocused) {
      track(AMPLITUDE_EVENT.SOCIAL_SCREEN);
    }
  }, [isFocused]);

  const handlers = useHandlers({
    onLoadMore: () => {
      const lengthList = propsRef.current.listPost.length;
      if (lengthList > 0) {
        props.getNewsFeed({
          params: {
            limit: 10,
            max_id: propsRef.current.listPost?.[lengthList - 1]?.id,
          },
        });
      }
    },
    onRefresh: () => {
      props.getNewsFeed({
        params: {
          limit: 10,
          isRefresh: true,
        },
      });
    },
    createPost: () => {
      navigate({
        key: ScreenNames.SocialNewPost,
      });
    },
  });

  return {
    state,
    handlers,
  };
};

export { useNewFeedLogic };
