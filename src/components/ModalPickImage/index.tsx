import React, { memo } from 'react';
import ModalBottom from 'components/ModalBottom';
import { PermissionsAndroid, Text, TouchableOpacity, View } from 'react-native';
import { getStylesHook } from 'hooks';
import { lightColors, scaleSize, textStyles } from 'styles';
import Icon from 'components/Icon';
import { useTranslation } from 'react-i18next';
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { alertMessage } from 'utils';
import { IS_IOS } from 'constants/main';

type Props = Parameters<typeof ModalBottom>[0] & {
  maxImages?: number;
  limit?: number;
  onSuccess?: (images: ImagePickerResponse) => void;
};

export const ModalPickImage = memo(({ maxImages = 1, limit = 1, onSuccess, ...props }: Props) => {
  const { styles } = useStyles();
  const { t } = useTranslation();

  const setImages = (images: ImagePickerResponse) => {
    if (images.didCancel || images.assets == null) {
      return;
    }
    onSuccess?.(images);
    props.setVisible(false);
  };

  const onPressPhotoLibrary = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: maxImages }, setImages);
  };

  const onPressTakePhoto = () => {
    if (IS_IOS) {
      launchCamera({ mediaType: 'photo' }, setImages);
      return;
    }
    requestCameraPermission();
  };

  const requestCameraPermission = async () => {
    if (maxImages <= 0) {
      alertMessage('warning', t('new_post_screen.max_upload_images', { number: limit }));
      props.setVisible(false);
      return;
    }

    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: t('permission.camera.title'),
        message: t('permission.camera.message'),
        buttonNeutral: t('permission.ask_me_later'),
        buttonNegative: t('permission.cancel'),
        buttonPositive: t('permission.ok'),
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera({ mediaType: 'photo' }, setImages);
      } else {
        // console.log('Camera permission denied');
      }
    } catch (err) {
      // console.warn(err);
    }
  };

  return (
    <ModalBottom {...props} showCloseButton={false}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.btnContainer} onPress={onPressPhotoLibrary}>
          <Icon name="images" size={scaleSize(20)} />
          <Text allowFontScaling={false} style={styles.btnText}>
            {t('Photo Library')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContainer} onPress={onPressTakePhoto}>
          <Icon name="camera" size={scaleSize(20)} />
          <Text allowFontScaling={false} style={styles.btnText}>
            {t('Take Photo')}
          </Text>
        </TouchableOpacity>
      </View>
    </ModalBottom>
  );
});

const useStyles = getStylesHook({
  container: {
    paddingTop: 16,
    paddingVertical: 16,
    paddingBottom: IS_IOS ? 48 : 16,
  },
  btnContainer: {
    padding: 16,
    borderColor: lightColors.BORDER,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    paddingLeft: 10,
    ...textStyles.fontSize14,
    ...textStyles.roboto400,
    color: lightColors.LIGHTTextContent,
  },
});
