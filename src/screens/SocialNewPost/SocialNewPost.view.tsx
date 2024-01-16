import React, { memo } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import HeaderScreen from 'components/HeaderScreen';
import { useStyles } from './SocialNewPost.style';
import { IProps, SocialInputNativeID } from './SocialNewPost.type';
import { useScreenLogics } from './SocialNewPost.logic';
import PaaveButton from 'components/PaaveButton';
import { scaleSize } from 'styles';
import { SocialText } from 'components/SocialTextInput';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { IS_IOS } from 'constants/main';
import { useAppSelector } from 'hooks';
import { DiscardAlert } from './components';

const HEADER_HEIGHT = IS_IOS ? scaleSize(100) : scaleSize(60);

const SocialNewPost = (props: IProps) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();
  const {
    state,
    handlers,
    extraData,
    scrollViewRef,
    textInputRef,
    accessoryRef,
    pollRef,
    discardAlertRef,
    initContent,
    isEditing,
  } = useScreenLogics(props);
  const { display_name, username, avatar } = useAppSelector(state => {
    const { display_name, username, avatar } = state.SocialAccount.info || {};
    return {
      display_name,
      username,
      avatar,
    };
  });

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={props.navigation.goBack}
        headerTitle={'new_post_screen.header_title'}
        rightButtonListIcon={[
          <PaaveButton
            style={styles.postBtn}
            color={dynamicColors.BlueNewColor}
            onPress={isEditing ? handlers.editPost : handlers.createPost}
            disabled={state.loading}
          >
            <Text allowFontScaling={false} style={styles.postBtnText}>
              {t('Post')}
            </Text>
          </PaaveButton>,
        ]}
      />
      <KeyboardAwareFlatList
        data={undefined}
        renderItem={undefined}
        onScroll={handlers.onScroll}
        ref={scrollViewRef}
        style={styles.scrollViewContainer}
        ListHeaderComponent={
          <>
            <View style={styles.topPartContainer}>
              <Image source={{ uri: avatar }} style={styles.avatarImg} />
              <View style={styles.usernameContainer}>
                <Text style={styles.name} allowFontScaling={false}>
                  {display_name}
                </Text>
                <Text style={styles.username} allowFontScaling={false}>
                  @{username}
                </Text>
              </View>
            </View>
            <SocialText.Input
              ref={textInputRef}
              placeholder={t('new_post_screen.mention_hashtag_note')}
              scrollViewRef={scrollViewRef}
              containerOffsetY={HEADER_HEIGHT}
              onChangeText={handlers.onChangeText}
              defaultValue={initContent}
              inputAccessoryViewID={SocialInputNativeID}
              autoFocus={true}
            />
            {extraData === 'poll' && <SocialText.OpinionPoll ref={pollRef} />}
            {extraData === 'image' && <SocialText.Images />}
          </>
        }
      />
      <SocialText.Recommendation />
      <SocialText.KeyboardAccessory ref={accessoryRef} nativeID={SocialInputNativeID} />
      <DiscardAlert navigation={props.navigation} ref={discardAlertRef} />
      {state.loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
    </View>
  );
};

export default memo(SocialNewPost);
