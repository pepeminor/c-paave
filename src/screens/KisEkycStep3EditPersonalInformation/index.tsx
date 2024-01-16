import React, { useRef, useState } from 'react';
import { Keyboard, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import globalStyles, { Colors, scaleSize } from '../../styles';
import KisEKYCStep3 from 'assets/icon/KisEKYCStep3.svg';
import SearchIcon2 from 'assets/icon/SearchIcon2.svg';
import Down2 from 'assets/icon/Down2.svg';
import SelectedIcon from 'assets/icon/OK-Check.svg';
import CloseIcon from 'assets/icon/btn_close.svg';
import UnselectedIcon from 'assets/icon/UnCheck.svg';
import HeaderScreen from 'components/HeaderScreen';
import TextInputComponent from 'components/TextInput';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { addressData, IAddressCityData, IAddressDistrictData } from './data';
import { isBlank } from 'utils';
import config from 'config';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import { LANG } from 'global';
import { StackScreenProps } from 'screens/RootNavigation';
import { EkycActions, EkycSelectors } from 'reduxs/Ekyc';

export enum GENDER {
  MALE = 'Male',
  FEMALE = 'Female',
}

type IReferrerBranchType = {
  value: string;
  labelVI: string;
  labelEN: string;
};

const referrerBranchList: IReferrerBranchType[] = [
  {
    value: 'HEAD OFFICE',
    labelEN: 'HEAD OFFICE',
    labelVI: 'HỘI SỞ CHÍNH TP.HỒ CHÍ MINH',
  },
  {
    value: 'SAI GON TRANSACTION OFFICE',
    labelEN: 'SAI GON TRANSACTION OFFICE',
    labelVI: 'PHÒNG GIAO DỊCH SÀI GÒN – TP.HCM',
  },
  {
    value: 'PHAM NGOC THACH TRANSACTION OFFICE',
    labelEN: 'PHAM NGOC THACH TRANSACTION OFFICE',
    labelVI: 'PHÒNG GIAO DỊCH PHẠM NGỌC THẠCH – TP.HCM',
  },
  {
    value: 'HA NOI BRANCH',
    labelEN: 'HA NOI BRANCH',
    labelVI: 'CHI NHÁNH HÀ NỘI',
  },
  {
    value: 'BA TRIEU TRANSACTION OFFICE',
    labelEN: 'BA TRIEU TRANSACTION OFFICE',
    labelVI: 'PHÒNG GIAO DỊCH BÀ TRIỆU – HÀ NỘI',
  },
  {
    value: 'LANG HA TRANSACTION OFFICE',
    labelEN: 'LANG HA TRANSACTION OFFICE',
    labelVI: 'PHÒNG GIAO DỊCH LÁNG HẠ – HÀ NỘI',
  },
];

const KisEkycStep3PersonalInformation = (props: StackScreenProps<'KisEkycStep3EditPersonalInformation'>) => {
  const dataEkyc = useSelector(EkycSelectors.selectDataEkyc);

  const [gender, setGender] = useState<GENDER>(GENDER.FEMALE); //default value get from previous screen params
  const [yourOccupation, setYourOccupation] = useState<string>(''); //default value get from previous screen params
  const [yourOccupationError, _setYourOccupationError] = useState<boolean>(false);
  const [yourOccupationErrorContent, _setYourOccupationErrorContent] = useState<string>('');
  const [province, setProvince] = useState<string>(dataEkyc.residenceAddressProvince.cityLabel); //default value get from previous screen params
  const [provinceError, _setProvinceError] = useState<boolean>(false);
  const [provinceErrorContent, _setProvinceErrorContent] = useState<string>('');
  const [district, setDistrict] = useState<string>(dataEkyc.residenceAddressDistrict.districtLabel); //default value get from previous screen params
  const [districtError, _setDistrictError] = useState<boolean>(false);
  const [districtErrorContent, _setDistrictErrorContent] = useState<string>('');
  const [address, setAddress] = useState<string>(dataEkyc.residenceAddress); //default value get from previous screen params
  const [addressError, _setAddressError] = useState<boolean>(false);
  const [addressErrorContent, _setAddressErrorContent] = useState<string>('');
  const [contractAddress, setContractAddress] = useState<string>(dataEkyc.residenceAddress); //default value get from previous screen params
  const [contractAddressError, setContractAddressError] = useState<boolean>(false);
  const [contractAddressErrorContent, setContractAddressErrorContent] = useState<string>('');
  const [email, setEmail] = useState<string>(dataEkyc.email); //default value get from previous screen params
  const [emailError, _setEmailError] = useState<boolean>(false);
  const [emailErrorContent, _setEmailErrorContent] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);
  const [phoneNumberErrorContent, setPhoneNumberErrorContent] = useState<string>('');
  const [referrerIdName, setReferrerIdName] = useState<string>('');
  const [referrerIdNameError, setReferrerIdNameError] = useState<boolean>(false);
  const [referrerIdNameErrorContent, setReferrerIdNameErrorContent] = useState<string>('');
  const [selectedReferrerBranch, setSelectedReferrerBranch] = useState<IReferrerBranchType>(referrerBranchList[0]);
  const [contractAddressProvinceList, setContractAddressProvinceList] = useState<IAddressCityData[]>(addressData);
  const [contractAddressDistrictList, setContractAddressDistrictList] = useState<IAddressDistrictData[]>(
    dataEkyc.residenceAddressProvince.districtList
  );
  const [selectedContractAddressProvince, setSelectedContractAddressProvince] = useState<IAddressCityData>(
    dataEkyc.residenceAddressProvince
  );
  const [selectedContractAddressDistrict, setSelectedContractAddressDistrict] = useState<IAddressDistrictData>(
    dataEkyc.residenceAddressDistrict
  );
  const [provinceSearchText, setProvinceSearchText] = useState<string>('');
  const [districtSearchText, setDistrictSearchText] = useState<string>('');
  const modalizeProvinceRef = useRef<Modalize>(null);
  const modalizeDistrictRef = useRef<Modalize>(null);
  const modalizeReferrerBranchRef = useRef<Modalize>(null);
  const selectedLanguage = useSelector((state: IState) => state.lang);
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const { styles } = useStyles();

  const goBack = () => {
    props.navigation.replace(ScreenNames.KisEkycStep3PersonalInformation);
  };

  const onPressFemale = () => {
    setGender(GENDER.FEMALE);
  };

  const onPressMale = () => {
    setGender(GENDER.MALE);
  };

  const onChangeYourOccupation = (value: string) => {
    setYourOccupation(value);
  };

  const onChangeProvince = (value: string) => {
    setProvince(value);
  };

  const onChangeAddress = (value: string) => {
    setAddress(value);
  };

  const onChangeDistrict = (value: string) => {
    setDistrict(value);
  };

  const onChangeContractAddress = (value: string) => {
    setContractAddress(value);
  };

  const onChangeEmail = (value: string) => {
    setEmail(value);
  };

  const onChangePhoneNumber = (value: string) => {
    setPhoneNumber(value);
  };

  const onChangeReferrerIDName = (value: string) => {
    setReferrerIdName(value);
  };

  const handleKeyBoard = () => {
    Keyboard.dismiss();
  };

  const validateContractAddress = () => {
    if (isBlank(contractAddress)) {
      setContractAddressError(true);
      setContractAddressErrorContent('Address cannot be blank');
      return false;
    } else if (config.regex.address.test(contractAddress) !== true) {
      setContractAddressError(true);
      setContractAddressErrorContent('ADDRESS_INVALID');
      return false;
    } else {
      setContractAddressError(false);
      setContractAddressErrorContent('');
    }
    return true;
  };

  const validatePhoneNumber = () => {
    if (isBlank(phoneNumber)) {
      setPhoneNumberError(true);
      setPhoneNumberErrorContent('Phone number cannot be blank');
      return false;
    } else if (config.regex.phoneNumber.test(phoneNumber) !== true) {
      setPhoneNumberError(true);
      setPhoneNumberErrorContent('PHONE_NUMBER_INVALID');
      return false;
    } else {
      setPhoneNumberError(false);
      setPhoneNumberErrorContent('');
    }
    return true;
  };

  const validateReferrerIdName = () => {
    if (isBlank(referrerIdName)) {
      setReferrerIdNameError(false);
      setReferrerIdNameErrorContent('');
    } else if (config.regex.referrerIdName.test(referrerIdName) !== true) {
      setReferrerIdNameError(true);
      setReferrerIdNameErrorContent('REFERRER_ID_NAME_INVALID');
      return false;
    } else {
      setReferrerIdNameError(false);
      setReferrerIdNameErrorContent('');
    }
    return true;
  };

  const validate = () => {
    if (validateContractAddress() === false) {
      return false;
    }
    if (validatePhoneNumber() === false) {
      return false;
    }
    if (validateReferrerIdName() === false) {
      return false;
    }
    return true;
  };

  const onSubmitForm = () => {
    if (validate() === true) {
      const params = {
        phoneNumber,
        gender,
        occupation: yourOccupation,
        permanentProvince: province,
        permanentDistrict: district,
        permanentAddress: address,
        contractProvince: selectedContractAddressProvince.cityLabel,
        contractDistrict: selectedContractAddressDistrict.districtLabel,
        contractAddress: contractAddress,
        email,
        referrerIdName,
        referrerBranch: selectedReferrerBranch.value,
      };
      dispatch(EkycActions.saveDataEkycStep({ data: params, step: ScreenNames.KisEkycStep4ServiceInformation }));
      props.navigation.navigate(ScreenNames.KisEkycStep4ServiceInformation);
    }
  };

  const onChangeProvinceSearchText = (value: string) => {
    setProvinceSearchText(value);
    if (value.trim() === '') {
      setContractAddressProvinceList(addressData);
    } else {
      setContractAddressProvinceList(
        addressData.filter(item => item.cityLabel.toUpperCase().includes(value.toUpperCase()))
      );
    }
  };

  const onChangeDistrictSearchText = (value: string) => {
    setDistrictSearchText(value);
    if (value.trim() === '') {
      setContractAddressDistrictList(selectedContractAddressProvince.districtList);
    } else {
      setContractAddressDistrictList(
        selectedContractAddressProvince.districtList.filter(item =>
          item.districtLabel.toUpperCase().includes(value.toUpperCase())
        )
      );
    }
  };

  const openProvincePicker = () => {
    Keyboard.dismiss();
    modalizeProvinceRef.current?.open();
  };

  const clearProvincePickerData = () => {
    setProvinceSearchText('');
    setContractAddressProvinceList(addressData);
  };

  const closeProvincePicker = () => {
    modalizeProvinceRef.current?.close();
    clearProvincePickerData();
  };

  const openDistrictPicker = () => {
    Keyboard.dismiss();
    modalizeDistrictRef.current?.open();
  };

  const openReferrerBranchPicker = () => {
    Keyboard.dismiss();
    modalizeReferrerBranchRef.current?.open();
  };

  const closeReferrerBranchPicker = () => {
    modalizeReferrerBranchRef.current?.close();
  };

  const clearDistrictPickerData = () => {
    setDistrictSearchText('');
    setContractAddressDistrictList(selectedContractAddressProvince.districtList);
  };

  const closeDistrictPicker = () => {
    modalizeDistrictRef.current?.close();
    clearDistrictPickerData();
  };

  const onChangeContractAddressProvince = (data: IAddressCityData) => {
    setSelectedContractAddressProvince(data);
    setSelectedContractAddressDistrict(data.districtList[0]);
    setContractAddressDistrictList(data.districtList);
    closeProvincePicker();
  };

  const onChangeReferrerBranch = (data: IReferrerBranchType) => {
    setSelectedReferrerBranch(data);
    closeReferrerBranchPicker();
  };

  const onChangeContractAddressDinstrict = (data: IAddressDistrictData) => {
    setSelectedContractAddressDistrict(data);
    closeDistrictPicker();
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
          <View style={[styles.marginBottom8, styles.marginHorizontal16]}>
            <Text style={[styles.fieldKeyText, styles.marginBottom12]} allowFontScaling={false}>
              {t('Gender')}
            </Text>
            <View style={[globalStyles.flexDirectionRow]}>
              <TouchableOpacity
                style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]}
                onPress={onPressFemale}
              >
                {gender === GENDER.FEMALE ? (
                  <SelectedIcon height={scaleSize(20)} width={scaleSize(20)} />
                ) : (
                  <UnselectedIcon height={scaleSize(20)} width={scaleSize(20)} />
                )}
                <Text style={styles.genderText} allowFontScaling={false}>
                  {t('Female')}
                </Text>
              </TouchableOpacity>
              <View style={globalStyles.container} />
              <TouchableOpacity style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]} onPress={onPressMale}>
                {gender === GENDER.MALE ? (
                  <SelectedIcon height={scaleSize(20)} width={scaleSize(20)} />
                ) : (
                  <UnselectedIcon height={scaleSize(20)} width={scaleSize(20)} />
                )}
                <Text style={styles.genderText} allowFontScaling={false}>
                  {t('Male')}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.fieldKeyText, styles.marginTop16, styles.marginBottom8]} allowFontScaling={false}>
              {t('Your occupation')}
            </Text>
            <TextInputComponent
              value={yourOccupation}
              onChangeText={onChangeYourOccupation}
              wholeContainerStyle={[styles.wholeContainerStyle]}
              textInputContainerStyle={[
                globalStyles.justifyCenter,
                {
                  ...(yourOccupationError === false
                    ? styles.textInputContainerStyle2
                    : styles.textInputContainerStyleError2),
                },
              ]}
              textInputStyle={[globalStyles.container, styles.textInputStyle]}
              autoCapitalize={'none'}
              error={yourOccupationError}
              errorContent={yourOccupationErrorContent}
            />
            <Text style={[styles.fieldKeyText, styles.marginTop28, styles.marginBottom8]} allowFontScaling={false}>
              {t('Permanent Address')}
            </Text>
            <View style={[globalStyles.flexDirectionRow, styles.marginBottom8]}>
              <TextInputComponent
                editable={false}
                value={province}
                onChangeText={onChangeProvince}
                wholeContainerStyle={[globalStyles.container]}
                labelText={'Province'}
                labelTextStyle={styles.labelTextStyle}
                textInputContainerStyle={[
                  globalStyles.justifyCenter,
                  globalStyles.disableBackground,
                  {
                    ...(provinceError === false
                      ? styles.textInputContainerStyle2
                      : styles.textInputContainerStyleError2),
                  },
                ]}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                autoCapitalize={'none'}
                error={provinceError}
                errorContent={provinceErrorContent}
              />
              <View style={styles.width13} />
              <TextInputComponent
                editable={false}
                value={district}
                onChangeText={onChangeDistrict}
                wholeContainerStyle={[globalStyles.container]}
                labelText={'District'}
                labelTextStyle={styles.labelTextStyle}
                textInputContainerStyle={[
                  globalStyles.justifyCenter,
                  globalStyles.disableBackground,
                  {
                    ...(districtError === false
                      ? styles.textInputContainerStyle2
                      : styles.textInputContainerStyleError2),
                  },
                ]}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                autoCapitalize={'none'}
                error={districtError}
                errorContent={districtErrorContent}
              />
            </View>
            <TextInputComponent
              editable={false}
              value={address}
              onChangeText={onChangeAddress}
              // wholeContainerStyle={[styles.wholeContainerStyle]}
              labelText={'Address'}
              labelTextStyle={styles.labelTextStyle}
              textInputContainerStyle={[
                globalStyles.justifyCenter,
                globalStyles.disableBackground,
                {
                  ...(addressError === false ? styles.textInputContainerStyle2 : styles.textInputContainerStyleError2),
                },
              ]}
              textInputStyle={[globalStyles.container, styles.textInputStyle]}
              autoCapitalize={'none'}
              error={addressError}
              errorContent={addressErrorContent}
            />
            <Text style={[styles.fieldKeyText, styles.marginTop16, styles.marginBottom8]} allowFontScaling={false}>
              {t('Contact Address')}
            </Text>
            <View style={[globalStyles.flexDirectionRow, styles.marginBottom8]}>
              <View style={[globalStyles.container]}>
                <Text>{t('Province')}</Text>
                <TouchableOpacity
                  style={[
                    globalStyles.container,
                    globalStyles.flexDirectionRow,
                    globalStyles.alignCenter,
                    styles.bankPickerContainer,
                  ]}
                  onPress={openProvincePicker}
                >
                  <Text style={styles.bankNameShortDisplay}>{selectedContractAddressProvince.cityLabel}</Text>
                  <Down2 height={scaleSize(24)} width={scaleSize(24)} />
                </TouchableOpacity>
              </View>
              <View style={styles.width13} />
              <View style={[globalStyles.container]}>
                <Text>{t('District')}</Text>
                <TouchableOpacity
                  style={[
                    globalStyles.container,
                    globalStyles.flexDirectionRow,
                    globalStyles.alignCenter,
                    styles.bankPickerContainer,
                  ]}
                  onPress={openDistrictPicker}
                >
                  <Text style={styles.bankNameShortDisplay}>{selectedContractAddressDistrict.districtLabel}</Text>
                  <Down2 height={scaleSize(24)} width={scaleSize(24)} />
                </TouchableOpacity>
              </View>
            </View>
            <TextInputComponent
              value={contractAddress}
              onChangeText={onChangeContractAddress}
              labelText={'Address'}
              labelTextStyle={styles.labelTextStyle}
              textInputContainerStyle={[
                globalStyles.justifyCenter,
                {
                  ...(contractAddressError === false
                    ? styles.textInputContainerStyle2
                    : styles.textInputContainerStyleError2),
                },
              ]}
              textInputStyle={[globalStyles.container, styles.textInputStyle]}
              autoCapitalize={'none'}
              error={contractAddressError}
              errorContent={contractAddressErrorContent}
            />
            <Text style={[styles.fieldKeyText, styles.marginTop16, styles.marginBottom3]} allowFontScaling={false}>
              {t('Email')}
            </Text>
            <TextInputComponent
              editable={false}
              value={email}
              onChangeText={onChangeEmail}
              wholeContainerStyle={[styles.wholeContainerStyle]}
              textInputContainerStyle={[
                globalStyles.justifyCenter,
                globalStyles.disableBackground,
                {
                  ...(emailError === false ? styles.textInputContainerStyle2 : styles.textInputContainerStyleError2),
                },
              ]}
              textInputStyle={[globalStyles.container, styles.textInputStyle]}
              autoCapitalize={'none'}
              error={emailError}
              errorContent={emailErrorContent}
              keyboardType={'email-address'}
            />
            <Text style={[styles.fieldKeyText, styles.marginTop28, styles.marginBottom8]} allowFontScaling={false}>
              {t('Phone Number')}
            </Text>
            <TextInputComponent
              value={phoneNumber}
              onBlur={handleKeyBoard}
              onChangeText={onChangePhoneNumber}
              wholeContainerStyle={[styles.wholeContainerStyle]}
              textInputContainerStyle={[
                globalStyles.justifyCenter,
                {
                  ...(phoneNumberError === false
                    ? styles.textInputContainerStyle2
                    : styles.textInputContainerStyleError2),
                },
              ]}
              textInputStyle={[globalStyles.container, styles.textInputStyle]}
              autoCapitalize={'none'}
              error={phoneNumberError}
              errorContent={phoneNumberErrorContent}
              keyboardType={'phone-pad'}
            />
            <Text style={[styles.fieldKeyText, styles.marginTop28, styles.marginBottom8]} allowFontScaling={false}>
              {t('Referrer Information')}
            </Text>
            <View style={[globalStyles.flexDirectionRow]}>
              <TextInputComponent
                value={referrerIdName}
                onChangeText={onChangeReferrerIDName}
                wholeContainerStyle={globalStyles.container}
                labelText={'ID Name'}
                labelTextStyle={styles.labelTextStyle}
                textInputContainerStyle={[
                  globalStyles.justifyCenter,
                  {
                    ...(referrerIdNameError === false
                      ? styles.textInputContainerStyle2
                      : styles.textInputContainerStyleError2),
                  },
                ]}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                autoCapitalize={'none'}
                error={referrerIdNameError}
                errorContent={referrerIdNameErrorContent}
              />
              <View style={styles.width13} />
              {/* <TextInputComponent
                value={referrerBranch}
                onChangeText={onChangeReferrerBranch}
                wholeContainerStyle={globalStyles.container}
                labelText={'Branch'}
                labelTextStyle={styles.labelTextStyle}
                textInputContainerStyle={[
                  globalStyles.justifyCenter,
                  // {
                  //   ...(referrerBranchError === false
                  //     ? 
                      styles.textInputContainerStyle2
                  //     : styles.textInputContainerStyleError2),
                  // },
                ]}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                autoCapitalize={'none'}
                // error={referrerBranchError}
                // errorContent={referrerBranchErrorContent}
              /> */}
              <View style={globalStyles.container}>
                <Text style={styles.labelTextStyle2}>{t('Branch')}</Text>
                <TouchableOpacity
                  style={[
                    globalStyles.container,
                    globalStyles.flexDirectionRow,
                    globalStyles.alignCenter,
                    styles.bankPickerContainer,
                  ]}
                  onPress={openReferrerBranchPicker}
                >
                  <Text style={styles.bankNameShortDisplay} numberOfLines={1}>
                    {selectedLanguage === LANG.VI ? selectedReferrerBranch.labelVI : selectedReferrerBranch.labelEN}
                  </Text>
                  <Down2 height={scaleSize(24)} width={scaleSize(24)} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[globalStyles.centered, styles.executeButtonContainer]}>
              <TouchableOpacity
                style={[globalStyles.container, globalStyles.fillWidth, globalStyles.centered, styles.executeButton]}
                onPress={onSubmitForm}
              >
                <Text style={styles.executeButtonText} allowFontScaling={false}>
                  {t('Continue')}
                </Text>
              </TouchableOpacity>
            </View>
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
          <View style={styles.marginHorizontal16}>
            <Text style={[styles.fieldKeyText, styles.marginBottom12]} allowFontScaling={false}>
              {t('Gender')}
            </Text>
            <View style={[globalStyles.flexDirectionRow]}>
              <TouchableOpacity
                style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]}
                onPress={onPressFemale}
              >
                {gender === GENDER.FEMALE ? (
                  <SelectedIcon height={scaleSize(20)} width={scaleSize(20)} />
                ) : (
                  <UnselectedIcon height={scaleSize(20)} width={scaleSize(20)} />
                )}
                <Text style={styles.genderText} allowFontScaling={false}>
                  {t('Female')}
                </Text>
              </TouchableOpacity>
              <View style={globalStyles.container} />
              <TouchableOpacity style={[globalStyles.flexDirectionRow, globalStyles.alignCenter]} onPress={onPressMale}>
                {gender === GENDER.MALE ? (
                  <SelectedIcon height={scaleSize(20)} width={scaleSize(20)} />
                ) : (
                  <UnselectedIcon height={scaleSize(20)} width={scaleSize(20)} />
                )}
                <Text style={styles.genderText} allowFontScaling={false}>
                  {t('Male')}
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.fieldKeyText, styles.marginTop16, styles.marginBottom8]} allowFontScaling={false}>
              {t('Your occupation')}
            </Text>
            <TextInputComponent
              value={yourOccupation}
              onChangeText={onChangeYourOccupation}
              wholeContainerStyle={[styles.wholeContainerStyle]}
              textInputContainerStyle={[
                globalStyles.justifyCenter,
                {
                  ...(yourOccupationError === false
                    ? styles.textInputContainerStyle2
                    : styles.textInputContainerStyleError2),
                },
              ]}
              textInputStyle={[globalStyles.container, styles.textInputStyle]}
              autoCapitalize={'none'}
              error={yourOccupationError}
              errorContent={yourOccupationErrorContent}
            />
            <Text style={[styles.fieldKeyText, styles.marginTop28, styles.marginBottom8]} allowFontScaling={false}>
              {t('Permanent Address')}
            </Text>
            <View style={[globalStyles.flexDirectionRow, styles.marginBottom8]}>
              <TextInputComponent
                editable={false}
                value={province}
                onChangeText={onChangeProvince}
                wholeContainerStyle={[globalStyles.container]}
                labelText={'Province'}
                labelTextStyle={styles.labelTextStyle}
                textInputContainerStyle={[
                  globalStyles.justifyCenter,
                  globalStyles.disableBackground,
                  {
                    ...(provinceError === false
                      ? styles.textInputContainerStyle2
                      : styles.textInputContainerStyleError2),
                  },
                ]}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                autoCapitalize={'none'}
                error={provinceError}
                errorContent={provinceErrorContent}
              />
              <View style={styles.width13} />
              <TextInputComponent
                editable={false}
                value={district}
                onChangeText={onChangeDistrict}
                wholeContainerStyle={[globalStyles.container]}
                labelText={'District'}
                labelTextStyle={styles.labelTextStyle}
                textInputContainerStyle={[
                  globalStyles.justifyCenter,
                  globalStyles.disableBackground,
                  {
                    ...(districtError === false
                      ? styles.textInputContainerStyle2
                      : styles.textInputContainerStyleError2),
                  },
                ]}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                autoCapitalize={'none'}
                error={districtError}
                errorContent={districtErrorContent}
              />
            </View>
            <TextInputComponent
              editable={false}
              value={address}
              onChangeText={onChangeAddress}
              // wholeContainerStyle={[styles.wholeContainerStyle]}
              labelText={'Address'}
              labelTextStyle={styles.labelTextStyle}
              textInputContainerStyle={[
                globalStyles.justifyCenter,
                globalStyles.disableBackground,
                {
                  ...(addressError === false ? styles.textInputContainerStyle2 : styles.textInputContainerStyleError2),
                },
              ]}
              textInputStyle={[globalStyles.container, styles.textInputStyle]}
              autoCapitalize={'none'}
              error={addressError}
              errorContent={addressErrorContent}
            />
            <Text style={[styles.fieldKeyText, styles.marginTop16, styles.marginBottom8]} allowFontScaling={false}>
              {t('Contact Address')}
            </Text>
            <View style={[globalStyles.flexDirectionRow, styles.marginBottom8]}>
              <View style={[globalStyles.container]}>
                <Text>{t('Province')}</Text>
                <TouchableOpacity
                  style={[
                    globalStyles.container,
                    globalStyles.flexDirectionRow,
                    globalStyles.alignCenter,
                    styles.bankPickerContainer,
                  ]}
                  onPress={openProvincePicker}
                >
                  <Text style={styles.bankNameShortDisplay}>{selectedContractAddressProvince.cityLabel}</Text>
                  <Down2 height={scaleSize(24)} width={scaleSize(24)} />
                </TouchableOpacity>
              </View>
              <View style={styles.width13} />
              <View style={[globalStyles.container]}>
                <Text>{t('District')}</Text>
                <TouchableOpacity
                  style={[
                    globalStyles.container,
                    globalStyles.flexDirectionRow,
                    globalStyles.alignCenter,
                    styles.bankPickerContainer,
                  ]}
                  onPress={openDistrictPicker}
                >
                  <Text style={styles.bankNameShortDisplay}>{selectedContractAddressDistrict.districtLabel}</Text>
                  <Down2 height={scaleSize(24)} width={scaleSize(24)} />
                </TouchableOpacity>
              </View>
            </View>
            <TextInputComponent
              value={contractAddress}
              onChangeText={onChangeContractAddress}
              labelText={'Address'}
              labelTextStyle={styles.labelTextStyle}
              textInputContainerStyle={[
                globalStyles.justifyCenter,
                {
                  ...(contractAddressError === false
                    ? styles.textInputContainerStyle2
                    : styles.textInputContainerStyleError2),
                },
              ]}
              textInputStyle={[globalStyles.container, styles.textInputStyle]}
              autoCapitalize={'none'}
              error={contractAddressError}
              errorContent={contractAddressErrorContent}
            />
            <Text style={[styles.fieldKeyText, styles.marginTop16, styles.marginBottom3]} allowFontScaling={false}>
              {t('Email')}
            </Text>
            <TextInputComponent
              editable={false}
              value={email}
              onChangeText={onChangeEmail}
              wholeContainerStyle={[styles.wholeContainerStyle]}
              textInputContainerStyle={[
                globalStyles.justifyCenter,
                globalStyles.disableBackground,
                {
                  ...(emailError === false ? styles.textInputContainerStyle2 : styles.textInputContainerStyleError2),
                },
              ]}
              textInputStyle={[globalStyles.container, styles.textInputStyle]}
              autoCapitalize={'none'}
              error={emailError}
              errorContent={emailErrorContent}
              keyboardType={'email-address'}
            />
            <Text style={[styles.fieldKeyText, styles.marginTop28, styles.marginBottom8]} allowFontScaling={false}>
              {t('Phone Number')}
            </Text>
            <TextInputComponent
              value={phoneNumber}
              onChangeText={onChangePhoneNumber}
              wholeContainerStyle={[styles.wholeContainerStyle]}
              textInputContainerStyle={[
                globalStyles.justifyCenter,
                {
                  ...(phoneNumberError === false
                    ? styles.textInputContainerStyle2
                    : styles.textInputContainerStyleError2),
                },
              ]}
              textInputStyle={[globalStyles.container, styles.textInputStyle]}
              autoCapitalize={'none'}
              error={phoneNumberError}
              errorContent={phoneNumberErrorContent}
              keyboardType={'phone-pad'}
            />
            <Text style={[styles.fieldKeyText, styles.marginTop28, styles.marginBottom8]} allowFontScaling={false}>
              {t('Referrer Information')}
            </Text>
            <View style={[globalStyles.flexDirectionRow]}>
              <TextInputComponent
                value={referrerIdName}
                onChangeText={onChangeReferrerIDName}
                wholeContainerStyle={globalStyles.container}
                labelText={'ID Name'}
                labelTextStyle={styles.labelTextStyle}
                textInputContainerStyle={[
                  globalStyles.justifyCenter,
                  {
                    ...(referrerIdNameError === false
                      ? styles.textInputContainerStyle2
                      : styles.textInputContainerStyleError2),
                  },
                ]}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                autoCapitalize={'none'}
                error={referrerIdNameError}
                errorContent={referrerIdNameErrorContent}
              />
              <View style={styles.width13} />
              {/* <TextInputComponent
                value={selectedReferrerBranch}
                onChangeText={onChangeReferrerBranch}
                wholeContainerStyle={globalStyles.container}
                labelText={'Branch'}
                labelTextStyle={styles.labelTextStyle}
                textInputContainerStyle={[
                  globalStyles.justifyCenter,
                  // {
                  // ...(referrerBranchError === false
                  //   ?
                  styles.textInputContainerStyle2,
                  // : styles.textInputContainerStyleError2),
                  // },
                ]}
                textInputStyle={[globalStyles.container, styles.textInputStyle]}
                autoCapitalize={'none'}
                // error={referrerBranchError}
                // errorContent={referrerBranchErrorContent}
              /> */}
              <View style={globalStyles.container}>
                <Text style={styles.labelTextStyle2}>{t('Branch')}</Text>
                <TouchableOpacity
                  style={[
                    globalStyles.container,
                    globalStyles.flexDirectionRow,
                    globalStyles.alignCenter,
                    styles.bankPickerContainer,
                  ]}
                  onPress={openReferrerBranchPicker}
                >
                  <Text style={styles.bankNameShortDisplay} numberOfLines={1}>
                    {selectedLanguage === LANG.VI ? selectedReferrerBranch.labelVI : selectedReferrerBranch.labelEN}
                  </Text>
                  <Down2 height={scaleSize(24)} width={scaleSize(24)} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[globalStyles.centered, styles.executeButtonContainer]}>
              <TouchableOpacity
                style={[globalStyles.container, globalStyles.fillWidth, globalStyles.centered, styles.executeButton]}
                onPress={onSubmitForm}
              >
                <Text style={styles.executeButtonText} allowFontScaling={false}>
                  {t('Continue')}
                </Text>
              </TouchableOpacity>
            </View>
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
        {contractAddressProvinceList.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => onChangeContractAddressProvince(item)}
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
        {contractAddressDistrictList.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => onChangeContractAddressDinstrict(item)}
              key={`district+key+${index}`}
              style={[globalStyles.justifyCenter, globalStyles.fillWidth, styles.kisBankBranchItemContainer]}
            >
              <Text style={styles.kisBankBranchItemText}>{item.districtLabel}</Text>
            </TouchableOpacity>
          );
        })}
      </Modalize>
      <Modalize
        ref={modalizeReferrerBranchRef}
        modalHeight={scaleSize(622)}
        HeaderComponent={
          <View style={styles.headerModalize5}>
            <View
              style={[
                globalStyles.container,
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                styles.headerModalize4,
              ]}
            >
              <Text style={styles.headerModalize1Text}>{t('Bank Branch')}</Text>
              <View style={globalStyles.container} />
              <TouchableOpacity onPress={closeReferrerBranchPicker}>
                <CloseIcon height={scaleSize(24)} width={scaleSize(24)} style={styles.marginRight16} />
              </TouchableOpacity>
            </View>
          </View>
        }
      >
        {referrerBranchList.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => onChangeReferrerBranch(item)}
              key={`referrer+branch+key+${index}`}
              style={[globalStyles.justifyCenter, globalStyles.fillWidth, styles.kisBankBranchItemContainer]}
            >
              <Text style={styles.kisBankBranchItemText}>
                {selectedLanguage === LANG.VI ? item.labelVI : item.labelEN}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Modalize>
    </View>
  );
};

export default KisEkycStep3PersonalInformation;
