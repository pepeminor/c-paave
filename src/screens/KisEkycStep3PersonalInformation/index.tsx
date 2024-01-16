/* eslint-disable no-console */
import React, { useRef, useState } from 'react';
import { Platform, Text, TouchableOpacity, View, ScrollView, Keyboard } from 'react-native';
import RNFS from 'react-native-fs';
import { Modalize } from 'react-native-modalize';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImageResizer from 'react-native-image-resizer';
import { StackScreenProps } from 'screens/RootNavigation';
import globalStyles, { lightColors as Colors, scaleSize, width } from 'styles';
import KisEKYCStep3 from 'assets/icon/KisEKYCStep3.svg';
import IconClose from 'assets/icon/IconClose.svg';
import SearchIcon2 from 'assets/icon/SearchIcon2.svg';
import IconEdit from 'assets/icon/IconEdit.svg';
import CloseIcon from 'assets/icon/btn_close.svg';
import Down2 from 'assets/icon/Down2.svg';
import IconOK from 'assets/icon/IconOK2.svg';
import HeaderScreen from 'components/HeaderScreen';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import TextInputComponent from 'components/TextInput';
import DatePicker from 'components/DatePicker';
import {
  formatDateToString,
  formatStringToDate,
  IVNPTEKYCResultAndroidConverted,
  IVNPTEKYCResultIOS,
  alertMessage,
  createRequestId,
  isBlank,
} from 'utils';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import config from 'config';
import { isEqual } from 'date-fns';
import { addressData, IAddressCityData, IAddressDistrictData } from 'screens/KisEkycStep3EditPersonalInformation/data';
import { RealAccountSec } from 'screens/AccountTrading';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { METHOD } from 'constants/method';
import { useDispatch } from 'react-redux';
import { EkycActions, EkycSelectors } from 'reduxs/Ekyc';
import { useAppSelector } from 'hooks';
import { store } from 'screens/App';

export enum DocumentType {
  CC = 'Căn cước công dân',
  CCCD = 'CĂN CƯỚC CÔNG DÂN',
  CMND = 'GIẤY CHỨNG MINH NHÂN DÂN',
  CMND12 = 'CHỨNG MINH NHÂN DÂN',
}

export const getDocumentType = (document: string): IPersonalInfoType => {
  switch (document) {
    case DocumentType.CC:
      return 'CC';
    case DocumentType.CCCD:
      return 'CC';
    case DocumentType.CMND:
      return 'CMND';
    case DocumentType.CMND12:
      return 'CMND';
    default:
      return 'PASSPORT';
  }
};

export type IPersonalInfoType = 'CMND' | 'CC' | 'PASSPORT';

