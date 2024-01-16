import { InputAccessoryView, Text, View } from 'react-native';
import React, { forwardRef, memo, useCallback, useImperativeHandle } from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useStyles } from './styles';
import { useAppSelector, useKeyboard } from 'hooks';
import { IS_ANDROID } from 'constants/main';
import { AccessoryItem } from './AccessoryItem';
import { ModalPickImage } from './ModalPickImage';
import { useDispatch } from 'react-redux';
import { SocialNewPostActions } from 'reduxs';
import PaaveButton from 'components/PaaveButton';
import withMemo from 'HOC/withMemo';

type Props = {
  openPickerModal(): void;
  dataButtonPost?: {
    onPressPostButton(): void;
    loading: boolean;
    label: string;
  };
  alwaysVisible?: boolean;
};

export type KeyboardAccessory = {
  setRemainCharacter: (remainCharacter: number) => void;
};

const MAX_CHARACTER = 5000;

export const KeyboardAccessoryContent = withMemo(
  forwardRef<KeyboardAccessory, Props>(({ openPickerModal, dataButtonPost, alwaysVisible }, ref) => {
    const { styles, dynamicColors } = useStyles();
    const [keyboardHeight] = useKeyboard();
    const dispatch = useDispatch();
    const [remainCharacter, setRemainCharacter] = React.useState(MAX_CHARACTER);

    const extraData = useAppSelector(state => state.SocialNewPost.extraData);

    const addImages = useCallback(() => {
      dispatch(SocialNewPostActions.setExtraData('image'));
      openPickerModal();
    }, []);

    const addPoll = useCallback(() => {
      dispatch(SocialNewPostActions.setExtraData('poll'));
    }, []);

    const setDefault = useCallback(() => {
      dispatch(SocialNewPostActions.setExtraData());
    }, []);

    const addHashtag = useCallback(() => {
      dispatch(SocialNewPostActions.addStringTrigger('#'));
    }, []);

    useImperativeHandle(ref, () => ({
      setRemainCharacter,
    }));

    if (IS_ANDROID && keyboardHeight === 0 && !alwaysVisible) return null;

    return (
      <Animated.View style={styles.container} entering={FadeIn.delay(100)} exiting={FadeOut.duration(100)}>
        <View style={styles.itemContainer}>
          <AccessoryItem name="image-outline" onPress={addImages} />
          {/* {extraData !== 'emoji' && <AccessoryItem name="emoji-outline" size={20} />}
        {extraData === 'emoji' && <AccessoryItem name="emoji" size={20} onPress={setDefault} />} */}
          {extraData !== 'poll' && <AccessoryItem name="poll-outline" onPress={addPoll} />}
          {extraData === 'poll' && <AccessoryItem name="poll" onPress={setDefault} />}
          <AccessoryItem name="hash" onPress={addHashtag} />
        </View>
        <Text allowFontScaling={false}>{remainCharacter}</Text>

        {dataButtonPost && (
          <PaaveButton
            style={styles.postBtn}
            color={dynamicColors.BlueNewColor}
            onPress={dataButtonPost.onPressPostButton}
            disabled={dataButtonPost.loading}
            textStyle={styles.postBtnText}
          >
            {dataButtonPost.label}
          </PaaveButton>
        )}
      </Animated.View>
    );
  })
);

type KeyboardAccessoryProps = {
  dataButtonPost?: {
    onPressPostButton(): void;
    loading: boolean;
    label: string;
  };
  alwaysVisible?: boolean;
  nativeID?: string;
};

export const KeyboardAccessory = memo(
  forwardRef<KeyboardAccessory, KeyboardAccessoryProps>((props, ref) => {
    const [pickerModalVisible, setPickerModalVisible] = React.useState(false);

    const openPickerModal = useCallback(() => {
      setPickerModalVisible(true);
    }, []);

    if (IS_ANDROID || props.alwaysVisible) {
      return (
        <>
          <KeyboardAccessoryContent ref={ref} openPickerModal={openPickerModal} {...props} />
          <ModalPickImage visible={pickerModalVisible} setVisible={setPickerModalVisible} />
        </>
      );
    }

    return (
      <>
        <InputAccessoryView nativeID={props.nativeID}>
          <KeyboardAccessoryContent ref={ref} openPickerModal={openPickerModal} {...props} />
        </InputAccessoryView>
        <ModalPickImage visible={pickerModalVisible} setVisible={setPickerModalVisible} />
      </>
    );
  })
);
