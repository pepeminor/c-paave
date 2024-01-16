/* eslint-disable no-console */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { ImageLibraryOptions, ImagePickerResponse, launchCamera } from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { StackScreenProps } from 'screens/RootNavigation';
import globalStyles, { scaleSize, width } from 'styles';
import KisEKYCStep4 from 'assets/icon/KisEKYCStep4.svg';
import ErrorAlertIcon from 'assets/icon/ErrorAlertIcon.svg';
import UploadSignatureIcon from 'assets/icon/UploadSignatureIcon.svg';
import SelectedIcon from 'assets/icon/OK-Check.svg';
import UnselectedIcon from 'assets/icon/UnCheck.svg';
import HeaderScreen from 'components/HeaderScreen';
import useStyles from './styles';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import config from 'config';
import { RealAccountSec } from 'screens/AccountTrading';
import { METHOD } from 'constants/method';
import Modal from 'components/Modal';
import { EkycActions, EkycSelectors } from 'reduxs/Ekyc';
import { useDispatch, useSelector } from 'react-redux';
import { store } from 'screens/App';

export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHERS = 'OTHERS',
}

export const getPresignedUrlKis = async (key: string): Promise<string> => {
  const baseUri = `${config[RealAccountSec.KIS].baseURI}/api/v1/`;
  const uri = `${baseUri}aws?serviceName=ekyc&key=${key}`;
  return new Promise((resolve, reject) => {
    fetch(uri, {
      method: METHOD.GET,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    })
      .then(async result => {
        resolve(await result.text());
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const uploadImageKis = async (url: string, imageUri: string) => {
  const resizedImage = await ImageResizer.createResizedImage(
    imageUri,
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

  const response = await fetch(resizedImage.uri);
  const blob = await response.blob();
  return fetch(url, {
    method: 'PUT',
    body: blob,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
};

const KisEkycStep4UploadSignature = (props: StackScreenProps<'KisEkycStep4UploadSignature'>) => {
  const [agree, setAgree] = useState<boolean>(false);
  const [signatureUri, setSignatureUri] = useState<string>('');
  const [imgUri, setImgUri] = useState<{ uri: string }>({ uri: '' });
  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const [errorModalContent, setErrorModalContent] = useState<string>('');
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const identifierId = useSelector(EkycSelectors.selectIdentifierId);

  const goBack = () => {
    props.navigation.replace(ScreenNames.KisEkycStep4ServiceInformation);
  };

  const onSubmitForm = () => {
    if (signatureUri.trim() !== '') {
      const params = {
        signatureImageUrl: signatureUri,
      };
      dispatch(EkycActions.saveDataEkycStep({ data: params, step: ScreenNames.KisEkycStep4ConfirmOTP }));
      props.navigation.navigate(ScreenNames.KisEkycStep4ConfirmOTP);
    }
  };

  const selectPhotoTapped = () => {
    const options: ImageLibraryOptions = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: true,
    };
    launchCamera(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        // console.log('User cancelled photo picker');
      } else if (response.errorCode != null || response.errorMessage != null) {
        setErrorModalVisible(true);
        setErrorModalContent(`Upload Failed: ${response.errorMessage}`);
      } else {
        if (response?.assets?.[0].base64 != null && response?.assets?.[0].uri != null) {
          store.dispatch({ type: 'HIDE_LOADING', showLoading: true });
          // You can also display the image using data:
          const source = { uri: 'data:image/jpeg;base64,' + response.assets[0].base64 };
          setImgUri(source);
          getPresignedUrlKis(`ekyc_signature_image_${identifierId}.jpg`)
            .then((url: string) => {
              uploadImageKis(url, response.assets![0].uri!)
                .then(() => {
                  setSignatureUri(url.split('?')[0]);
                  store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
                })
                .catch(err => {
                  setErrorModalVisible(true);
                  setErrorModalContent(`Upload Failed: ${err}`);
                  store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
                });
            })
            .catch(err => {
              setErrorModalVisible(true);
              setErrorModalContent(`Upload Image Failed: ${err}`);
              store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
            });

          return;
        }
        setErrorModalVisible(true);
        setErrorModalContent(`Upload Failed: cannot get image`);
      }
    });
  };

  const onAcceptErrorModal = () => {
    setErrorModalVisible(false);
    setErrorModalContent(``);
  };

  const toogleConfirm = () => {
    setAgree(previousState => {
      return !previousState;
    });
  };

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        headerTitle={
          <View style={[globalStyles.container, globalStyles.alignCenter]}>
            <KisEKYCStep4 height={scaleSize(32)} width={scaleSize(275)} />
          </View>
        }
        goBackAction={goBack}
      />
      <Text style={styles.titleText} allowFontScaling={false}>
        {t('Upload Signature')}
      </Text>
      <View style={[globalStyles.container, styles.marginHorizontal16]}>
        <Text style={styles.titleText2}>{t('Please, upload your signature to experience the services of KIS')}</Text>
        {imgUri.uri.trim() !== '' ? (
          <TouchableOpacity onPress={selectPhotoTapped}>
            <ImageBackground source={imgUri} style={styles.image}>
              <View style={[styles.uploadContainer, styles.zIndexImage]}>
                <View style={styles.icon}>
                  <UploadSignatureIcon height={scaleSize(32)} width={scaleSize(32)} />
                </View>
                <Text style={styles.uploadSignatureText}>{t('Upload your signature')}</Text>
                <Text style={styles.uploadSignatureAndFullNameText}>{t('Signature and fullname')}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ) : (
          <View style={[styles.image2, globalStyles.justifyCenter]}>
            <TouchableOpacity style={styles.uploadContainer} onPress={selectPhotoTapped}>
              <View style={styles.icon}>
                <UploadSignatureIcon height={scaleSize(32)} width={scaleSize(32)} />
              </View>
              <Text style={styles.uploadSignatureText}>{t('Upload your signature')}</Text>
              <Text style={styles.uploadSignatureAndFullNameText}>{t('Signature and fullname')}</Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity style={[globalStyles.flexDirectionRow, styles.checkBoxContainer2]} onPress={toogleConfirm}>
          {agree === true ? (
            <SelectedIcon height={scaleSize(20)} width={scaleSize(20)} />
          ) : (
            <UnselectedIcon height={scaleSize(20)} width={scaleSize(20)} />
          )}
          <Text allowFontScaling={false} style={[styles.termAndConditionText]}>
            {t('I confirmed this is my signature')}
          </Text>
        </TouchableOpacity>
        <View style={[globalStyles.centered, styles.executeButtonContainer]}>
          <TouchableOpacity
            style={[
              globalStyles.container,
              globalStyles.fillWidth,
              globalStyles.centered,
              styles.executeButton,
              (agree === false || signatureUri.trim() === '') && globalStyles.disableBackground,
            ]}
            disabled={agree === false || signatureUri.trim() === ''}
            onPress={onSubmitForm}
          >
            <Text style={styles.executeButtonText} allowFontScaling={false}>
              {t('Accept')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={errorModalVisible}
        childrenContent={
          <View
            style={[
              globalStyles.container,
              globalStyles.centered,
              globalStyles.flexDirectionRow,
              styles.modalBackground,
            ]}
          >
            <View style={[globalStyles.alignCenter, styles.modalContentContainer]}>
              <ErrorAlertIcon height={scaleSize(72)} width={scaleSize(72)} />
              <Text style={styles.errorTextModal}>{t(errorModalContent)}</Text>
              <View style={[globalStyles.centered, styles.executeButtonContainer]}>
                <TouchableOpacity
                  style={[
                    globalStyles.container,
                    globalStyles.fillWidth,
                    globalStyles.centered,
                    styles.executeButton,
                    (agree === false || signatureUri.trim() === '') && globalStyles.disableBackground,
                  ]}
                  onPress={onSubmitForm}
                  disabled={agree === false || signatureUri.trim() === ''}
                >
                  <Text style={styles.executeButtonText} allowFontScaling={false} onPress={onAcceptErrorModal}>
                    {t('Accept')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      />
    </View>
  );
};

export default KisEkycStep4UploadSignature;
