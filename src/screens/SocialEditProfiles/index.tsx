import React, { useRef, useState } from 'react';
import { Image, TextInput, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import withMemo from 'HOC/withMemo';
import { useStyles } from './styles';
import { useTranslation } from 'react-i18next';
import Icon from 'components/Icon';
import HeaderScreen from 'components/HeaderScreen';
import { useAppSelector } from 'hooks';
import { scaleSize, width } from 'styles';
import PaaveText from 'components/PaaveText';
import PaaveButton from 'components/PaaveButton';
import { ModalPickImage } from 'components/ModalPickImage';
import { Asset, ImagePickerResponse } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { updateSocialAccountInfo } from 'reduxs/SocialAccount/SocialAccount.action';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImageResizer from 'react-native-image-resizer';

const SocialEditProfiles = (props: StackScreenProps<'SocialEditProfiles'>) => {
  const { t } = useTranslation();
  const { styles, dynamicColors } = useStyles();
  const dispatch = useDispatch();

  const userInfo = useAppSelector(state => state.SocialAccount.info);

  const [avatar, setAvatar] = useState(userInfo?.avatar ?? '');
  const avatarAsset = useRef<Asset | undefined>(undefined);
  const [name, setName] = useState(userInfo?.display_name ?? '');
  const [isFocused, setIsFocused] = useState(false);
  const [pickerModalVisible, setPickerModalVisible] = useState(false);

  const openPickerModal = () => {
    setPickerModalVisible(true);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onImagePickerSuccess = async (images: ImagePickerResponse) => {
    if (images.didCancel || images.assets == null || images.assets.length === 0) {
      return;
    }
    const resizedImage = await ImageResizer.createResizedImage(
      images.assets[0].uri ?? '',
      Math.max(width, 1024),
      Math.max(width, 1024),
      'JPEG',
      80,
      0,
      undefined,
      true,
      {
        onlyScaleDown: true,
        mode: 'cover',
      }
    );
    setAvatar(resizedImage.uri);
    // avatarAsset.current = { fileName: resizedImage.name, type: 'image/jpg', uri: resizedImage.uri };
    avatarAsset.current = images.assets[0];
  };

  if (userInfo == null) {
    return null;
  }

  const avatarPicked = avatar !== userInfo.avatar;
  const usernameEdited = name !== userInfo.display_name;
  const isDisable = (!avatarPicked && !usernameEdited) || name === '' || avatar === '';

  const onSavePressed = () => {
    const avatar =
      avatarAsset.current != null
        ? {
            name: avatarAsset.current.fileName,
            uri: avatarAsset.current.uri,
            type: avatarAsset.current.type,
          }
        : undefined;
    dispatch(
      updateSocialAccountInfo({
        payload: {
          display_name: usernameEdited ? name : undefined,
          avatar,
        },
      })
    );
  };

  return (
    <View style={styles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={props.navigation.goBack} headerTitle={'Edit Profile'} />
      <KeyboardAwareScrollView scrollEnabled={false}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <TouchableOpacity
            style={avatarPicked ? styles.cameraIconPicked : styles.cameraIcon}
            onPress={openPickerModal}
          >
            {!avatarPicked && <Icon name={'camera-plus'} size={scaleSize(36)} color={dynamicColors.WHITE} />}
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <PaaveText type="REGULAR_10" color={dynamicColors.LIGHTTextTitle}>
            {t('Display Name')}
          </PaaveText>
          <TextInput
            style={isFocused ? styles.inputFocused : styles.input}
            placeholder={t('Display Name')}
            placeholderTextColor={dynamicColors.LIGHTGRAY}
            value={name}
            onChangeText={setName}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </View>
      </KeyboardAwareScrollView>
      <PaaveButton
        type="SOLID"
        color={dynamicColors.BlueNewColor}
        disableColor={dynamicColors.BlueNewColor}
        disabled={isDisable}
        style={styles.saveBtn}
        onPress={onSavePressed}
      >
        <PaaveText type="BOLD_14" color={dynamicColors.WHITE}>
          {t('Save')}
        </PaaveText>
      </PaaveButton>
      <ModalPickImage
        visible={pickerModalVisible}
        setVisible={setPickerModalVisible}
        onSuccess={onImagePickerSuccess}
      />
    </View>
  );
};

export default withMemo(SocialEditProfiles);
