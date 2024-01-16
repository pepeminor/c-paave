import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useMemo, useRef } from 'react';
import { IProps } from './SocialSearchHashtag.type';
import { useDispatch } from 'react-redux';
import { IListId, SocialPostActions } from 'reduxs';
import config from 'config';
import { isSameDay } from 'date-fns';

const initializeState = {
  loading: true,
  isDone: false,
  data: [] as IListId[],
};

const PAGE_SIZE = config.pageSize;

const useScreenLogic = (props: IProps) => {
  const dispatch = useDispatch();

  const tagInfo = useMemo(() => {
    const data = props.route?.params?.data;
    if (data == null)
      return {
        hashtag: '',
        totalPosts: 0,
        participants: 0,
        todayPosts: 0,
      };

    const participants = data.history.reduce((acc, cur) => acc + Number(cur.accounts), 0);
    const todayPosts = isSameDay(new Date(), new Date(Number(data.history[0].day) * 1000))
      ? Number(data.history[0].uses)
      : 0;

    return {
      hashtag: data.name,
      totalPosts: data.count,
      participants,
      todayPosts: todayPosts,
    };
  }, [props.route.params]);

  const propsRef = useRef({
    ...props,
    hashtag: tagInfo.hashtag,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state, setState] = useMergingState(initializeState, propsRef);

  useEffect(() => {
    handlers.getNewsFeed();
  }, []);

  const handlers = useHandlers({
    getNewsFeed: (maxId?: string) => {
      dispatch(
        SocialPostActions.getNewsFeedByHashtag({
          payload: {
            hashtag: propsRef.current.hashtag,
            limit: PAGE_SIZE,
            max_id: maxId,
          },
          callBack: {
            handleSuccess(response: IListId[]) {
              if (maxId) {
                setState({
                  data: [...propsRef.current.data, ...response],
                  loading: false,
                  isDone: response.length < PAGE_SIZE,
                });
              } else {
                setState({
                  data: response,
                  loading: false,
                  isDone: response.length < PAGE_SIZE,
                });
              }
            },
            handleFail() {
              setState({
                loading: false,
              });
            },
          },
        })
      );
    },
    onLoadMore: () => {
      if (!propsRef.current.loading && !propsRef.current.isDone) {
        const maxId = propsRef.current.data[propsRef.current.data.length - 1]?.id;
        handlers.getNewsFeed(maxId);
      }
    },
  });

  return {
    state,
    handlers,
    tagInfo,
  };
};

export { useScreenLogic };
