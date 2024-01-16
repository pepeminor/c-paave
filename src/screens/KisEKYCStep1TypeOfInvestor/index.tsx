import React, { useState } from 'react';
import { Alert, Platform, Text, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import globalStyles, { scaleSize } from '../../styles';
import KisEKYCStep1 from 'assets/icon/KisEKYCStep1.svg';
import ErrorAlertIcon from 'assets/icon/ErrorAlertIcon.svg';
import HeaderScreen from 'components/HeaderScreen';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import {
  EkycModule,
  IVNPTEKYCResultAndroidConverted,
  IVNPTEKYCResultAndroidRaw,
  IVNPTEKYCResultIOS,
  KeyIntentConstants,
} from 'utils';
import { IState } from 'reduxs/global-reducers';
import { useDispatch, useSelector } from 'react-redux';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { LANG } from 'global';
import Modal from 'components/Modal';
import { EkycActions } from 'reduxs/Ekyc';

const KisEKYCStep1TypeOfInvestor = (props: StackScreenProps<'KisEKYCStep1TypeOfInvestor'>) => {
  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const [errorModalContent, setErrorModalContent] = useState<string>('');
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((state: IState) => state.lang);

  const goToKisEkycStep3PersonalInformation = (
    ekycSdkData: IVNPTEKYCResultAndroidConverted | IVNPTEKYCResultIOS,
    validateField: boolean
  ) => {
    dispatch(
      EkycActions.saveDataEkycStep({
        data: {
          ekycSdkData,
          validateField,
          email: props.route.params.email,
          flow: props.route.params.flow,
          sec: props.route.params.sec,
        },
        step: ScreenNames.KisEkycStep3PersonalInformation,
      })
    );
    props.navigation.navigate(ScreenNames.KisEkycStep3PersonalInformation);
  };
  const onChooseTypeOfInvestor = (type: 'cmnd' | 'cccd') => {
    const ekycSDKParams = {
      [KeyIntentConstants.ACCESS_TOKEN]:
        'bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0N2M5YTU3Mi03Njg0LTExZWItOGUyZi0yNTQ5ZDNmNGY0YzIiLCJhdWQiOlsicmVzdHNlcnZpY2UiXSwidXNlcl9uYW1lIjoicWxzcGljQGlkZy52bnB0LnZuIiwic2NvcGUiOlsicmVhZCJdLCJpc3MiOiJodHRwczovL2xvY2FsaG9zdCIsIm5hbWUiOiJxbHNwaWNAaWRnLnZucHQudm4iLCJ1dWlkX2FjY291bnQiOiI0N2M5YTU3Mi03Njg0LTExZWItOGUyZi0yNTQ5ZDNmNGY0YzIiLCJhdXRob3JpdGllcyI6WyJVU0VSIl0sImp0aSI6Ijk2YzJmZjVlLTBkMDAtNDkzOS05YmRmLWM3NzkxOGFmZjUwOSIsImNsaWVudF9pZCI6ImFkbWluYXBwIn0.gWZkI5CqWgwcs9JOcQ4PPLjKUIZUxjtqIXl5ADti-AGej80XGfZIejTEWiMBRaKtOrQxmqu6YjQPe5xcg7onnK9uH0n4hkeRyGBlzixL4rEXH2CieegENjUFAjv6bAi-ahZwHxd5p5I6dNbh6kdYfzAH2YKFiTP5ElAfk2aliOqDMDjmQjYeIx8h05Jwl6Z9y1aIdme_iLfGzgNk9dyhhDoVtsGV3_mqd_f0qPGtOOo1TM9o7zsd9myNUudnPQlE0GvW6Fo8SEkHOgsfgfuzcsBYO__XuGCs0AtCjTt9srwMzASIg20CBCh3b_vLpSLDDoMTUqHGKHx1lColfWaRpA',
      [KeyIntentConstants.TOKEN_ID]: 'c3c513a9-4582-b2fe-e053-604fc10a24b1',
      [KeyIntentConstants.TOKEN_KEY]:
        'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJn+UqSUGKre5hEzgw0w95LdKXpbcjPTggz7Aaw5AJXWqTPgZRK5dT4/S7kbIgvm7FNbYGXAgEbhydsdFAMU7/kCAwEAAQ==',
      [KeyIntentConstants.DOCUMENT_TYPE]: type === 'cccd' ? 1 : 2,
      [KeyIntentConstants.LOGO]: 'logo.png',
      [KeyIntentConstants.SHOW_RESULT]: false,
      [KeyIntentConstants.SHOW_SWITCH]: true,
      [KeyIntentConstants.IS_SHOW_HELP]: true,
      [KeyIntentConstants.LANGUAGE]: selectedLanguage === LANG.VI ? 'vi' : 'en',
    };
    EkycModule.startChecking(ekycSDKParams)
      .then((data: IVNPTEKYCResultIOS | IVNPTEKYCResultAndroidRaw) => {
        // eslint-disable-next-line no-console
        console.log('====== success ==========', data);
        if (Platform.OS === 'android') {
          if (
            (data as IVNPTEKYCResultAndroidRaw).COMPARE_RESULT == null ||
            (data as IVNPTEKYCResultAndroidRaw).INFO_RESULT == null ||
            (data as IVNPTEKYCResultAndroidRaw).COMPARE_RESULT.trim() === '' ||
            (data as IVNPTEKYCResultAndroidRaw).INFO_RESULT.trim() === '' ||
            (data as IVNPTEKYCResultAndroidRaw).FRONT_IMAGE == null ||
            (data as IVNPTEKYCResultAndroidRaw).FRONT_IMAGE.trim() === '' ||
            (data as IVNPTEKYCResultAndroidRaw).REAR_IMAGE == null ||
            (data as IVNPTEKYCResultAndroidRaw).REAR_IMAGE.trim() === '' ||
            (data as IVNPTEKYCResultAndroidRaw).PORTRAIT_NEAR_IMAGE == null ||
            (data as IVNPTEKYCResultAndroidRaw).PORTRAIT_NEAR_IMAGE!.trim() === ''
          ) {
            //error sdk return no data
            setErrorModalVisible(true);
            setErrorModalContent('Cannot read data of identity document, Please try again!');
            return;
          }
          const convertedDataForAndroid: IVNPTEKYCResultAndroidConverted = {
            ...data,
            COMPARE_RESULT: JSON.parse((data as IVNPTEKYCResultAndroidRaw).COMPARE_RESULT),
            INFO_RESULT: JSON.parse((data as IVNPTEKYCResultAndroidRaw).INFO_RESULT),
          } as IVNPTEKYCResultAndroidConverted;
          if (
            convertedDataForAndroid.INFO_RESULT == null ||
            convertedDataForAndroid.INFO_RESULT.object == null ||
            convertedDataForAndroid.INFO_RESULT.object.post_code[1] == null ||
            convertedDataForAndroid.INFO_RESULT.object.post_code[0] == null ||
            convertedDataForAndroid.INFO_RESULT.object.post_code[1].city[0] == null ||
            convertedDataForAndroid.INFO_RESULT.object.post_code[1].district[0] == null ||
            convertedDataForAndroid.INFO_RESULT.object.post_code[0].city[0] == null ||
            convertedDataForAndroid.INFO_RESULT.object.post_code[0].district[0] == null
          ) {
            //error sdk return no data
            setErrorModalVisible(true);
            setErrorModalContent('Cannot read data of identity document, Please try again!');
          } else if (convertedDataForAndroid.COMPARE_RESULT.object.msg === 'NOMATCH') {
            setErrorModalVisible(true);
            setErrorModalContent("Facial credentials don't match the picture on the ID. Please try again");
          } else {
            if (type === 'cccd') {
              if (
                convertedDataForAndroid.QR_CODE_RESULT == null ||
                convertedDataForAndroid.QR_CODE_RESULT.trim() === ''
              ) {
                //error QR return no data
                setErrorModalVisible(true);
                setErrorModalContent('Cannot read data of identity document, Please try again!');
              } else {
                goToKisEkycStep3PersonalInformation(convertedDataForAndroid, true);
              }
            } else if (convertedDataForAndroid.COMPARE_RESULT.object.msg === 'NOMATCH') {
              setErrorModalVisible(true);
              setErrorModalContent("Facial credentials don't match the picture on the ID. Please try again");
            } else {
              goToKisEkycStep3PersonalInformation(convertedDataForAndroid, false);
            }
          }
        } else {
          if (
            (data as IVNPTEKYCResultIOS).INFO_RESULT == null ||
            (data as IVNPTEKYCResultIOS).INFO_RESULT.object == null ||
            (data as IVNPTEKYCResultIOS).INFO_RESULT.object.post_code[1] == null ||
            (data as IVNPTEKYCResultIOS).INFO_RESULT.object.post_code[0] == null ||
            (data as IVNPTEKYCResultIOS).INFO_RESULT.object.post_code[1].city[0] == null ||
            (data as IVNPTEKYCResultIOS).INFO_RESULT.object.post_code[1].district[0] == null ||
            (data as IVNPTEKYCResultIOS).INFO_RESULT.object.post_code[0].city[0] == null ||
            (data as IVNPTEKYCResultIOS).INFO_RESULT.object.post_code[0].district[0] == null ||
            (data as IVNPTEKYCResultIOS).COMPARE_RESULT == null ||
            (data as IVNPTEKYCResultIOS).COMPARE_RESULT.object == null ||
            (data as IVNPTEKYCResultIOS).FRONT_IMAGE == null ||
            (data as IVNPTEKYCResultIOS).FRONT_IMAGE.trim() === '' ||
            (data as IVNPTEKYCResultIOS).REAR_IMAGE == null ||
            (data as IVNPTEKYCResultIOS).REAR_IMAGE.trim() === '' ||
            (data as IVNPTEKYCResultIOS).PORTRAIT_IMAGE == null ||
            (data as IVNPTEKYCResultIOS).PORTRAIT_IMAGE.trim() === ''
          ) {
            //error sdk return no data
            setErrorModalVisible(true);
            setErrorModalContent('Cannot read data of identity document, Please try again!');
          } else if ((data as IVNPTEKYCResultIOS).COMPARE_RESULT.object.msg === 'NOMATCH') {
            setErrorModalVisible(true);
            setErrorModalContent("Facial credentials don't match the picture on the ID. Please try again");
          } else {
            if (type === 'cccd') {
              if (
                (data as IVNPTEKYCResultIOS).QR_CODE_RESULT == null ||
                (data as IVNPTEKYCResultIOS).QR_CODE_RESULT.trim() === ''
              ) {
                //error QR return no data
                setErrorModalVisible(true);
                setErrorModalContent('Cannot read data of identity document, Please try again!');
              } else {
                goToKisEkycStep3PersonalInformation(data as IVNPTEKYCResultIOS, true);
              }
            } else {
              goToKisEkycStep3PersonalInformation(data as IVNPTEKYCResultIOS, false);
            }
          }
        }
      })
      .catch((err: any) => {
        Alert.alert('err', err.toString());
      });
    return;
  };

  const onSubmitForm2 = () => {
    setErrorModalVisible(false);
    setErrorModalContent('');
  };

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        headerTitle={
          <View style={[globalStyles.container, globalStyles.alignCenter]}>
            <KisEKYCStep1 height={scaleSize(32)} width={scaleSize(275)} />
          </View>
        }
        goBackAction={props.navigation.goBack}
      />
      <View style={styles.containerContent}>
        <Text style={styles.titleText} allowFontScaling={false}>
          {t('Choose your document')}
        </Text>
        <TouchableOpacity
          onPress={() => onChooseTypeOfInvestor('cmnd')}
          style={[globalStyles.justifyCenter, styles.shadow, styles.investorButtonContainer, styles.marginBottom]}
        >
          <Text style={styles.investorText} allowFontScaling={false}>
            {t('CMND')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onChooseTypeOfInvestor('cccd')}
          style={[globalStyles.justifyCenter, styles.shadow, styles.investorButtonContainer, styles.marginBottom]}
        >
          <Text style={styles.investorText} allowFontScaling={false}>
            {t('CCCD')}
          </Text>
        </TouchableOpacity>
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
              <View style={[globalStyles.centered, styles.executeButtonContainer, globalStyles.fillWidth]}>
                <TouchableOpacity
                  style={[globalStyles.container, globalStyles.fillWidth, globalStyles.centered, styles.executeButton]}
                  onPress={onSubmitForm2}
                >
                  <Text style={styles.executeButtonText} allowFontScaling={false}>
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

export default KisEKYCStep1TypeOfInvestor;
