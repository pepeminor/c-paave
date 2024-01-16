import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useRef } from 'react';
import { IProps } from './SocialPostDetail.type';

import { SocialText } from 'components/SocialTextInput';

const initializeState = {
  userNameReply: '',
};

const useSocialPostDetailLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state, setState] = useMergingState(initializeState, propsRef);
  const postIdComment = useRef<string>(props.route.params.postId);
  const textInputRef = useRef<SocialText.Input>(null);

  useEffect(() => {
    props.getPostDetail({ postId: props.route.params.postId });
    props.getCommentsOfPost({ postId: props.route.params.postId, isRefresh: true });
  }, []);

  const handlers = useHandlers({
    onPressComment: ({ commentId, userName }: { commentId: string; userName: string }) => {
      postIdComment.current = commentId;
      textInputRef.current?.focus?.();
      const { postId } = propsRef.current.route.params;
      setState({
        userNameReply: commentId === postId ? '' : userName,
      });
    },
    onRefresh: () => {
      const { postId } = propsRef.current.route.params;

      props.getPostDetail({ postId });
      props.getCommentsOfPost({
        postId,
        isRefresh: true,
      });
    },
    onClearReply: () => {
      postIdComment.current = propsRef.current.route.params.postId;
      setState({
        userNameReply: '',
      });
    },
    goBack: () => {
      propsRef.current.resetComment();
      props.navigation.goBack();
    },
  });

  return {
    state,
    handlers,
    refs: {
      postIdComment,
      textInputRef,
    },
  };
};

export { useSocialPostDetailLogic };
