import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Linking, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Modalize } from 'react-native-modalize';
import { StackScreenProps } from 'screens/RootNavigation';
import KisEKYCStep4 from 'assets/icon/KisEKYCStep4.svg';
import Tick2 from 'assets/icon/Tick2.svg';
import Down2 from 'assets/icon/Down2.svg';
import CloseIcon from 'assets/icon/btn_close.svg';
import ErrorAlertIcon from 'assets/icon/ErrorAlertIcon.svg';
import SearchIcon2 from 'assets/icon/SearchIcon2.svg';
import SelectedIcon from 'assets/icon/OK-Check.svg';
import UnselectedIcon from 'assets/icon/UnCheck.svg';
import HeaderScreen from 'components/HeaderScreen';
import TextInputComponent from 'components/TextInput';
import { IState } from 'reduxs/global-reducers';
import globalStyles, { Colors, scaleSize } from 'styles';
import useStyles from './styles';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { readJson, isBlank, filterV2 } from 'utils';
import Modal from 'components/Modal';
import config from 'config';
import { LANG } from 'global';
import { EkycActions } from 'reduxs/Ekyc';

export interface KISBankType {
  _id: string;
  name: string;
  longName: string;
  shortName: string;
  branch: KISBankBranch[];
}

export interface KISBankPickerType {
  label: string;
  labelShort: string;
  value: string;
  branchList: KISBankBranch[];
  searchKey: string;
}

export interface KISBankBranch {
  branchCode: string;
  branchName: string;
}

const KIS_BANK_LIST_URL = 'https://trading.kisvn.vn/files/resources/bank_info_data.json';

export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHERS = 'OTHERS',
}

