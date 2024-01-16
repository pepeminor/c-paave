import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useMemo, useRef } from 'react';
import { IProps } from './Post.type';
import { filterV2, mapV2, navigate, navigateToSymbolInfoOverview } from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { useDispatch } from 'react-redux';
import { translate } from '@vitalets/google-translate-api';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { isNotNilOrEmpty } from 'ramda-adjunct';

const initializeState = {
  textLines: 0,
  showFullText: false,
  contentPost: '',
  dataContent: { en: '', vi: '' } as { [key: string]: string },
};

const usePostLogic = (props: IProps) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const dispatch = useDispatch();

  const [state, setState] = useMergingState({
    ...initializeState,
    contentPost: props.dataPost.content,
  });
  const propsRef = useRef({
    ...props,
    ...state,
    navigation,
  });
  propsRef.current = { ...propsRef.current, ...props, ...state };

  const dataTags = useMemo(() => {
    return filterV2(props.dataPost?.tags, tag => isNotNilOrEmpty(props.dataSymbolMap[tag.name.toUpperCase()]));
  }, [props.dataPost?.tags, props.dataSymbolMap]);

  useUpdateEffect(() => {
    setState({ contentPost: props.dataPost.content });
  }, [props.dataPost.content]);

  useEffect(() => {
    // get account info mention in content

    mapV2(props.dataPost.mentions, mention => {
      props.getAccountInfoById({ userId: mention.id });
    });
  }, []);

  const handlers = useHandlers({
    navigateToPostDetail: () => {
      navigate({ key: ScreenNames.PostDetailScreen, params: { postId: propsRef.current.postId } });
    },
    onGoToStockOverView: (symbol: string) => {
      navigateToSymbolInfoOverview(symbol, dispatch);
    },
    onTranslateContent: (lang: string) => {
      if (propsRef.current.dataPost.content === propsRef.current.contentPost) {
        if (propsRef.current.dataContent[lang] !== '') {
          setState({ contentPost: propsRef.current.dataContent[lang] });
        } else {
          translate(propsRef.current.dataPost.content, { to: lang }).then(({ text }) => {
            setState(prev => {
              return {
                ...prev,
                contentPost: text,
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

      setState({ contentPost: propsRef.current.dataPost.content });
    },
    onPressComment: () => {
      if (propsRef.current.onPressComment) {
        propsRef.current.onPressComment({
          commentId: propsRef.current.dataPost.id,
          userName: propsRef.current.dataPost.account.userName,
        });
        return;
      }

      propsRef.current.navigation.push(ScreenNames.PostDetailScreen, { postId: propsRef.current.postId });
    },
    onViewLiked: () => {
      navigate({ key: ScreenNames.LikedScreen, params: { postId: propsRef.current.postId } });
    },
  });

  return {
    state,
    handlers,
    dataTags,
  };
};

export { usePostLogic };
