import React, { memo, useEffect, useRef } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import { useStyles } from './styles';
import PaaveText from 'components/PaaveText';
import { useTranslation } from 'react-i18next';
import { TEXT_TYPE } from 'components/PaaveText/type';
import { useDispatch } from 'react-redux';
import { SocialNewPostActions } from 'reduxs';
import { PostBtn } from './PostBtn';

const SocialEditImageDescription = ({ navigation, route }: StackScreenProps<'SocialEditImageDescription'>) => {
  const { styles, dynamicColors } = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { asset } = route.params ?? {};
  const textInputRef = React.useRef<TextInput>(null);
  const postBtnRef = React.useRef<PostBtn>(null);
  const value = useRef<string>('');

  const onPressPost = () => {
    dispatch(
      SocialNewPostActions.setDescription({
        asset,
        description: value.current,
      })
    );
    navigation.goBack();
  };

  const onChangeText = (text: string) => {
    value.current = text;
    postBtnRef.current?.onChangeText(text);
  };

  useEffect(() => {
    textInputRef.current?.focus();
  }, []);

  if (!asset) {
    return null;
  }

  return (
    <View style={styles.backgroundModal}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.actionBtn} onPress={navigation.goBack}>
            <PaaveText type={TEXT_TYPE.REGULAR_14} color={dynamicColors.MainBlue}>
              {t('Cancel')}
            </PaaveText>
          </TouchableOpacity>
          <PaaveText type={TEXT_TYPE.BOLD_16} color={dynamicColors.LIGHTTextBigTitle}>
            {t('new_post_screen.modal_edit_alt_title')}
          </PaaveText>
          <PostBtn defaultValue={asset.description} onPress={onPressPost} ref={postBtnRef} />
        </View>
        <View style={styles.imgContainer}>
          <Image source={{ uri: asset.uri }} style={styles.img} resizeMode="contain" />
        </View>
        <TextInput
          defaultValue={asset.description}
          ref={textInputRef}
          placeholder={t('new_post_screen.add_description_placeholder')}
          style={styles.textInput}
          onChangeText={onChangeText}
          multiline
        />
      </View>
    </View>
  );
};

export default memo(SocialEditImageDescription);
