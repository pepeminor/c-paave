import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react';
import { Keyboard, NativeSyntheticEvent, TextInputContentSizeChangeEventData, View } from 'react-native';
import useStyles from '../SocialPostDetail.style';
import withMemo from 'HOC/withMemo';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { SocialText } from 'components/SocialTextInput';
import Icon from 'components/Icon';
import { scaleSize } from 'styles';
import { useAppSelector, useKeyboard } from 'hooks';
import { useTranslation } from 'react-i18next';
import { replaceMentionValues } from 'react-native-controlled-mentions';
import { useDispatch } from 'react-redux';
import { SocialNewPostActions } from 'reduxs';
import { LANG } from 'global';
import { PostType } from 'constants/enum';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { alertMessage, insertObjectIf, replaceAdjacentReturnCarriage } from 'utils';
import { IS_ANDROID } from 'constants/main';

const MAX_CHARACTER = 5000;

interface IProps {
  postIdComment: MutableRefObject<string>;
  textInputRef: React.RefObject<SocialText.Input>;
  onClearReply: () => void;
}

const InputComment = (props: IProps) => {
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();
  const extraData = useAppSelector(state => state.SocialNewPost.extraData);
  const initContent = useAppSelector(state => state.SocialNewPost.initData?.content ?? '');
  const initData = useAppSelector(state => state.SocialNewPost.initData);
  const isEdit = initData != null;
  const textComment = useRef<string>(initContent);
  const accessoryRef = useRef<SocialText.KeyboardAccessory>(null);
  const pollRef = useRef<SocialText.OpinionPoll>(null);
  const scrollViewRef = useRef<KeyboardAwareFlatList>(null);
  const remainCharacter = useRef<number>(MAX_CHARACTER);
  const [keyboardHeight] = useKeyboard();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [expandInput, setExpandInput] = React.useState(false);
  const [heightTextInput, setHeighTextInput] = React.useState(scaleSize(40));

  useEffect(() => {
    accessoryRef.current?.setRemainCharacter(remainCharacter.current);
    remainCharacter.current = MAX_CHARACTER - initContent.length;
    textComment.current = initContent;

    props.textInputRef.current?.changeText?.(initContent);
  }, [initContent]);

  const onChangeText = useCallback((text: string) => {
    if (remainCharacter.current <= 0) return;
    remainCharacter.current = MAX_CHARACTER - text.length;
    accessoryRef.current?.setRemainCharacter(remainCharacter.current);
    textComment.current = text;
  }, []);

  const onSendComment = useCallback(() => {
    const status = replaceAdjacentReturnCarriage(
      replaceMentionValues(textComment.current, mention => mention.trigger + mention.id)
    );

    if (status === '') {
      alertMessage('warning', 'new_post_screen.empty_content_warning');

      return;
    }
    setLoading(true);
    Keyboard.dismiss();
    const poll = pollRef.current?.getPollData?.();
    dispatch(
      SocialNewPostActions.createPost({
        payload: {
          status,
          language: LANG.VI,
          visibility: PostType.UNLISTED,
          poll,
          in_reply_to_id: props.postIdComment.current,
        },
        callBack: {
          handleSuccess: () => {
            setLoading(false);
            dispatch(SocialNewPostActions.updateSuccess(true));
            dispatch(SocialNewPostActions.reset());
            props.textInputRef.current?.clearText?.();
            textComment.current = '';
            remainCharacter.current = MAX_CHARACTER;
            accessoryRef.current?.setRemainCharacter(remainCharacter.current);

            props.onClearReply();
          },
          handleFail: () => {
            setLoading(false);
          },
        },
      })
    );
  }, []);

  const onEditComment = useCallback(() => {
    const status = replaceAdjacentReturnCarriage(
      replaceMentionValues(textComment.current, mention => mention.trigger + mention.id)
    );
    if (status === '') {
      alertMessage('warning', 'new_post_screen.empty_content_warning');

      return;
    }
    setLoading(true);
    Keyboard.dismiss();
    const poll = pollRef.current?.getPollData?.();
    dispatch(
      SocialNewPostActions.editPost({
        payload: {
          statusID: initData?.statusID ?? '',
          status,
          poll,
        },
        callBack: {
          handleSuccess: () => {
            setLoading(false);
            dispatch(SocialNewPostActions.updateSuccess(true));
            dispatch(SocialNewPostActions.reset());
            props.textInputRef.current?.clearText?.();
            textComment.current = '';
            remainCharacter.current = MAX_CHARACTER;
            accessoryRef.current?.setRemainCharacter(remainCharacter.current);

            props.onClearReply();
          },
          handleFail: () => {
            setLoading(false);
          },
        },
      })
    );
  }, [initData?.statusID]);

  const onPressExpandInput = useCallback(() => {
    setExpandInput(prev => !prev);
  }, []);

  const onContentSizeChange = useCallback((e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
    setHeighTextInput(e.nativeEvent.contentSize.height + scaleSize(20));
  }, []);

  return (
    <View>
      <View
        style={[
          styles.containerTextInput,
          {
            height: Math.min(scaleSize(300), heightTextInput),
            alignItems: heightTextInput > scaleSize(40) ? 'flex-end' : 'center',
          },
          insertObjectIf(expandInput, styles.containerInputExpand),
        ]}
      >
        <SocialText.Input
          ref={props.textInputRef}
          scrollViewRef={scrollViewRef}
          onChangeText={onChangeText}
          defaultValue={''}
          placeholderTextColor={dynamicColors.LIGHTTextDisable}
          placeholder={t('comment.placeholder')}
          style={styles.textInput}
          autoFocus={false}
          bottomShowModal={IS_ANDROID ? scaleSize(80) : keyboardHeight + scaleSize(80)}
          onContentSizeChange={onContentSizeChange}
        />

        <TouchableOpacity onPress={onPressExpandInput}>
          <Icon name="zoom-in" color={dynamicColors.BlueNewColor} size={scaleSize(16)} />
        </TouchableOpacity>
      </View>

      {extraData === 'poll' && <SocialText.OpinionPoll ref={pollRef} />}
      {extraData === 'image' && (
        <SocialText.Images showFullSize={false} containerStyle={styles.image} style={styles.containerImage} />
      )}

      <SocialText.KeyboardAccessory
        ref={accessoryRef}
        dataButtonPost={{
          onPressPostButton: isEdit ? onEditComment : onSendComment,
          label: t('Post'),
          loading,
        }}
        alwaysVisible={true}
      />
    </View>
  );
};

export default withMemo(InputComment);