const KisEkycStep4ServiceInformation = (props: StackScreenProps<'KisEkycStep4ServiceInformation'>) => {
  const selectedLanguage = useSelector((state: IState) => state.lang);
  const [bankAccount, setBankAccount] = useState<string>('');
  const [bankAccountError, setBankAccountError] = useState<boolean>(false);
  const [bankAccountErrorContent, setBankAccountErrorContent] = useState<string>('');
  const [accountName, setAccountName] = useState<string>('');
  const [accountNameError, setAccountNameError] = useState<boolean>(false);
  const [accountNameErrorContent, setAccountNameErrorContent] = useState<string>('');
  const [agree, setAgree] = useState<boolean>(false);
  const originalBankList = useRef<KISBankPickerType[]>([]);
  const [kisBankList, setKisBankList] = useState<KISBankPickerType[]>([]);
  const [selectedKisBank, setSelectedKisBank] = useState<KISBankPickerType | null>(null);
  const [kisBankBranchList, setKisBankBranchList] = useState<KISBankBranch[]>([]);
  const [selectedKisBankBranch, setSelectedKisBankBranch] = useState<KISBankBranch | null>(null);
  const [errorModalVisible, setErrorModalVisible] = useState<boolean>(false);
  const [errorModalContent, setErrorModalContent] = useState<string>('');
  const [loadingBank, setLoadingBank] = useState<boolean>(true);
  const [kisBankSearchText, setKisBankSearchText] = useState<string>('');
  const [kisBankBranchSearchText, setKisBankBranchSearchText] = useState<string>('');
  const modalizeBankRef = useRef<Modalize>(null);
  const modalizeBankBranchRef = useRef<Modalize>(null);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const goBack = () => {
    props.navigation.replace(ScreenNames.KisEkycStep3EditPersonalInformation);
  };

  useEffect(() => {
    readBankAccount();
  }, []);

  const readBankAccount = () => {
    setLoadingBank(true);
    readJson<KISBankType[]>(KIS_BANK_LIST_URL)
      .then((bankData: KISBankType[]) => {
        if (bankData != null) {
          const data = bankData.map((item: KISBankType) => ({
            label: item.longName,
            labelShort: item.shortName,
            value: item._id,
            branchList: item.branch,
            searchKey: (item.longName || '') + '_' + (item?.shortName || '') + '_' + (item.name || ''),
          }));

          setKisBankList(data);
          originalBankList.current = data;
          if (data.length > 0) {
            setSelectedKisBank(data[0]);
            setKisBankBranchList(data[0].branchList);
            if (data[0].branchList.length > 0) {
              setSelectedKisBankBranch(data[0].branchList[0]);
            }
          }
        }
      })
      .catch((error: any) => {
        setErrorModalVisible(true);
        setErrorModalContent(`Cannot get the bank list: ${error.code ?? error.message}. press "Accept" to try again`);
        setKisBankList([]);
        originalBankList.current = [];
        setSelectedKisBank(null);
        setKisBankBranchList([]);
        setSelectedKisBankBranch(null);
      })
      .finally(() => {
        setLoadingBank(false);
      });
  };

  const onChangeBankAccount = (value: string) => {
    setBankAccount(value);
  };

  const onChangeAccountName = (value: string) => {
    setAccountName(value);
  };

  const validateBankAccount = () => {
    if (isBlank(bankAccount)) {
      setBankAccountError(true);
      setBankAccountErrorContent('Bank account cannot be blank');
      return false;
    } else if (config.regex.bankAccount.test(bankAccount) !== true) {
      setBankAccountError(true);
      setBankAccountErrorContent('BANK_ACCOUNT_INVALID');
      return false;
    } else {
      setBankAccountError(false);
      setBankAccountErrorContent('');
    }
    return true;
  };

  const validateAccountName = () => {
    if (isBlank(accountName)) {
      setAccountNameError(true);
      setAccountNameErrorContent('Account name cannot be blank');
      return false;
    } else if (config.regex.fullname.test(accountName) !== true) {
      setAccountNameError(true);
      setAccountNameErrorContent('ACCOUNT_NAME_INVALID');
      return false;
    } else {
      setAccountNameError(false);
      setAccountNameErrorContent('');
    }
    return true;
  };

  const validate = () => {
    if (validateBankAccount() === false) {
      return false;
    }
    if (validateAccountName() === false) {
      return false;
    }
    if (selectedKisBank == null) {
      return false;
    }
    if (selectedKisBankBranch == null) {
      return false;
    }
    return true;
  };

  const onSubmitForm = () => {
    if (validate() === true) {
      const params = {
        bankAccount,
        accountName,
        bankName: selectedKisBank?.labelShort!,
        branch: selectedKisBankBranch?.branchName!,
        branchId: selectedKisBankBranch?.branchCode!,
        bankId: selectedKisBank?.value!,
      };
      dispatch(EkycActions.saveDataEkycStep({ data: params, step: ScreenNames.KisEkycStep4UploadSignature }));
      props.navigation.navigate(ScreenNames.KisEkycStep4UploadSignature);
    }
  };

  const onSubmitForm2 = () => {
    setErrorModalVisible(false);
    readBankAccount();
  };

  const onChangeKisBankSearchText = (value: string) => {
    setKisBankSearchText(value);
    if (value.trim() === '') {
      setKisBankList(originalBankList.current);
    } else {
      setKisBankList(
        originalBankList.current.filter(item => item.searchKey.toUpperCase().includes(value.toUpperCase()))
      );
    }
  };

  const onChangeKisBankBranchSearchText = (value: string) => {
    setKisBankBranchSearchText(value);
    if (value.trim() === '') {
      setKisBankBranchList(selectedKisBank?.branchList!);
    } else {
      setKisBankBranchList(
        filterV2(selectedKisBank?.branchList!, item => item.branchName.toUpperCase().includes(value.toUpperCase()))
      );
    }
  };

  const clearKisBankPickerData = () => {
    setKisBankSearchText('');
    setKisBankList(originalBankList.current);
  };

  const closeBankPicker = () => {
    modalizeBankRef.current?.close();
    clearKisBankPickerData();
  };

  const clearKisBankBranchPickerData = () => {
    setKisBankBranchSearchText('');
    setKisBankBranchList(selectedKisBank!.branchList);
  };

  const closeBankBranchPicker = () => {
    modalizeBankBranchRef.current?.close();
    clearKisBankBranchPickerData();
  };

  const onChangeKisBank = (data: KISBankPickerType) => {
    setSelectedKisBank(data);
    setSelectedKisBankBranch(data.branchList[0]);
    setKisBankBranchList(data.branchList);
    closeBankPicker();
  };

  const onChangeKisBankBranch = (data: KISBankBranch) => {
    setSelectedKisBankBranch(data);
    closeBankBranchPicker();
  };

  const openKisBankPicker = () => {
    modalizeBankRef.current?.open();
  };

  const openKisBankBranchPicker = () => {
    modalizeBankBranchRef.current?.open();
  };

  const setAgreed = () => {
    setAgree(prevState => !prevState);
  };

  const goToTermAndCondition = () => {
    if (selectedLanguage === LANG.VI) {
      // eslint-disable-next-line no-console
      Linking.openURL('https://kisvn.vn/chinh-sach-bao-mat/').catch(err => console.error('Open URL failed', err));
    } else {
      // eslint-disable-next-line no-console
      Linking.openURL('https://kisvn.vn/en/chinh-sach-bao-mat/').catch(err => console.error('Open URL failed', err));
    }
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
      {Platform.OS === 'android' ? (
        <ScrollView keyboardDismissMode={'interactive'} keyboardShouldPersistTaps={'always'}>
          <View style={[globalStyles.container, styles.marginHorizontal16]}>
            <Text style={styles.titleText} allowFontScaling={false}>
              {t('Service Information')}
            </Text>
            <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.checkBoxContainer]}>
              <Text style={styles.checkBoxText}>{t('Opening Equity Account')}</Text>
              <View style={globalStyles.container} />
              <Tick2 height={scaleSize(20)} width={scaleSize(20)} />
            </View>
            <Text style={styles.fieldKeyText} allowFontScaling={false}>
              {t('Transfer Online')}
            </Text>
            <TextInputComponent
              value={bankAccount}
              onChangeText={onChangeBankAccount}
              wholeContainerStyle={[styles.wholeContainerStyle]}
              labelText={'Bank Account'}
              labelTextStyle={styles.labelTextStyle}
              textInputContainerStyle={[
                globalStyles.justifyCenter,
                {
                  ...(bankAccountError === false
                    ? styles.textInputContainerStyle2
                    : styles.textInputContainerStyleError2),
                },
              ]}
              textInputStyle={[globalStyles.container, styles.textInputStyle2]}
              autoCapitalize={'none'}
              error={bankAccountError}
              errorContent={bankAccountErrorContent}
            />
            <TextInputComponent
              value={accountName}
              onChangeText={onChangeAccountName}
              wholeContainerStyle={[styles.wholeContainerStyle]}
              labelText={'Account Name'}
              labelTextStyle={styles.labelTextStyle}
              textInputContainerStyle={[
                globalStyles.justifyCenter,
                {
                  ...(accountNameError === false
                    ? styles.textInputContainerStyle2
                    : styles.textInputContainerStyleError2),
                },
              ]}
              textInputStyle={[globalStyles.container, styles.textInputStyle2]}
              autoCapitalize={'none'}
              error={accountNameError}
              errorContent={accountNameErrorContent}
            />
            <View style={styles.marginTop10}>
              <Text style={styles.paddingBottom8}>{t('Bank Name')}</Text>
              <TouchableOpacity
                style={[
                  // globalStyles.container,
                  globalStyles.flexDirectionRow,
                  globalStyles.alignCenter,
                  styles.bankPickerContainer,
                ]}
                disabled={loadingBank === true}
                onPress={openKisBankPicker}
              >
                <Text style={styles.bankNameShortDisplay}>
                  {selectedKisBank != null ? selectedKisBank.labelShort : ''}
                </Text>
                <Down2 height={scaleSize(24)} width={scaleSize(24)} />
              </TouchableOpacity>
            </View>
            <View style={styles.marginTop10}>
              <Text style={styles.paddingBottom8}>{t('Branch')}</Text>
              <TouchableOpacity
                style={[
                  // globalStyles.container,
                  globalStyles.flexDirectionRow,
                  globalStyles.alignCenter,
                  styles.bankPickerContainer,
                ]}
                disabled={loadingBank === true || selectedKisBank == null}
                onPress={openKisBankBranchPicker}
              >
                <Text style={styles.bankNameShortDisplay}>
                  {selectedKisBankBranch != null ? selectedKisBankBranch.branchName : ''}
                </Text>
                <Down2 height={scaleSize(24)} width={scaleSize(24)} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={setAgreed} style={[globalStyles.flexDirectionRow, styles.checkBoxContainer2]}>
              {agree === true ? (
                <SelectedIcon height={scaleSize(20)} width={scaleSize(20)} />
              ) : (
                <UnselectedIcon height={scaleSize(20)} width={scaleSize(20)} />
              )}
              <Text allowFontScaling={false} style={[styles.termAndConditionText]}>
                {`${t("I agree with KIS's")}`}
                <Text
                  onPress={goToTermAndCondition}
                  allowFontScaling={false}
                  style={[styles.termAndConditionText2]}
                >{`${t('terms and conditions')}`}</Text>
                {`${t('of opening account and service registration')}`}
              </Text>
            </TouchableOpacity>
            <View style={[globalStyles.centered, styles.executeButtonContainer]}>
              <TouchableOpacity
                style={[
                  globalStyles.container,
                  globalStyles.fillWidth,
                  globalStyles.centered,
                  styles.executeButton,
                  (isBlank(bankAccount) ||
                    isBlank(accountName) ||
                    selectedKisBank == null ||
                    selectedKisBankBranch == null ||
                    agree === false) &&
                    globalStyles.disableBackground,
                ]}
                onPress={onSubmitForm}
                disabled={
                  isBlank(bankAccount) ||
                  isBlank(accountName) ||
                  selectedKisBank == null ||
                  selectedKisBankBranch == null ||
                  agree === false
                }
              >
                <Text style={styles.executeButtonText} allowFontScaling={false}>
                  {t('Accept')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <KeyboardAwareScrollView
          keyboardDismissMode={'interactive'}
          keyboardShouldPersistTaps={'always'}
          automaticallyAdjustContentInsets={false}
        >
          <View style={[globalStyles.container, styles.marginHorizontal16]}>
            <Text style={styles.titleText} allowFontScaling={false}>
              {t('Service Information')}
            </Text>
            <View style={[globalStyles.flexDirectionRow, globalStyles.alignCenter, styles.checkBoxContainer]}>
              <Text style={styles.checkBoxText}>{t('Opening Equity Account')}</Text>
              <View style={globalStyles.container} />
              <Tick2 height={scaleSize(20)} width={scaleSize(20)} />
            </View>
            <Text style={styles.fieldKeyText} allowFontScaling={false}>
              {t('Transfer Online')}
            </Text>
            <TextInputComponent
              value={bankAccount}
              onChangeText={onChangeBankAccount}
              wholeContainerStyle={[styles.wholeContainerStyle]}
              labelText={'Bank Account'}
              labelTextStyle={styles.labelTextStyle}
              textInputContainerStyle={[
                globalStyles.justifyCenter,
                {
                  ...(bankAccountError === false
                    ? styles.textInputContainerStyle2
                    : styles.textInputContainerStyleError2),
                },
              ]}
              textInputStyle={[globalStyles.container, styles.textInputStyle2]}
              autoCapitalize={'none'}
              error={bankAccountError}
              errorContent={bankAccountErrorContent}
            />
            <TextInputComponent
              value={accountName}
              onChangeText={onChangeAccountName}
              wholeContainerStyle={[styles.wholeContainerStyle]}
              labelText={'Account Name'}
              labelTextStyle={styles.labelTextStyle}
              textInputContainerStyle={[
                globalStyles.justifyCenter,
                {
                  ...(accountNameError === false
                    ? styles.textInputContainerStyle2
                    : styles.textInputContainerStyleError2),
                },
              ]}
              textInputStyle={[globalStyles.container, styles.textInputStyle2]}
              autoCapitalize={'none'}
              error={accountNameError}
              errorContent={accountNameErrorContent}
            />
            <Text>{t('Bank Name')}</Text>
            <TouchableOpacity
              style={[
                // globalStyles.container,
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                styles.bankPickerContainer,
              ]}
              disabled={loadingBank === true}
              onPress={openKisBankPicker}
            >
              <Text style={styles.bankNameShortDisplay}>
                {selectedKisBank != null ? selectedKisBank.labelShort : ''}
              </Text>
              <Down2 height={scaleSize(24)} width={scaleSize(24)} />
            </TouchableOpacity>
            <Text>{t('Branch')}</Text>
            <TouchableOpacity
              style={[
                // globalStyles.container,
                globalStyles.flexDirectionRow,
                globalStyles.alignCenter,
                styles.bankPickerContainer,
              ]}
              disabled={loadingBank === true || selectedKisBank == null}
              onPress={openKisBankBranchPicker}
            >
              <Text style={styles.bankNameShortDisplay}>
                {selectedKisBankBranch != null ? selectedKisBankBranch.branchName : ''}
              </Text>
              <Down2 height={scaleSize(24)} width={scaleSize(24)} />
            </TouchableOpacity>
            <TouchableOpacity onPress={setAgreed} style={[globalStyles.flexDirectionRow, styles.checkBoxContainer2]}>
              {agree === true ? (
                <SelectedIcon height={scaleSize(20)} width={scaleSize(20)} />
              ) : (
                <UnselectedIcon height={scaleSize(20)} width={scaleSize(20)} />
              )}
              <Text allowFontScaling={false} style={[styles.termAndConditionText]}>
                {`${t("I agree with KIS's")}`}
                <Text
                  onPress={goToTermAndCondition}
                  allowFontScaling={false}
                  style={[styles.termAndConditionText2]}
                >{`${t('terms and conditions')}`}</Text>
                {`${t('of opening account and service registration')}`}
              </Text>
            </TouchableOpacity>
            <View style={[globalStyles.centered, styles.executeButtonContainer]}>
              <TouchableOpacity
                style={[
                  globalStyles.container,
                  globalStyles.fillWidth,
                  globalStyles.centered,
                  styles.executeButton,
                  (isBlank(bankAccount) ||
                    isBlank(accountName) ||
                    selectedKisBank == null ||
                    selectedKisBankBranch == null ||
                    agree === false) &&
                    globalStyles.disableBackground,
                ]}
                onPress={onSubmitForm}
                disabled={
                  isBlank(bankAccount) ||
                  isBlank(accountName) ||
                  selectedKisBank == null ||
                  selectedKisBankBranch == null ||
                  agree === false
                }
              >
                <Text style={styles.executeButtonText} allowFontScaling={false}>
                  {t('Accept')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      )}
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
            <View style={[globalStyles.justifyCenter, styles.modalContentContainer]}>
              <ErrorAlertIcon height={scaleSize(72)} width={scaleSize(72)} />
              <Text style={styles.errorTextModal}>{t(errorModalContent)}</Text>
              <View style={[globalStyles.centered, styles.executeButtonContainer2, globalStyles.fillWidth]}>
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

      <Modalize
        ref={modalizeBankRef}
        modalHeight={scaleSize(622)}
        onClosed={clearKisBankPickerData}
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
              <Text style={styles.headerModalize1Text}>{t('Select bank')}</Text>
              <View style={globalStyles.container} />
              <TouchableOpacity onPress={closeBankPicker}>
                <CloseIcon height={scaleSize(24)} width={scaleSize(24)} style={styles.marginRight16} />
              </TouchableOpacity>
            </View>
            <View style={[globalStyles.container, globalStyles.centered, styles.headerModalize2]}>
              <TextInputComponent
                wholeContainerStyle={[globalStyles.fillWidth, styles.wholeContainerStyle2]}
                value={kisBankSearchText}
                onChangeText={onChangeKisBankSearchText}
                placeholder={'Search'}
                placeholderTextColor={Colors.DARKTextDisable}
                textInputContainerStyle={[
                  globalStyles.container,
                  globalStyles.flexDirectionRow,
                  globalStyles.alignCenter,
                  styles.marginHorizontal16,
                  styles.textInputContainerStyle,
                ]}
                textInputStyle={[globalStyles.container, styles.textInputStyle, styles.paddingLeft10]}
                iconRight={
                  <SearchIcon2 height={scaleSize(24)} width={scaleSize(24)} style={styles.marginHorizontal10} />
                }
              />
            </View>
          </View>
        }
      >
        {/* <FlatList
          data={kisBankList}
          renderItem={(item: ListRenderItemInfo<KISBankPickerType>) => {
            return (
              <TouchableOpacity onPress={() => onChangeKisBank(item.item)}>{item.item.labelShort}</TouchableOpacity>
            );
          }}
          keyExtractor={(_item, index) => `bank+key+${index}`}
        /> */}
        {kisBankList.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => onChangeKisBank(item)}
              key={`bank+key+${index}`}
              style={[globalStyles.justifyCenter, globalStyles.fillWidth, styles.kisBankItemContainer]}
            >
              <Text style={styles.kisBankItemText1}>{item.labelShort}</Text>
              <Text style={styles.kisBankItemText2} numberOfLines={1}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </Modalize>
      <Modalize
        ref={modalizeBankBranchRef}
        modalHeight={scaleSize(622)}
        onClosed={clearKisBankBranchPickerData}
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
              <Text style={styles.headerModalize1Text}>{t('Select branch')}</Text>
              <View style={globalStyles.container} />
              <TouchableOpacity onPress={closeBankBranchPicker}>
                <CloseIcon height={scaleSize(24)} width={scaleSize(24)} style={styles.marginRight16} />
              </TouchableOpacity>
            </View>
            <View style={[globalStyles.container, globalStyles.centered, styles.headerModalize2]}>
              <TextInputComponent
                wholeContainerStyle={[globalStyles.fillWidth, styles.wholeContainerStyle2]}
                value={kisBankBranchSearchText}
                onChangeText={onChangeKisBankBranchSearchText}
                placeholder={'Search'}
                placeholderTextColor={Colors.DARKTextDisable}
                textInputContainerStyle={[
                  globalStyles.container,
                  globalStyles.flexDirectionRow,
                  globalStyles.alignCenter,
                  styles.marginHorizontal16,
                  styles.textInputContainerStyle,
                ]}
                textInputStyle={[globalStyles.container, styles.textInputStyle, styles.paddingLeft10]}
                iconRight={
                  <SearchIcon2 height={scaleSize(24)} width={scaleSize(24)} style={styles.marginHorizontal10} />
                }
              />
            </View>
          </View>
        }
      >
        {/* <FlatList
          data={kisBankBranchList}
          renderItem={(item: ListRenderItemInfo<KISBankBranch>) => {
            return (
              <TouchableOpacity onPress={() => onChangeKisBankBranch(item.item)}>
                {item.item.branchName}
              </TouchableOpacity>
            );
          }}
          keyExtractor={(_item, index) => `branch+key+${index}`}
        /> */}
        {kisBankBranchList.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => onChangeKisBankBranch(item)}
              key={`branch+key+${index}`}
              style={[globalStyles.justifyCenter, globalStyles.fillWidth, styles.kisBankBranchItemContainer]}
            >
              <Text style={styles.kisBankBranchItemText}>{item.branchName}</Text>
            </TouchableOpacity>
          );
        })}
      </Modalize>
    </View>
  );
};

export default KisEkycStep4ServiceInformation;
