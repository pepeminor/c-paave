import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useRef } from 'react';
import { IProps } from './SocialNewPost.type';
import { SocialText } from 'components/SocialTextInput';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { useAppSelector } from 'hooks';
import { useDispatch } from 'react-redux';
import { SocialNewPostActions } from 'reduxs';
import { PostType } from 'constants/enum';
import { alertMessage, navigationRef, replaceAdjacentReturnCarriage } from 'utils';
import { DiscardAlert } from './components';
import { replaceMentionValues } from 'react-native-controlled-mentions';
import { LANG } from 'global';
import { Keyboard } from 'react-native';
import { store } from 'screens/App';

const MAX_CHARACTER = 5000;

const initializeState = {
  loading: false,
};

const useScreenLogics = (props: IProps) => {
  const dispatch = useDispatch();

  const extraData = useAppSelector(state => state.SocialNewPost.extraData);
  const initContent = useAppSelector(state => state.SocialNewPost.initData?.content ?? '');
  const isEditing = useAppSelector(state => state.SocialNewPost.initData != null);

  const textInputRef = useRef<SocialText.Input>(null);
  const accessoryRef = useRef<SocialText.KeyboardAccessory>(null);
  const pollRef = useRef<SocialText.OpinionPoll>(null);
  const discardAlertRef = useRef<DiscardAlert>(null);
  const scrollViewRef = useRef<KeyboardAwareFlatList>(null);
  const content = useRef<string>(initContent);
  const remainCharacter = useRef<number>(MAX_CHARACTER);

  const propsRef = useRef({
    ...props,
    ...initializeState,
  });
  propsRef.current = { ...propsRef.current, ...props };
  const [state, setState] = useMergingState(initializeState, propsRef);

  useEffect(() => {
    return () => {
      dispatch(SocialNewPostActions.reset());
    };
  }, []);

  const handlers = useHandlers({
    onScroll: (e: any) => {
      textInputRef.current?.onScroll(e);
    },
    onChangeText: (text: string) => {
      if (remainCharacter.current <= 0) return;
      remainCharacter.current = MAX_CHARACTER - text.length;
      accessoryRef.current?.setRemainCharacter(remainCharacter.current);
      content.current = text;
    },
    createPost: () => {
      const status = replaceAdjacentReturnCarriage(
        replaceMentionValues(content.current, mention => mention.trigger + mention.id)
      );
      if (status === '') {
        alertMessage('warning', 'new_post_screen.empty_content_warning');
        return;
      }
      setState({ loading: true });
      Keyboard.dismiss();
      const poll = pollRef.current?.getPollData?.();
      discardAlertRef.current?.disable();
      dispatch(
        SocialNewPostActions.createPost({
          payload: {
            status,
            language: LANG.VI,
            visibility: PostType.PUBLIC,
            poll,
          },
          callBack: {
            handleSuccess: () => {
              setState({ loading: false });
              navigationRef.canGoBack() && navigationRef.goBack();
              dispatch(SocialNewPostActions.updateSuccess(true));
            },
            handleFail: () => {
              setState({ loading: false });
            },
          },
        })
      );
    },
    editPost: () => {
      const status = replaceAdjacentReturnCarriage(
        replaceMentionValues(content.current, mention => mention.trigger + mention.id)
      );
      if (status === '') {
        alertMessage('warning', 'new_post_screen.empty_content_warning');
        return;
      }
      setState({ loading: true });
      Keyboard.dismiss();
      const poll = pollRef.current?.getPollData?.();
      discardAlertRef.current?.disable();
      dispatch(
        SocialNewPostActions.editPost({
          payload: {
            statusID: store.getState().SocialNewPost.initData?.statusID ?? '',
            status,
            poll,
          },
          callBack: {
            handleSuccess: () => {
              setState({ loading: false });
              navigationRef.canGoBack() && navigationRef.goBack();
            },
            handleFail: () => {
              setState({ loading: false });
            },
          },
        })
      );
    },
  });

  return {
    state,
    handlers,
    textInputRef,
    accessoryRef,
    pollRef,
    scrollViewRef,
    discardAlertRef,
    extraData,
    initContent,
    isEditing,
  };
};

export { useScreenLogics };
