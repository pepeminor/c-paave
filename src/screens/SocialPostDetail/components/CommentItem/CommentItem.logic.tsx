import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useRef } from 'react';
import { IProps } from './CommentItem.type';
import { translate } from '@vitalets/google-translate-api';
import { mapV2 } from 'utils';

const initializeState = {
  content: '',
  dataContent: { en: '', vi: '' } as { [key: string]: string },
};

const useCommentItemLogic = (props: IProps) => {
  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  const [state, setState] = useMergingState(
    {
      ...initializeState,
      content: props.dataComment.content,
    },
    propsRef
  );

  useEffect(() => {
    if (props.isChild) return;
    props.getCommentsOfPost({ postId: props.commentId, isRefresh: true });
  }, []);

  useEffect(() => {
    // get account info mention in content
    mapV2(props.dataComment.mentions, mention => {
      props.getAccountInfoById({ userId: mention.id });
    });
  }, []);

  useEffect(() => {
    setState({ content: props.dataComment.content });
  }, [props.dataComment.content]);

  const handlers = useHandlers({
    onPressComment: () => {
      const { isChild, idParent, dataComment } = propsRef.current;
      propsRef.current.onPressComment({
        commentId: isChild ? idParent : dataComment.id,
        userName: dataComment.account.displayName,
      });
    },
    onTranslateContent: (lang: string) => {
      if (propsRef.current.dataComment.content === propsRef.current.content) {
        if (propsRef.current.dataContent[lang] !== '') {
          setState({ content: propsRef.current.dataContent[lang] });
        } else {
          translate(propsRef.current.dataComment.content, { to: lang }).then(({ text }) => {
            setState(prev => {
              return {
                ...prev,
                content: text,
                dataContent: {
                  ...prev.dataContent,
                  [lang]: text,
                },
              };
            });
          });
        }

        return;
      }

      setState({ content: propsRef.current.dataComment.content });
    },
  });

  return {
    state,
    handlers,
  };
};

export { useCommentItemLogic };