const KisEkycStep3PersonalInformation = (props: StackScreenProps<'KisEkycStep3PersonalInformation'>) => {
  const { styles } = useStyles();
  const dataEkyc = useAppSelector(EkycSelectors.selectDataEkyc);

  const [provinceList, setProvinceList] = useState<IAddressCityData[]>(addressData);
  const [districtList, setDistrictList] = useState<IAddressDistrictData[]>(() => {
    if (Platform.OS === 'android') {
      const addressItem = addressData.find(item => {
        return (
          item.cityCode ===
          ((dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.post_code[1].city[0] as string)
        );
      });
      if (addressItem == null) {
        return addressData[0].districtList;
      } else {
        return addressItem.districtList;
      }
    } else {
      const addressItem = addressData.find(item => {
        return (
          item.cityCode ===
          ((dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object.post_code[1].city[0] as string)
        );
      });
      if (addressItem == null) {
        return addressData[0].districtList;
      } else {
        return addressItem.districtList;
      }
    }
  });
  const [provinceResidenceList, setResidenceProvinceList] = useState<IAddressCityData[]>(addressData);
  const [districtResidenceList, setResidenceDistrictList] = useState<IAddressDistrictData[]>(() => {
    {
      if (Platform.OS === 'android') {
        const addressItem = addressData.find(item => {
          return (
            item.cityCode ===
            ((dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.post_code[0]
              .city[0] as string)
          );
        });
        if (addressItem == null) {
          return addressData[0].districtList;
        } else {
          return addressItem.districtList;
        }
      } else {
        const addressItem = addressData.find(item => {
          return (
            item.cityCode ===
            ((dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object.post_code[0].city[0] as string)
          );
        });
        if (addressItem == null) {
          return addressData[0].districtList;
        } else {
          return addressItem.districtList;
        }
      }
    }
  });
  const [selectedProvince, setSelectedProvince] = useState<IAddressCityData>(() => {
    if (Platform.OS === 'android') {
      const addressItem = addressData.find(item => {
        return (
          item.cityCode ===
          ((dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.post_code[1].city[0] as string)
        );
      });
      if (addressItem == null) {
        return addressData[0];
      } else {
        return addressItem;
      }
    } else {
      const addressItem = addressData.find(item => {
        return (
          item.cityCode ===
          ((dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object.post_code[1].city[0] as string)
        );
      });
      if (addressItem == null) {
        return addressData[0];
      } else {
        return addressItem;
      }
    }
  });
  const [selectedResidenceProvince, setSelectedResidenceProvince] = useState<IAddressCityData>(() => {
    if (Platform.OS === 'android') {
      const addressItem = addressData.find(item => {
        return (
          item.cityCode ===
          ((dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.post_code[0].city[0] as string)
        );
      });
      if (addressItem == null) {
        return addressData[0];
      } else {
        return addressItem;
      }
    } else {
      const addressItem = addressData.find(item => {
        return (
          item.cityCode ===
          ((dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object.post_code[0].city[0] as string)
        );
      });
      if (addressItem == null) {
        return addressData[0];
      } else {
        return addressItem;
      }
    }
  });
  const [selectedDistrict, setSelectedDistrict] = useState<IAddressDistrictData>(() => {
    if (Platform.OS === 'android') {
      const selectedAddress2 = addressData.find(item => {
        return (
          item.cityCode ===
          (dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.post_code[1].city[0]
        );
      });
      if (selectedAddress2 == null) {
        return addressData[0].districtList[0];
      } else {
        const districtItem = selectedAddress2.districtList.find(item => {
          return (
            item.districtCode ===
            (dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.post_code[1].district[0]
          );
        });
        if (districtItem == null) {
          return addressData[0].districtList[0];
        } else {
          return districtItem;
        }
      }
    } else {
      const selectedAddress2 = addressData.find(item => {
        return item.cityCode === (dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object.post_code[1].city[0];
      });
      if (selectedAddress2 == null) {
        return addressData[0].districtList[0];
      } else {
        const districtItem = selectedAddress2.districtList.find(item => {
          return (
            item.districtCode ===
            (dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object.post_code[1].district[0]
          );
        });
        if (districtItem == null) {
          return addressData[0].districtList[0];
        } else {
          return districtItem;
        }
      }
    }
  });

  const [selectedResidenceDistrict, setSelectedResidenceDistrict] = useState<IAddressDistrictData>(() => {
    if (Platform.OS === 'android') {
      const selectedAddress2 = addressData.find(item => {
        return (
          item.cityCode ===
          (dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.post_code[0].city[0]
        );
      });
      if (selectedAddress2 == null) {
        return addressData[0].districtList[0];
      } else {
        const districtItem = selectedAddress2.districtList.find(item => {
          return (
            item.districtCode ===
            (dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.post_code[0].district[0]
          );
        });
        if (districtItem == null) {
          return addressData[0].districtList[0];
        } else {
          return districtItem;
        }
      }
    } else {
      const selectedAddress2 = addressData.find(item => {
        return item.cityCode === (dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object.post_code[0].city[0];
      });
      if (selectedAddress2 == null) {
        return addressData[0].districtList[0];
      } else {
        const districtItem = selectedAddress2.districtList.find(item => {
          return (
            item.districtCode ===
            (dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object.post_code[0].district[0]
          );
        });
        if (districtItem == null) {
          return addressData[0].districtList[0];
        } else {
          return districtItem;
        }
      }
    }
  });
  const [idCard, setIDCard] = useState<string>(() => {
    if (Platform.OS === 'android') {
      return (dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.id;
    } else {
      return (dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object.id;
    }
  }); //default value get from previous screen params
  const [idCardEditing, setIDCardEditing] = useState<boolean>(false);
  const [idCardError, setIDCardError] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>(() => {
    if (Platform.OS === 'android') {
      return (dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.name;
    } else {
      return (dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object!.name;
    }
  }); //default value get from previous screen params
  const [fullNameEditing, setFullNameEditing] = useState<boolean>(false);
  const [fullNameError, setFullNameError] = useState<boolean>(false);
  const [dob, setDOB] = useState<Date>(() => {
    if (Platform.OS === 'android') {
      return formatStringToDate(
        (dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.birth_day,
        'dd/MM/yyyy'
      );
    } else {
      return formatStringToDate(
        (dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object!.birth_day,
        'dd/MM/yyyy'
      );
    }
  }); //default value get from previous screen params
  const [dobEditing, setDOBEditing] = useState<boolean>(false);
  const [homeTown, setHomeTown] = useState<string>(() => {
    if (Platform.OS === 'android') {
      return `${(
        dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted
      ).INFO_RESULT.object.post_code[1].detail.replace('\n', ' ')}${
        (dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.post_code[1].ward[1] != null
          ? ((dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.post_code[1].detail.trim() ===
            ''
              ? ''
              : ', ') +
            (dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.post_code[1].ward[1]
          : ''
      }`;
    } else {
      return `${(
        dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted
      ).INFO_RESULT.object.post_code[1].detail.replace('\n', ' ')}${
        (dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object.post_code[1].ward[1] != null
          ? ((dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object.post_code[1].detail.trim() === ''
              ? ''
              : ', ') + (dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object.post_code[1].ward[1]
          : ''
      }`;
    }
  }); //default value get from previous screen params
  const [homeTownEditing, setHomeTownEditing] = useState<boolean>(false);
  const [homeTownError, setHomeTownError] = useState<boolean>(false);
  const [address, setAddress] = useState<string>(() => {
    if (Platform.OS === 'android') {
      return `${(
        dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted
      ).INFO_RESULT.object.post_code[0].detail.replace('\n', ' ')}${
        (dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.post_code[0].ward[1] != null
          ? ((dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.post_code[0].detail.trim() ===
            ''
              ? ''
              : ', ') +
            (dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.post_code[0].ward[1]
          : ''
      }`;
    } else {
      return `${(
        dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted
      ).INFO_RESULT.object.post_code[0].detail.replace('\n', ' ')}${
        (dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object.post_code[0].ward[1] != null
          ? ((dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object.post_code[0].detail.trim() === ''
              ? ''
              : ', ') + (dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object.post_code[0].ward[1]
          : ''
      }`;
    }
  }); //default value get from previous screen params
  const [addressEditing, setAddressEditing] = useState<boolean>(false);
  const [addressError, setAddressError] = useState<boolean>(false);
  const [issueDate, setIssueDate] = useState<Date>(() => {
    if (Platform.OS === 'android') {
      return formatStringToDate(
        (dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.issue_date,
        'dd/MM/yyyy'
      );
    } else {
      return formatStringToDate(
        (dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object!.issue_date,
        'dd/MM/yyyy'
      );
    }
  }); //default value get from previous screen params
  const [issueDateEditing, setIssueDateEditing] = useState<boolean>(false);
  const [issuePlace, setIssuePlace] = useState<string>(() => {
    if (Platform.OS === 'android') {
      return (dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.issue_place;
    } else {
      return (dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object!.issue_place;
    }
  }); //default value get from previous screen params
  const [issuePlaceEditing, setIssuePlaceEditing] = useState<boolean>(false);
  const [issuePlaceError, setIssuePlaceError] = useState<boolean>(false);
  const [provinceSearchText, setProvinceSearchText] = useState<string>('');
  const [districtSearchText, setDistrictSearchText] = useState<string>('');
  const [provinceResidenceSearchText, setResidenceProvinceSearchText] = useState<string>('');
  const [districtResidenceSearchText, setResidenceDistrictSearchText] = useState<string>('');
  const modalizeProvinceRef = useRef<Modalize>(null);
  const modalizeDistrictRef = useRef<Modalize>(null);
  const modalizeResidenceProvinceRef = useRef<Modalize>(null);
  const modalizeResidenceDistrictRef = useRef<Modalize>(null);
  const frontImageUrl = useRef<string | null>(null);
  const backImageUrl = useRef<string | null>(null);
  const portraitImageUrl = useRef<string | null>(null);
  const [uploadFrontImageResult, setUploadFrontImageResult] = useState<boolean>(false);
  const [uploadBackImageResult, setUploadBackImageResult] = useState<boolean>(false);
  const [uploadPortraitImageResult, setUploadPortraitImageResult] = useState<boolean>(false);
  const [isVisibleDOBDatePicker, setIsVisibleDOBDatePicker] = useState<boolean>(false);
  const [isVisibleIssueDateDatePicker, setIsVisibleIssueDateDatePicker] = useState<boolean>(false);

  const validateField = useAppSelector(EkycSelectors.selectValidateField);

  const dispatch = useDispatch();

  useUpdateEffect(() => {
    if (uploadFrontImageResult === true && uploadBackImageResult === true && uploadPortraitImageResult === true) {
      store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
      store.dispatch(
        EkycActions.saveDataEkycStep({
          data: {
            residenceAddressProvince: selectedResidenceProvince,
            residenceAddressDistrict: selectedResidenceDistrict,
            residenceAddress: address,
            identifierId: idCard,
            fullName,
            birthDay: dob,
            issueDate,
            issuePlace,
            address,
            type: getDocumentType(
              Platform.OS === 'android'
                ? (dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).INFO_RESULT.object.card_type
                : (dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).INFO_RESULT.object.card_type
            ),
            backImageUrl: backImageUrl.current!,
            frontImageUrl: frontImageUrl.current!,
            portraitImageUrl: portraitImageUrl.current!,
          },
          step: ScreenNames.KisEkycStep3EditPersonalInformation,
        })
      );
      props.navigation.navigate(ScreenNames.KisEkycStep3EditPersonalInformation);
    }
  }, [uploadFrontImageResult, uploadBackImageResult, uploadPortraitImageResult]);

  const { t } = useTranslation();
  const goBack = () => {
    dispatch(EkycActions.clearDataEkycStep());
    props.navigation.replace(ScreenNames.KisEKYCStep1TypeOfInvestor, {
      email: dataEkyc.email,
      flow: dataEkyc.flow,
      sec: dataEkyc.sec,
    });
  };

  const getPresignedUrl = async (key: string): Promise<string> => {
    const baseUri = `${config[RealAccountSec.KIS].baseURI}/api/v1/`;
    const uri = `${baseUri}aws?serviceName=ekyc&key=${key}`;
    const rid = createRequestId();
    return new Promise((resolve, reject) => {
      fetch(uri, {
        method: METHOD.GET,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
          rid,
        },
      })
        .then(async result => {
          resolve(await result.text());
        })
        .catch(error => {
          alertMessage('danger', `${t('Upload Image')}`, `${t('UPLOAD_IMAGE_FAILED')}`, rid);
          reject(error);
        });
    });
  };

  const uploadImage = async (url: string, imageUri: string) => {
    const resizedImage = await ImageResizer.createResizedImage(
      imageUri,
      Math.max(width, 1024),
      Math.max(width, 1024),
      'JPEG',
      100,
      0,
      undefined,
      true,
      {
        onlyScaleDown: true,
        mode: 'cover',
      }
    );
    const response = await fetch(resizedImage.uri, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
    const rid = createRequestId();
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'PUT',
        body: blob,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
          rid,
        },
      })
        .then(result => {
          resolve(result);
        })
        .catch(error => {
          alertMessage('danger', `${t('Upload Image')}`, `${t('UPLOAD_IMAGE_FAILED')}`, rid);
          reject(error);
        });
    });
  };

  const onChangeIdCard = (value: string) => {
    setIDCard(value);
    validateID();
  };

  const onChangeFullName = (value: string) => {
    setFullName(value);
    validateFullName();
  };

  const onChangeHomeTown = (value: string) => {
    setHomeTown(value);
    validateHomeTown();
  };

  const onChangeAddress = (value: string) => {
    setAddress(value);
    validateAddress();
  };

  const onChangeIssuePlace = (value: string) => {
    setIssuePlace(value);
    validateIssuePlace();
  };

  const onChangeDOB = (value: Date) => {
    setDOB(value);
    onCloseDatePicker();
  };

  const onCloseDatePicker = () => {
    if (isVisibleDOBDatePicker) {
      setIsVisibleDOBDatePicker(false);
    }
    if (isVisibleIssueDateDatePicker) {
      setIsVisibleIssueDateDatePicker(false);
    }
  };

  const onChangeIssueDate = (value: Date) => {
    setIssueDate(value);
    onCloseDatePicker();
  };

  const onStartEditIdCard = () => {
    setIDCardEditing(true);
  };

  const validateID = () => {
    if (isBlank(idCard)) {
      setIDCardError(true);
      return false;
    } else if (config.regex.idCard.test(idCard) !== true) {
      setIDCardError(true);
      return false;
    } else {
      setIDCardError(false);
    }
    return true;
  };

  const validateFullName = () => {
    if (isBlank(fullName)) {
      setFullNameError(true);
      return false;
    } else if (config.regex.fullname.test(fullName) !== true) {
      setFullNameError(true);
      return false;
    } else {
      setFullNameError(false);
    }
    return true;
  };

  const validateHomeTown = () => {
    if (isBlank(homeTown)) {
      setHomeTownError(true);
      return false;
    } else if (config.regex.address.test(homeTown) !== true) {
      setHomeTownError(true);
      return false;
    } else {
      setHomeTownError(false);
    }
    return true;
  };

  const validateAddress = () => {
    if (isBlank(address)) {
      setAddressError(true);
      return false;
    } else if (config.regex.address.test(address) !== true) {
      setAddressError(true);
      return false;
    } else {
      setAddressError(false);
    }
    return true;
  };

  const validateIssuePlace = () => {
    if (isBlank(address)) {
      setIssuePlaceError(true);
      return false;
    } else if (config.regex.address.test(address) !== true) {
      setIssuePlaceError(true);
      return false;
    } else {
      setIssuePlaceError(false);
    }
    return true;
  };

  const validate = () => {
    if (validateID() === false) {
      return false;
    }
    if (validateFullName() === false) {
      return false;
    }
    if (validateHomeTown() === false) {
      return false;
    }
    if (validateAddress() === false) {
      return false;
    }
    if (validateIssuePlace() === false) {
      return false;
    }
    return true;
  };

  const onSubmitForm = () => {
    if (
      idCardEditing === true ||
      fullNameEditing === true ||
      homeTownEditing === true ||
      addressEditing === true ||
      dobEditing === true ||
      issueDateEditing === true ||
      issuePlaceEditing === true
    ) {
      if (validate() === true) {
        // save
        setIDCardEditing(false);
        setFullNameEditing(false);
        setDOBEditing(false);
        setHomeTownEditing(false);
        setAddressEditing(false);
        setIssueDateEditing(false);
        setIssuePlaceEditing(false);
      }
    } else {
      setUploadFrontImageResult(false);
      setUploadBackImageResult(false);
      setUploadPortraitImageResult(false);
      store.dispatch({ type: 'HIDE_LOADING', showLoading: true });
      if (Platform.OS === 'android') {
        // Upload Front Image
        getPresignedUrl(`ekyc_front_image_${idCard}.jpg`)
          .then((url: string) => {
            RNFS.readFile('file://' + (dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).FRONT_IMAGE, 'base64')
              .then(res => {
                // console.log(res); res here is base64 string of image
                uploadImage(url, 'data:image/jpeg;base64,' + res)
                  .then(() => {
                    frontImageUrl.current = url.split('?')[0];
                    setUploadFrontImageResult(true);
                  })
                  .catch(() => {
                    store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
                    return;
                  });
              })
              .catch(() => {
                store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
                alertMessage('danger', `${t('Upload Image')}`, `${t('UPLOAD_IMAGE_FAILED')}`);
                return;
              });
            frontImageUrl.current = url.split('?')[0];
          })
          .catch(() => {
            store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
            return;
          });
        // Upload Rear Image
        getPresignedUrl(`ekyc_back_image_${idCard}.jpg`)
          .then((url: string) => {
            RNFS.readFile('file://' + dataEkyc.ekycSdkData.REAR_IMAGE, 'base64')
              .then(res => {
                uploadImage(url, 'data:image/jpeg;base64,' + res)
                  .then(() => {
                    backImageUrl.current = url.split('?')[0];
                    setUploadBackImageResult(true);
                  })
                  .catch(() => {
                    store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
                    return;
                  });
              })
              .catch(() => {
                store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });

                alertMessage('danger', `${t('Upload Image')}`, `${t('UPLOAD_IMAGE_FAILED')}`);
                return;
              });
            backImageUrl.current = url.split('?')[0];
          })
          .catch(() => {
            store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
            return;
          });

        // Upload Portrait Image
        getPresignedUrl(`ekyc_portrait_image_${idCard}.jpg`)
          .then((url: string) => {
            RNFS.readFile(
              'file://' + (dataEkyc.ekycSdkData as IVNPTEKYCResultAndroidConverted).PORTRAIT_NEAR_IMAGE,
              'base64'
            )
              .then(res => {
                uploadImage(url, 'data:image/jpeg;base64,' + res)
                  .then(() => {
                    portraitImageUrl.current = url.split('?')[0];
                    setUploadPortraitImageResult(true);
                  })
                  .catch(() => {
                    store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
                    return;
                  });
              })
              .catch(() => {
                store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
                alertMessage('danger', `${t('Upload Image')}`, `${t('UPLOAD_IMAGE_FAILED')}`);
                return;
              });
            portraitImageUrl.current = url.split('?')[0];
          })
          .catch(() => {
            store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
            return;
          });
      } else {
        getPresignedUrl(`ekyc_front_image_${idCard}.jpg`)
          .then((url: string) => {
            RNFS.readFile((dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).FRONT_IMAGE, 'base64')
              .then(res => {
                uploadImage(url, 'data:image/jpeg;base64,' + res)
                  .then(() => {
                    frontImageUrl.current = url.split('?')[0];
                    setUploadFrontImageResult(true);
                  })
                  .catch(() => {
                    store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
                    return;
                  });
              })
              .catch(() => {
                store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
                alertMessage('danger', `${t('Upload Image')}`, `${t('UPLOAD_IMAGE_FAILED')}`);
                return;
              });
            frontImageUrl.current = url.split('?')[0];
          })
          .catch(() => {
            store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
            return;
          });

        getPresignedUrl(`ekyc_back_image_${idCard}.jpg`)
          .then((url: string) => {
            RNFS.readFile((dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).REAR_IMAGE, 'base64')
              .then(res => {
                uploadImage(url, 'data:image/jpeg;base64,' + res)
                  .then(() => {
                    backImageUrl.current = url.split('?')[0];
                    setUploadBackImageResult(true);
                  })
                  .catch(() => {
                    store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
                    return;
                  });
              })
              .catch(() => {
                store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
                alertMessage('danger', `${t('Upload Image')}`, `${t('UPLOAD_IMAGE_FAILED')}`);
                return;
              });
            backImageUrl.current = url.split('?')[0];
          })
          .catch(() => {
            store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
            return;
          });

        getPresignedUrl(`ekyc_portrait_image_${idCard}.jpg`)
          .then((url: string) => {
            RNFS.readFile((dataEkyc.ekycSdkData as IVNPTEKYCResultIOS).PORTRAIT_IMAGE, 'base64')
              .then(res => {
                uploadImage(url, 'data:image/jpeg;base64,' + res)
                  .then(() => {
                    portraitImageUrl.current = url.split('?')[0];
                    setUploadPortraitImageResult(true);
                  })
                  .catch(() => {
                    store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
                    return;
                  });
              })
              .catch(() => {
                store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
                alertMessage('danger', `${t('Upload Image')}`, `${t('UPLOAD_IMAGE_FAILED')}`);
                return;
              });
            portraitImageUrl.current = url.split('?')[0];
          })
          .catch(() => {
            store.dispatch({ type: 'HIDE_LOADING', hideLoading: true });
            return;
          });
      }
    }
  };

  const onStartEditFullName = () => {
    setFullNameEditing(true);
  };

  const onStartEditDOB = () => {
    setDOBEditing(true);
    setIsVisibleDOBDatePicker(true);
  };

  const onStartEditHomeTown = () => {
    setHomeTownEditing(true);
  };

  const onStartEditAddress = () => {
    setAddressEditing(true);
  };

  const onStartEditIssueDate = () => {
    setIssueDateEditing(true);
    setIsVisibleIssueDateDatePicker(true);
  };

  const onStartEditIssuePlace = () => {
    setIssuePlaceEditing(true);
  };

  const openProvincePicker = () => {
    Keyboard.dismiss();
    modalizeProvinceRef.current?.open();
  };

  const openResidenceProvincePicker = () => {
    Keyboard.dismiss();
    modalizeResidenceProvinceRef.current?.open();
  };

  const openResidenceDistrictPicker = () => {
    Keyboard.dismiss();
    modalizeResidenceDistrictRef.current?.open();
  };

  const clearProvincePickerData = () => {
    setProvinceSearchText('');
    setProvinceList(addressData);
  };

  const clearResidenceProvincePickerData = () => {
    setResidenceProvinceSearchText('');
    setResidenceProvinceList(addressData);
  };

  const closeProvincePicker = () => {
    modalizeProvinceRef.current?.close();
    clearProvincePickerData();
  };

  const closeResidenceProvincePicker = () => {
    modalizeResidenceProvinceRef.current?.close();
    clearResidenceProvincePickerData();
  };

  const openDistrictPicker = () => {
    Keyboard.dismiss();
    modalizeDistrictRef.current?.open();
  };

  const onChangeProvinceSearchText = (value: string) => {
    setProvinceSearchText(value);
    if (value.trim() === '') {
      setProvinceList(addressData);
    } else {
      setProvinceList(addressData.filter(item => item.cityLabel.toUpperCase().includes(value.toUpperCase())));
    }
  };

  const onChangeResidenceProvinceSearchText = (value: string) => {
    setResidenceProvinceSearchText(value);
    if (value.trim() === '') {
      setResidenceProvinceList(addressData);
    } else {
      setResidenceProvinceList(addressData.filter(item => item.cityLabel.toUpperCase().includes(value.toUpperCase())));
    }
  };

  const onChangeDistrictSearchText = (value: string) => {
    setDistrictSearchText(value);
    if (value.trim() === '') {
      setDistrictList(selectedProvince.districtList);
    } else {
      setDistrictList(
        selectedProvince.districtList.filter(item => item.districtLabel.toUpperCase().includes(value.toUpperCase()))
      );
    }
  };

  const onChangeResidenceDistrictSearchText = (value: string) => {
    setResidenceDistrictSearchText(value);
    if (value.trim() === '') {
      setResidenceDistrictList(selectedResidenceProvince.districtList);
    } else {
      setResidenceDistrictList(
        selectedResidenceProvince.districtList.filter(item =>
          item.districtLabel.toUpperCase().includes(value.toUpperCase())
        )
      );
    }
  };

  const clearDistrictPickerData = () => {
    setDistrictSearchText('');
    setDistrictList(selectedProvince.districtList);
  };

  const clearResidenceDistrictPickerData = () => {
    setResidenceDistrictSearchText('');
    setResidenceDistrictList(selectedResidenceProvince.districtList);
  };

  const closeDistrictPicker = () => {
    modalizeDistrictRef.current?.close();
    clearDistrictPickerData();
  };

  const closeResidenceDistrictPicker = () => {
    modalizeResidenceDistrictRef.current?.close();
    clearResidenceDistrictPickerData();
  };

  const onChangeProvince = (data: IAddressCityData) => {
    setSelectedProvince(data);
    setSelectedDistrict(data.districtList[0]);
    setDistrictList(data.districtList);
    closeProvincePicker();
  };

  const onChangeResidenceProvince = (data: IAddressCityData) => {
    setSelectedResidenceProvince(data);
    setSelectedResidenceDistrict(data.districtList[0]);
    setResidenceDistrictList(data.districtList);
    closeResidenceProvincePicker();
  };

  const onChangeDinstrict = (data: IAddressDistrictData) => {
    setSelectedDistrict(data);
    closeDistrictPicker();
  };

  const onChangeResidenceDinstrict = (data: IAddressDistrictData) => {
    setSelectedResidenceDistrict(data);
    closeResidenceDistrictPicker();
  };

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        headerTitle={
          <View style={[globalStyles.container, globalStyles.alignCenter]}>
            <KisEKYCStep3 height={scaleSize(32)} width={scaleSize(275)} />
          </View>
        }
        goBackAction={goBack}
      />
      {Platform.OS === 'android' ? (
        <ScrollView keyboardDismissMode={'interactive'} keyboardShouldPersistTaps={'handled'}>
          <Text style={styles.titleText} allowFontScaling={false}>
            {t('Personal Information')}
          </Text>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.fieldContainer]}>
            <Text style={styles.fieldKeyText} allowFontScaling={false}>
              {t('ID Card')}:
            </Text>
            {idCardEditing === false ? (
              <Text style={styles.fieldValueText} allowFontScaling={false} numberOfLines={1}>
                {idCard}
              </Text>
            ) : (
              <TextInputComponent
                // ref1={input => {
                //   confirmPasswordTextInput = input;
                // }}
                value={idCard}
                onChangeText={onChangeIdCard}
                wholeContainerStyle={[styles.wholeContainerStyle]}
                textInputContainerStyle={[
                  globalStyles.justifyCenter,
                  {
                    ...(idCardError === false ? styles.textInputContainerStyle2 : styles.textInputContainerStyleError2),
                  },
                ]}
                placeholderTextColor={Colors.LIGHTTextDisable}
                placeholder={'ID'}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                autoCapitalize={'none'}
                keyboardType={'number-pad'}
              />
            )}
            {idCardEditing === false && <View style={globalStyles.container} />}
            {idCardEditing === false &&
              validateField === true &&
              dataEkyc.ekycSdkData?.QR_CODE_RESULT.split('|')[0] != null &&
              (dataEkyc.ekycSdkData?.QR_CODE_RESULT.split('|')[0].trim() ===
              dataEkyc.ekycSdkData?.INFO_RESULT.object.id.trim() ? (
                <IconOK height={scaleSize(16)} width={scaleSize(16)} />
              ) : (
                <IconClose height={scaleSize(20)} width={scaleSize(20)} />
              ))}
            {idCardEditing === false && <View style={globalStyles.container} />}
            {idCardEditing === false && (
              <TouchableOpacity onPress={onStartEditIdCard}>
                <IconEdit height={scaleSize(24)} width={scaleSize(24)} />
              </TouchableOpacity>
            )}
          </View>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.fieldContainer]}>
            <Text style={styles.fieldKeyText} allowFontScaling={false}>
              {t('Full Name')}:
            </Text>
            {fullNameEditing === false ? (
              <Text style={styles.fieldValueText} allowFontScaling={false} numberOfLines={2}>
                {fullName}
              </Text>
            ) : (
              <TextInputComponent
                value={fullName}
                onChangeText={onChangeFullName}
                wholeContainerStyle={[styles.wholeContainerStyle]}
                textInputContainerStyle={[
                  globalStyles.justifyCenter,
                  {
                    ...(fullNameError === false
                      ? styles.textInputContainerStyle2
                      : styles.textInputContainerStyleError2),
                  },
                ]}
                placeholderTextColor={Colors.LIGHTTextDisable}
                placeholder={'Full name'}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                autoCapitalize={'none'}
              />
            )}
            {fullNameEditing === false && <View style={globalStyles.container} />}
            {fullNameEditing === false &&
              validateField === true &&
              dataEkyc.ekycSdkData?.QR_CODE_RESULT.split('|')[2] != null &&
              (dataEkyc.ekycSdkData?.QR_CODE_RESULT.split('|')[2].toUpperCase().trim() ===
              dataEkyc.ekycSdkData?.INFO_RESULT.object.name.toUpperCase().trim() ? (
                <IconOK height={scaleSize(16)} width={scaleSize(16)} />
              ) : (
                <IconClose height={scaleSize(20)} width={scaleSize(20)} />
              ))}
            {fullNameEditing === false && <View style={globalStyles.container} />}
            {fullNameEditing === false && (
              <TouchableOpacity onPress={onStartEditFullName}>
                <IconEdit height={scaleSize(24)} width={scaleSize(24)} />
              </TouchableOpacity>
            )}
          </View>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.fieldContainer]}>
            <Text style={styles.fieldKeyText} allowFontScaling={false}>
              {t('Date of Birth')}:
            </Text>
            {dobEditing === false ? (
              <Text style={styles.fieldValueText} allowFontScaling={false} numberOfLines={1}>
                {formatDateToString(dob, 'dd/MM/yyyy')}
              </Text>
            ) : (
              <View style={styles.datePickerContainer}>
                <Text style={styles.fieldValueText} allowFontScaling={false} numberOfLines={1}>
                  {formatDateToString(dob, 'dd/MM/yyyy')}
                </Text>
                <DatePicker
                  onChange={onChangeDOB}
                  value={dob}
                  maxDate={new Date()}
                  isVisibleDatePicker={isVisibleDOBDatePicker}
                  onClose={onCloseDatePicker}
                  isVisibleTextDatePicker
                />
              </View>
            )}
            <View style={globalStyles.container} />
            {validateField === true &&
              dataEkyc.ekycSdkData?.QR_CODE_RESULT.split('|')[3] != null &&
              (isEqual(
                formatStringToDate(dataEkyc.ekycSdkData?.QR_CODE_RESULT.split('|')[3], 'ddMMyyyy').setHours(0, 0, 0, 0),
                formatStringToDate(dataEkyc.ekycSdkData?.INFO_RESULT.object.birth_day, 'dd/MM/yyyy').setHours(
                  0,
                  0,
                  0,
                  0
                )
              ) ? (
                <IconOK height={scaleSize(16)} width={scaleSize(16)} />
              ) : (
                <IconClose height={scaleSize(20)} width={scaleSize(20)} />
              ))}
            <View style={globalStyles.container} />
            <TouchableOpacity onPress={onStartEditDOB}>
              <IconEdit height={scaleSize(24)} width={scaleSize(24)} />
            </TouchableOpacity>
          </View>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.fieldContainer]}>
            <Text style={styles.fieldKeyText} allowFontScaling={false}>
              {t('Home Town')}:
            </Text>
            <Text style={styles.fieldValueText} allowFontScaling={false} numberOfLines={3}>
              {`${homeTown}, ${selectedDistrict.districtLabel}, ${selectedProvince.cityLabel}`}
            </Text>
            {homeTownEditing === false && <View style={globalStyles.container} />}
            {homeTownEditing === false && (
              <TouchableOpacity onPress={onStartEditHomeTown}>
                <IconEdit height={scaleSize(24)} width={scaleSize(24)} />
              </TouchableOpacity>
            )}
          </View>
          {homeTownEditing === true && (
            <>
              <View style={[styles.marginHorizontal16]}>
                <TouchableOpacity
                  style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.alignCenter,
                    styles.bankPickerContainer,
                    styles.marginVertical3,
                  ]}
                  onPress={openProvincePicker}
                >
                  <Text style={styles.bankNameShortDisplay}>{selectedProvince.cityLabel}</Text>
                  <Down2 height={scaleSize(24)} width={scaleSize(24)} />
                </TouchableOpacity>
              </View>
              <View style={[styles.marginHorizontal16]}>
                <TouchableOpacity
                  style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.alignCenter,
                    styles.bankPickerContainer,
                    styles.marginVertical3,
                  ]}
                  onPress={openDistrictPicker}
                >
                  <Text style={styles.bankNameShortDisplay}>{selectedDistrict.districtLabel}</Text>
                  <Down2 height={scaleSize(24)} width={scaleSize(24)} />
                </TouchableOpacity>
              </View>
              <TextInputComponent
                value={homeTown}
                onChangeText={onChangeHomeTown}
                wholeContainerStyle={[styles.marginHorizontal16, styles.marginVertical3]}
                placeholder={'Address'}
                labelTextStyle={styles.labelTextStyle}
                textInputContainerStyle={[
                  globalStyles.justifyCenter,
                  {
                    ...(homeTownError === false
                      ? styles.textInputContainerStyle2
                      : styles.textInputContainerStyleError2),
                  },
                ]}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                autoCapitalize={'none'}
              />
            </>
          )}
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.fieldContainer]}>
            <Text style={styles.fieldKeyText} allowFontScaling={false}>
              {t('Address')}:
            </Text>
            <Text style={styles.fieldValueText} allowFontScaling={false} numberOfLines={3}>
              {`${address}, ${selectedResidenceDistrict.districtLabel}, ${selectedResidenceProvince.cityLabel}`}
            </Text>
            {addressEditing === false && <View style={globalStyles.container} />}
            {addressEditing === false &&
              validateField === true &&
              dataEkyc.ekycSdkData?.QR_CODE_RESULT.split('|')[5] != null &&
              (dataEkyc.ekycSdkData?.QR_CODE_RESULT.split('|')[5].toUpperCase().trim() ===
              dataEkyc.ekycSdkData?.INFO_RESULT.object.recent_location.replace('\n', ' ').toUpperCase().trim() ? (
                <IconOK height={scaleSize(16)} width={scaleSize(16)} />
              ) : (
                <IconClose height={scaleSize(20)} width={scaleSize(20)} />
              ))}
            {addressEditing === false && <View style={globalStyles.container} />}
            {addressEditing === false && (
              <TouchableOpacity onPress={onStartEditAddress}>
                <IconEdit height={scaleSize(24)} width={scaleSize(24)} />
              </TouchableOpacity>
            )}
          </View>
          {addressEditing === true && (
            <>
              <View style={[styles.marginHorizontal16]}>
                <TouchableOpacity
                  style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.alignCenter,
                    styles.bankPickerContainer,
                    styles.marginVertical3,
                  ]}
                  onPress={openResidenceProvincePicker}
                >
                  <Text style={styles.bankNameShortDisplay}>{selectedResidenceProvince.cityLabel}</Text>
                  <Down2 height={scaleSize(24)} width={scaleSize(24)} />
                </TouchableOpacity>
              </View>
              <View style={[styles.marginHorizontal16]}>
                <TouchableOpacity
                  style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.alignCenter,
                    styles.bankPickerContainer,
                    styles.marginVertical3,
                  ]}
                  onPress={openResidenceDistrictPicker}
                >
                  <Text style={styles.bankNameShortDisplay}>{selectedResidenceDistrict.districtLabel}</Text>
                  <Down2 height={scaleSize(24)} width={scaleSize(24)} />
                </TouchableOpacity>
              </View>
              <TextInputComponent
                value={address}
                onChangeText={onChangeAddress}
                placeholder={'Address'}
                labelTextStyle={styles.labelTextStyle}
                wholeContainerStyle={[styles.marginHorizontal16, styles.marginVertical3]}
                textInputContainerStyle={[
                  globalStyles.justifyCenter,
                  {
                    ...(addressError === false
                      ? styles.textInputContainerStyle2
                      : styles.textInputContainerStyleError2),
                  },
                ]}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                autoCapitalize={'none'}
              />
            </>
          )}
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.fieldContainer]}>
            <Text style={styles.fieldKeyText} allowFontScaling={false}>
              {t('Issue Date')}:
            </Text>
            {issueDateEditing === false ? (
              <Text style={styles.fieldValueText} allowFontScaling={false} numberOfLines={1}>
                {formatDateToString(issueDate, 'dd/MM/yyyy')}
              </Text>
            ) : (
              <View style={styles.datePickerContainer}>
                <Text style={styles.fieldValueText} allowFontScaling={false} numberOfLines={1}>
                  {formatDateToString(issueDate, 'dd/MM/yyyy')}
                </Text>
                <DatePicker
                  onChange={onChangeIssueDate}
                  value={issueDate}
                  maxDate={new Date()}
                  isVisibleDatePicker={isVisibleIssueDateDatePicker}
                  onClose={onCloseDatePicker}
                  isVisibleTextDatePicker
                />
              </View>
            )}
            <View style={globalStyles.container} />
            {validateField === true &&
              dataEkyc.ekycSdkData?.QR_CODE_RESULT.split('|')[6] != null &&
              (isEqual(
                formatStringToDate(dataEkyc.ekycSdkData?.QR_CODE_RESULT.split('|')[6], 'ddMMyyyy').setHours(0, 0, 0, 0),
                formatStringToDate(dataEkyc.ekycSdkData?.INFO_RESULT.object.issue_date, 'dd/MM/yyyy').setHours(
                  0,
                  0,
                  0,
                  0
                )
              ) ? (
                <IconOK height={scaleSize(16)} width={scaleSize(16)} />
              ) : (
                <IconClose height={scaleSize(20)} width={scaleSize(20)} />
              ))}
            <View style={globalStyles.container} />
            <TouchableOpacity onPress={onStartEditIssueDate}>
              <IconEdit height={scaleSize(24)} width={scaleSize(24)} />
            </TouchableOpacity>
          </View>
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              styles.fieldContainer,
              styles.marginBottom26,
            ]}
          >
            <Text style={styles.fieldKeyText} allowFontScaling={false}>
              {t('Issue Place')}:
            </Text>
            {issuePlaceEditing === false ? (
              <Text style={styles.fieldValueText} allowFontScaling={false} numberOfLines={3}>
                {issuePlace}
              </Text>
            ) : (
              <TextInputComponent
                value={issuePlace}
                onChangeText={onChangeIssuePlace}
                wholeContainerStyle={[styles.wholeContainerStyle]}
                textInputContainerStyle={[
                  globalStyles.justifyCenter,
                  {
                    ...(issuePlaceError === false
                      ? styles.textInputContainerStyle2
                      : styles.textInputContainerStyleError2),
                  },
                ]}
                placeholderTextColor={Colors.LIGHTTextDisable}
                placeholder={'Issue place'}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                autoCapitalize={'none'}
              />
            )}
            {issuePlaceEditing === false && <View style={globalStyles.container} />}
            {issuePlaceEditing === false && (
              <TouchableOpacity onPress={onStartEditIssuePlace}>
                <IconEdit height={scaleSize(24)} width={scaleSize(24)} />
              </TouchableOpacity>
            )}
          </View>
          {idCardError === true ||
          fullNameError === true ||
          homeTownError === true ||
          addressError === true ||
          issuePlaceError === true ? (
            <Text style={styles.textError} allowFontScaling={false}>{`- ${t('INVALID_INFORMATION')}`}</Text>
          ) : (
            <View />
          )}
          {(idCardError === true ||
            fullNameError === true ||
            homeTownError === true ||
            addressError === true ||
            issuePlaceError === true) && <View style={styles.height18} />}
          <View style={[globalStyles.centered, styles.executeButtonContainer]}>
            <TouchableOpacity
              style={[globalStyles.container, globalStyles.fillWidth, globalStyles.centered, styles.executeButton]}
              onPress={onSubmitForm}
            >
              <Text style={styles.executeButtonText} allowFontScaling={false}>
                {t(
                  idCardEditing === true ||
                    fullNameEditing === true ||
                    homeTownEditing === true ||
                    addressEditing === true ||
                    dobEditing === true ||
                    issueDateEditing === true ||
                    issuePlaceEditing === true
                    ? 'Save'
                    : 'Accept'
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <KeyboardAwareScrollView
          keyboardDismissMode={'interactive'}
          keyboardShouldPersistTaps={'handled'}
          automaticallyAdjustContentInsets={false}
        >
          <Text style={styles.titleText} allowFontScaling={false}>
            {t('Personal Information')}
          </Text>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.fieldContainer]}>
            <Text style={styles.fieldKeyText} allowFontScaling={false}>
              {t('ID Card')}:
            </Text>
            {idCardEditing === false ? (
              <Text style={styles.fieldValueText} allowFontScaling={false} numberOfLines={1}>
                {idCard}
              </Text>
            ) : (
              <TextInputComponent
                // ref1={input => {
                //   confirmPasswordTextInput = input;
                // }}
                value={idCard}
                onChangeText={onChangeIdCard}
                wholeContainerStyle={[styles.wholeContainerStyle]}
                textInputContainerStyle={[
                  globalStyles.justifyCenter,
                  {
                    ...(idCardError === false ? styles.textInputContainerStyle2 : styles.textInputContainerStyleError2),
                  },
                ]}
                placeholderTextColor={Colors.LIGHTTextDisable}
                placeholder={'ID'}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                autoCapitalize={'none'}
                keyboardType={'number-pad'}
              />
            )}
            {idCardEditing === false && <View style={globalStyles.container} />}
            {idCardEditing === false &&
              validateField === true &&
              dataEkyc.ekycSdkData?.QR_CODE_RESULT.split('|')[0] != null &&
              (dataEkyc.ekycSdkData?.QR_CODE_RESULT.split('|')[0].trim() ===
              dataEkyc.ekycSdkData?.INFO_RESULT.object.id.trim() ? (
                <IconOK height={scaleSize(16)} width={scaleSize(16)} />
              ) : (
                <IconClose height={scaleSize(20)} width={scaleSize(20)} />
              ))}
            {idCardEditing === false && <View style={globalStyles.container} />}
            {idCardEditing === false && (
              <TouchableOpacity onPress={onStartEditIdCard}>
                <IconEdit height={scaleSize(24)} width={scaleSize(24)} />
              </TouchableOpacity>
            )}
          </View>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.fieldContainer]}>
            <Text style={styles.fieldKeyText} allowFontScaling={false}>
              {t('Full Name')}:
            </Text>
            {fullNameEditing === false ? (
              <Text style={styles.fieldValueText} allowFontScaling={false} numberOfLines={2}>
                {fullName}
              </Text>
            ) : (
              <TextInputComponent
                value={fullName}
                onChangeText={onChangeFullName}
                wholeContainerStyle={[styles.wholeContainerStyle]}
                textInputContainerStyle={[
                  globalStyles.justifyCenter,
                  {
                    ...(fullNameError === false
                      ? styles.textInputContainerStyle2
                      : styles.textInputContainerStyleError2),
                  },
                ]}
                placeholderTextColor={Colors.LIGHTTextDisable}
                placeholder={'Full name'}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                autoCapitalize={'none'}
              />
            )}
            {fullNameEditing === false && <View style={globalStyles.container} />}
            {fullNameEditing === false &&
              validateField === true &&
              dataEkyc.ekycSdkData?.QR_CODE_RESULT.split('|')[2] != null &&
              (dataEkyc.ekycSdkData?.QR_CODE_RESULT.split('|')[2].toUpperCase().trim() ===
              dataEkyc.ekycSdkData?.INFO_RESULT.object.name.toUpperCase().trim() ? (
                <IconOK height={scaleSize(16)} width={scaleSize(16)} />
              ) : (
                <IconClose height={scaleSize(20)} width={scaleSize(20)} />
              ))}
            {fullNameEditing === false && <View style={globalStyles.container} />}
            {fullNameEditing === false && (
              <TouchableOpacity onPress={onStartEditFullName}>
                <IconEdit height={scaleSize(24)} width={scaleSize(24)} />
              </TouchableOpacity>
            )}
          </View>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.fieldContainer]}>
            <Text style={styles.fieldKeyText} allowFontScaling={false}>
              {t('Date of Birth')}:
            </Text>
            {dobEditing === false ? (
              <Text style={styles.fieldValueText} allowFontScaling={false} numberOfLines={1}>
                {formatDateToString(dob, 'dd/MM/yyyy')}
              </Text>
            ) : (
              <View style={styles.datePickerContainer}>
                <Text style={styles.fieldValueText} allowFontScaling={false} numberOfLines={1}>
                  {formatDateToString(dob, 'dd/MM/yyyy')}
                </Text>
                <DatePicker
                  onChange={onChangeDOB}
                  value={dob}
                  maxDate={new Date()}
                  isVisibleDatePicker={isVisibleDOBDatePicker}
                  onClose={onCloseDatePicker}
                  isVisibleTextDatePicker
                />
              </View>
            )}
            <View style={globalStyles.container} />
            {validateField === true &&
              dataEkyc.ekycSdkData?.QR_CODE_RESULT.split('|')[3] != null &&
              (isEqual(
                formatStringToDate(dataEkyc.ekycSdkData?.QR_CODE_RESULT.split('|')[3], 'ddMMyyyy').setHours(0, 0, 0, 0),
                formatStringToDate(dataEkyc.ekycSdkData?.INFO_RESULT.object.birth_day, 'dd/MM/yyyy').setHours(
                  0,
                  0,
                  0,
                  0
                )
              ) ? (
                <IconOK height={scaleSize(16)} width={scaleSize(16)} />
              ) : (
                <IconClose height={scaleSize(20)} width={scaleSize(20)} />
              ))}
            <View style={globalStyles.container} />

            <TouchableOpacity onPress={onStartEditDOB}>
              <IconEdit height={scaleSize(24)} width={scaleSize(24)} />
            </TouchableOpacity>
          </View>
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.fieldContainer]}>
            <Text style={styles.fieldKeyText} allowFontScaling={false}>
              {t('Home Town')}:
            </Text>
            <Text style={styles.fieldValueText} allowFontScaling={false} numberOfLines={3}>
              {`${homeTown}, ${selectedDistrict.districtLabel}, ${selectedProvince.cityLabel}`}
            </Text>
            {homeTownEditing === false && <View style={globalStyles.container} />}
            {homeTownEditing === false && (
              <TouchableOpacity onPress={onStartEditHomeTown}>
                <IconEdit height={scaleSize(24)} width={scaleSize(24)} />
              </TouchableOpacity>
            )}
          </View>
          {homeTownEditing === true && (
            <>
              <View style={[styles.marginHorizontal16]}>
                <TouchableOpacity
                  style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.alignCenter,
                    styles.bankPickerContainer,
                    styles.marginVertical3,
                  ]}
                  onPress={openProvincePicker}
                >
                  <Text style={styles.bankNameShortDisplay}>{selectedProvince.cityLabel}</Text>
                  <Down2 height={scaleSize(24)} width={scaleSize(24)} />
                </TouchableOpacity>
              </View>
              <View style={[styles.marginHorizontal16]}>
                <TouchableOpacity
                  style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.alignCenter,
                    styles.bankPickerContainer,
                    styles.marginVertical3,
                  ]}
                  onPress={openDistrictPicker}
                >
                  <Text style={styles.bankNameShortDisplay}>{selectedDistrict.districtLabel}</Text>
                  <Down2 height={scaleSize(24)} width={scaleSize(24)} />
                </TouchableOpacity>
              </View>
              <TextInputComponent
                value={homeTown}
                onChangeText={onChangeHomeTown}
                wholeContainerStyle={[styles.marginHorizontal16, styles.marginVertical3]}
                placeholder={'Address'}
                labelTextStyle={styles.labelTextStyle}
                textInputContainerStyle={[
                  globalStyles.justifyCenter,
                  {
                    ...(homeTownError === false
                      ? styles.textInputContainerStyle2
                      : styles.textInputContainerStyleError2),
                  },
                ]}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                autoCapitalize={'none'}
              />
            </>
          )}
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.fieldContainer]}>
            <Text style={styles.fieldKeyText} allowFontScaling={false}>
              {t('Address')}
            </Text>
            <Text style={styles.fieldValueText} allowFontScaling={false} numberOfLines={3}>
              {`${address}, ${selectedResidenceDistrict.districtLabel}, ${selectedResidenceProvince.cityLabel}`}
            </Text>
            {addressEditing === false && <View style={globalStyles.container} />}
            {addressEditing === false &&
              validateField === true &&
              dataEkyc.ekycSdkData?.QR_CODE_RESULT.split('|')[5] != null &&
              (dataEkyc.ekycSdkData?.QR_CODE_RESULT.split('|')[5].toUpperCase().trim() ===
              dataEkyc.ekycSdkData?.INFO_RESULT.object.recent_location.replace('\n', ' ').toUpperCase().trim() ? (
                <IconOK height={scaleSize(16)} width={scaleSize(16)} />
              ) : (
                <IconClose height={scaleSize(20)} width={scaleSize(20)} />
              ))}
            {addressEditing === false && <View style={globalStyles.container} />}
            {addressEditing === false && (
              <TouchableOpacity onPress={onStartEditAddress}>
                <IconEdit height={scaleSize(24)} width={scaleSize(24)} />
              </TouchableOpacity>
            )}
          </View>
          {addressEditing === true && (
            <>
              <View style={[styles.marginHorizontal16]}>
                <TouchableOpacity
                  style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.alignCenter,
                    styles.bankPickerContainer,
                    styles.marginVertical3,
                  ]}
                  onPress={openResidenceProvincePicker}
                >
                  <Text style={styles.bankNameShortDisplay}>{selectedResidenceProvince.cityLabel}</Text>
                  <Down2 height={scaleSize(24)} width={scaleSize(24)} />
                </TouchableOpacity>
              </View>
              <View style={[styles.marginHorizontal16]}>
                <TouchableOpacity
                  style={[
                    globalStyles.flexDirectionRow,
                    globalStyles.alignCenter,
                    styles.bankPickerContainer,
                    styles.marginVertical3,
                  ]}
                  onPress={openResidenceDistrictPicker}
                >
                  <Text style={styles.bankNameShortDisplay}>{selectedResidenceDistrict.districtLabel}</Text>
                  <Down2 height={scaleSize(24)} width={scaleSize(24)} />
                </TouchableOpacity>
              </View>
              <TextInputComponent
                value={address}
                onChangeText={onChangeAddress}
                placeholder={'Address'}
                labelTextStyle={styles.labelTextStyle}
                wholeContainerStyle={[styles.marginHorizontal16, styles.marginVertical3]}
                textInputContainerStyle={[
                  globalStyles.justifyCenter,
                  {
                    ...(addressError === false
                      ? styles.textInputContainerStyle2
                      : styles.textInputContainerStyleError2),
                  },
                ]}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                autoCapitalize={'none'}
              />
            </>
          )}
          <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.fieldContainer]}>
            <Text style={styles.fieldKeyText} allowFontScaling={false}>
              {t('Issue Date')}
            </Text>
            {issueDateEditing === false ? (
              <Text style={styles.fieldValueText} allowFontScaling={false} numberOfLines={1}>
                {formatDateToString(issueDate, 'dd/MM/yyyy')}
              </Text>
            ) : (
              <View style={styles.datePickerContainer}>
                <Text style={styles.fieldValueText} allowFontScaling={false} numberOfLines={1}>
                  {formatDateToString(issueDate, 'dd/MM/yyyy')}
                </Text>
                <DatePicker
                  onChange={onChangeIssueDate}
                  value={issueDate}
                  maxDate={new Date()}
                  isVisibleDatePicker={isVisibleIssueDateDatePicker}
                  onClose={onCloseDatePicker}
                  isVisibleTextDatePicker
                />
              </View>
            )}
            <View style={globalStyles.container} />
            {validateField === true &&
              dataEkyc.ekycSdkData?.QR_CODE_RESULT.split('|')[6] != null &&
              (isEqual(
                formatStringToDate(dataEkyc.ekycSdkData?.QR_CODE_RESULT.split('|')[6], 'ddMMyyyy').setHours(0, 0, 0, 0),
                formatStringToDate(dataEkyc.ekycSdkData?.INFO_RESULT.object.issue_date, 'dd/MM/yyyy').setHours(
                  0,
                  0,
                  0,
                  0
                )
              ) ? (
                <IconOK height={scaleSize(16)} width={scaleSize(16)} />
              ) : (
                <IconClose height={scaleSize(20)} width={scaleSize(20)} />
              ))}
            <View style={globalStyles.container} />

            <TouchableOpacity onPress={onStartEditIssueDate}>
              <IconEdit height={scaleSize(24)} width={scaleSize(24)} />
            </TouchableOpacity>
          </View>
          <View
            style={[
              globalStyles.flexDirectionRow,
              globalStyles.alignCenter,
              styles.fieldContainer,
              styles.marginBottom26,
            ]}
          >
            <Text style={styles.fieldKeyText} allowFontScaling={false}>
              {t('Issue Place')}
            </Text>
            {issuePlaceEditing === false ? (
              <Text style={styles.fieldValueText} allowFontScaling={false} numberOfLines={3}>
                {issuePlace}
              </Text>
            ) : (
              <TextInputComponent
                value={issuePlace}
                onChangeText={onChangeIssuePlace}
                wholeContainerStyle={[styles.wholeContainerStyle]}
                textInputContainerStyle={[
                  globalStyles.justifyCenter,
                  {
                    ...(issuePlaceError === false
                      ? styles.textInputContainerStyle2
                      : styles.textInputContainerStyleError2),
                  },
                ]}
                placeholderTextColor={Colors.LIGHTTextDisable}
                placeholder={'Issue place'}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                autoCapitalize={'none'}
              />
            )}
            {issuePlaceEditing === false && <View style={globalStyles.container} />}
            {issuePlaceEditing === false && (
              <TouchableOpacity onPress={onStartEditIssuePlace}>
                <IconEdit height={scaleSize(24)} width={scaleSize(24)} />
              </TouchableOpacity>
            )}
          </View>
          {idCardError === true ||
          fullNameError === true ||
          homeTownError === true ||
          addressError === true ||
          issuePlaceError === true ? (
            <Text style={styles.textError} allowFontScaling={false}>{`- ${t('INVALID_INFORMATION')}`}</Text>
          ) : (
            <View />
          )}
          {(idCardError === true ||
            fullNameError === true ||
            homeTownError === true ||
            addressError === true ||
            issuePlaceError === true) && <View style={styles.height18} />}
          <View style={[globalStyles.centered, styles.executeButtonContainer]}>
            <TouchableOpacity
              style={[globalStyles.container, globalStyles.fillWidth, globalStyles.centered, styles.executeButton]}
              onPress={onSubmitForm}
            >
              <Text style={styles.executeButtonText} allowFontScaling={false}>
                {t(
                  idCardEditing === true ||
                    fullNameEditing === true ||
                    homeTownEditing === true ||
                    addressEditing === true ||
                    dobEditing === true ||
                    issueDateEditing === true ||
                    issuePlaceEditing === true
                    ? 'Save'
                    : 'Accept'
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      )}
      <Modalize
        ref={modalizeProvinceRef}
        modalHeight={scaleSize(622)}
        onClosed={clearProvincePickerData}
        HeaderComponent={
          <View style={styles.headerModalize3}>
            <View
              style={[
                globalStyles.container,
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                styles.headerModalize1,
              ]}
            >
              <Text style={styles.headerModalize1Text}>{t('Select province')}</Text>
              <View style={globalStyles.container} />
              <TouchableOpacity onPress={closeProvincePicker}>
                <CloseIcon height={scaleSize(24)} width={scaleSize(24)} style={styles.marginRight16} />
              </TouchableOpacity>
            </View>
            <View style={[globalStyles.container, globalStyles.centered, styles.headerModalize2]}>
              <TextInputComponent
                wholeContainerStyle={[globalStyles.fillWidth, styles.wholeContainerStyle3]}
                value={provinceSearchText}
                onChangeText={onChangeProvinceSearchText}
                placeholder={'Search'}
                placeholderTextColor={Colors.DARKTextDisable}
                textInputContainerStyle={[
                  globalStyles.container,
                  globalStyles.flexDirectionRow,
                  globalStyles.alignCenter,
                  styles.marginHorizontal16,
                  styles.textInputContainerStyle,
                ]}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                iconRight={
                  <SearchIcon2 height={scaleSize(24)} width={scaleSize(24)} style={styles.marginHorizontal10} />
                }
              />
            </View>
          </View>
        }
      >
        {provinceList.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => onChangeProvince(item)}
              key={`city+key+${index}`}
              style={[globalStyles.justifyCenter, globalStyles.fillWidth, styles.kisBankBranchItemContainer]}
            >
              <Text style={styles.kisBankBranchItemText}>{item.cityLabel}</Text>
            </TouchableOpacity>
          );
        })}
      </Modalize>
      <Modalize
        ref={modalizeDistrictRef}
        modalHeight={scaleSize(622)}
        onClosed={clearDistrictPickerData}
        HeaderComponent={
          <View style={styles.headerModalize3}>
            <View
              style={[
                globalStyles.container,
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                styles.headerModalize1,
              ]}
            >
              <Text style={styles.headerModalize1Text}>{t('Select district')}</Text>
              <View style={globalStyles.container} />
              <TouchableOpacity onPress={closeDistrictPicker}>
                <CloseIcon height={scaleSize(24)} width={scaleSize(24)} style={styles.marginRight16} />
              </TouchableOpacity>
            </View>
            <View style={[globalStyles.container, globalStyles.centered, styles.headerModalize2]}>
              <TextInputComponent
                wholeContainerStyle={[globalStyles.fillWidth, styles.wholeContainerStyle3]}
                value={districtSearchText}
                onChangeText={onChangeDistrictSearchText}
                placeholder={'Search'}
                placeholderTextColor={Colors.DARKTextDisable}
                textInputContainerStyle={[
                  globalStyles.container,
                  globalStyles.flexDirectionRow,
                  globalStyles.alignCenter,
                  styles.marginHorizontal16,
                  styles.textInputContainerStyle,
                ]}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                iconRight={
                  <SearchIcon2 height={scaleSize(24)} width={scaleSize(24)} style={styles.marginHorizontal10} />
                }
              />
            </View>
          </View>
        }
      >
        {districtList.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => onChangeDinstrict(item)}
              key={`district+key+${index}`}
              style={[globalStyles.justifyCenter, globalStyles.fillWidth, styles.kisBankBranchItemContainer]}
            >
              <Text style={styles.kisBankBranchItemText}>{item.districtLabel}</Text>
            </TouchableOpacity>
          );
        })}
      </Modalize>

      <Modalize
        ref={modalizeResidenceProvinceRef}
        modalHeight={scaleSize(622)}
        onClosed={clearResidenceProvincePickerData}
        HeaderComponent={
          <View style={styles.headerModalize3}>
            <View
              style={[
                globalStyles.container,
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                styles.headerModalize1,
              ]}
            >
              <Text style={styles.headerModalize1Text}>{t('Select province')}</Text>
              <View style={globalStyles.container} />
              <TouchableOpacity onPress={closeResidenceProvincePicker}>
                <CloseIcon height={scaleSize(24)} width={scaleSize(24)} style={styles.marginRight16} />
              </TouchableOpacity>
            </View>
            <View style={[globalStyles.container, globalStyles.centered, styles.headerModalize2]}>
              <TextInputComponent
                wholeContainerStyle={[globalStyles.fillWidth, styles.wholeContainerStyle3]}
                value={provinceResidenceSearchText}
                onChangeText={onChangeResidenceProvinceSearchText}
                placeholder={'Search'}
                placeholderTextColor={Colors.DARKTextDisable}
                textInputContainerStyle={[
                  globalStyles.container,
                  globalStyles.flexDirectionRow,
                  globalStyles.alignCenter,
                  styles.marginHorizontal16,
                  styles.textInputContainerStyle,
                ]}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                iconRight={
                  <SearchIcon2 height={scaleSize(24)} width={scaleSize(24)} style={styles.marginHorizontal10} />
                }
              />
            </View>
          </View>
        }
      >
        {provinceResidenceList.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => onChangeResidenceProvince(item)}
              key={`city+key+${index}`}
              style={[globalStyles.justifyCenter, globalStyles.fillWidth, styles.kisBankBranchItemContainer]}
            >
              <Text style={styles.kisBankBranchItemText}>{item.cityLabel}</Text>
            </TouchableOpacity>
          );
        })}
      </Modalize>
      <Modalize
        ref={modalizeResidenceDistrictRef}
        modalHeight={scaleSize(622)}
        onClosed={clearResidenceDistrictPickerData}
        HeaderComponent={
          <View style={styles.headerModalize3}>
            <View
              style={[
                globalStyles.container,
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                styles.headerModalize1,
              ]}
            >
              <Text style={styles.headerModalize1Text}>{t('Select district')}</Text>
              <View style={globalStyles.container} />
              <TouchableOpacity onPress={closeResidenceDistrictPicker}>
                <CloseIcon height={scaleSize(24)} width={scaleSize(24)} style={styles.marginRight16} />
              </TouchableOpacity>
            </View>
            <View style={[globalStyles.container, globalStyles.centered, styles.headerModalize2]}>
              <TextInputComponent
                wholeContainerStyle={[globalStyles.fillWidth, styles.wholeContainerStyle3]}
                value={districtResidenceSearchText}
                onChangeText={onChangeResidenceDistrictSearchText}
                placeholder={'Search'}
                placeholderTextColor={Colors.DARKTextDisable}
                textInputContainerStyle={[
                  globalStyles.container,
                  globalStyles.flexDirectionRow,
                  globalStyles.alignCenter,
                  styles.marginHorizontal16,
                  styles.textInputContainerStyle,
                ]}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                iconRight={
                  <SearchIcon2 height={scaleSize(24)} width={scaleSize(24)} style={styles.marginHorizontal10} />
                }
              />
            </View>
          </View>
        }
      >
        {districtResidenceList.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => onChangeResidenceDinstrict(item)}
              key={`district+key+${index}`}
              style={[globalStyles.justifyCenter, globalStyles.fillWidth, styles.kisBankBranchItemContainer]}
            >
              <Text style={styles.kisBankBranchItemText}>{item.districtLabel}</Text>
            </TouchableOpacity>
          );
        })}
      </Modalize>
    </View>
  );
};

export default KisEkycStep3PersonalInformation;
