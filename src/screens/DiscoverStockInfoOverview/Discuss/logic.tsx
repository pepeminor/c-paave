import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { IListId, SocialPostActions } from 'reduxs';
import config from 'config';
import { Props } from '.';

const initializeState = {
  loading: true,
  isDone: false,
  data: [] as IListId[],
};

const PAGE_SIZE = config.pageSize;

const useLogic = (props: Props) => {
  const dispatch = useDispatch();

  const propsRef = useRef({
    ...props,
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
            hashtag: propsRef.current.code,
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
  };
};

export { useLogic };
