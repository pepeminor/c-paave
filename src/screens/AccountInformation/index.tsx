import { StackScreenProps } from 'screens/RootNavigation';
import React, { useCallback } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Linking } from 'react-native';
import globalStyles, { GradientColors } from 'styles';
import UserDelete from 'assets/icon/UserDelete.svg';
import useStyles from './styles';
import HeaderScreen from 'components/HeaderScreen';
import { useTranslation } from 'react-i18next';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import ButtonWithEditModal from './components/ButtonWithEditModal';
import ModalEmail from './components/ModalEmail';
import ModalFullName from './components/ModalFullName';
import ModalUsername from './components/ModalUsername';
import useUserAvatarColor from 'hooks/useUserAvatarColor';
import { useAppSelector } from 'hooks';
import { navigate, generateNameAbbreviations } from 'utils';
import LinearGradient from 'react-native-linear-gradient';
import { ACCOUNT_TYPE } from 'global';
import withMemo from 'HOC/withMemo';
import LinkSocial from './components/LinkSocial';
import { useDispatch } from 'react-redux';
import { AuthenticationActions } from 'reduxs';
import ModalRequestCreatePassword from 'components/ModalRequestCreatePassword';

const ACCOUNT_INFORMATION_GO_TO_LINK = () => {
  Linking.openURL('https://trading.kisvn.vn/login');
};

const AccountInformation = ({ navigation }: StackScreenProps<'AccountInformation'>) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const getAccountInfo = useAppSelector(state => state.getUserAccountInfo);
  const GetKisAccountInfo = useAppSelector(state => state.getUserKisAccountInfo);
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const isAvailablePassword = useAppSelector(state => !!state.getUserAccountInfo.data?.isPasswordCreated);

  const userAvatarColor = useUserAvatarColor(
    selectedAccount.type === ACCOUNT_TYPE.KIS ? selectedAccount.username : getAccountInfo.data?.username
  );
  const currentUserFullName =
    (selectedAccount.type === ACCOUNT_TYPE.KIS
      ? GetKisAccountInfo.data?.customerProfile.userName
      : getAccountInfo.data?.fullname) ?? '';

  const checkAvailablePassword = useCallback(() => {
    if (!isAvailablePassword) {
      dispatch(AuthenticationActions.showModalRequestPassword());

      return;
    }

    navigate({
      key: ScreenNames.DeleteAccountReason,
    });
  }, [isAvailablePassword]);

  return (
    <View style={globalStyles.container}>
      <HeaderScreen leftButtonIcon={true} goBackAction={navigation.goBack} headerTitle={'Account Information'} />
      <ScrollView style={styles.container}>
        <View style={globalStyles.container}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={GradientColors.NewGradientColor}
              style={styles.avatarBorder}
              angle={135}
              useAngle={true}
              angleCenter={{ x: 0.5, y: 0.5 }}
            >
              <View style={{ ...styles.avatarImg, backgroundColor: userAvatarColor }}>
                <Text allowFontScaling={false} style={styles.avatarImgText}>
                  {generateNameAbbreviations(currentUserFullName)}
                </Text>
              </View>
            </LinearGradient>
            <Text allowFontScaling={false} style={styles.nameText} numberOfLines={1}>
              {currentUserFullName}
            </Text>
          </View>
          <View style={styles.lineHeader} />
          <View style={styles.headRowData}>
            <Text style={styles.bigTitle}>{t(`Paave's Personal Information`)}</Text>
          </View>

          <View style={styles.PersonalContainer}>
            <Text allowFontScaling={false} style={styles.titleAccount}>
              {t('Full Name')}
            </Text>
            <ButtonWithEditModal EditModal={ModalFullName} initValue={getAccountInfo.data?.fullname ?? ''} />
          </View>
          <View style={styles.PersonalContainer}>
            <Text allowFontScaling={false} style={styles.titleAccount}>
              {t('User name')}
            </Text>
            <ButtonWithEditModal EditModal={ModalUsername} initValue={getAccountInfo.data?.username ?? ''} />
          </View>
          <View style={styles.PersonalContainer}>
            <Text allowFontScaling={false} style={styles.titleAccount}>
              {t('Email')}
            </Text>
            <ButtonWithEditModal EditModal={ModalEmail} initValue={getAccountInfo.data?.email ?? ''} />
          </View>
          <TouchableOpacity style={styles.PersonalContainer} onPress={checkAvailablePassword}>
            <UserDelete />
            <Text allowFontScaling={false} style={styles.textDeleteAccount}>
              {t('Delete Virtual Account')}
            </Text>
          </TouchableOpacity>
        </View>
        {GetKisAccountInfo.data != null && (
          <View style={globalStyles.container}>
            <View style={styles.lineHeader} />

            <View style={styles.headRowData}>
              <Text style={styles.bigTitle}>{t('Linked Account Personal Info')}</Text>
            </View>
            <View style={styles.PersonalContainer}>
              <Text allowFontScaling={false} style={styles.titleAccount}>
                {t('Account No.')}
              </Text>

              <Text allowFontScaling={false} style={styles.valueAccount}>
                {GetKisAccountInfo?.data?.customerProfile.accountNo || '_'}
              </Text>
            </View>
            <View style={styles.PersonalContainer}>
              <Text allowFontScaling={false} style={styles.titleAccount}>
                {t('User name')}
              </Text>

              <Text allowFontScaling={false} style={styles.valueAccount}>
                {GetKisAccountInfo?.data?.customerProfile.userName || '_'}
              </Text>
            </View>
            <Text allowFontScaling={false} style={styles.textSeeMore}>
              {t('To see more details please visit') + ' '}
              <Text allowFontScaling={false} style={styles.textLinkKis} onPress={ACCOUNT_INFORMATION_GO_TO_LINK}>
                {t('KIS MTS')}
              </Text>
            </Text>

            <View style={styles.headRowData}>
              <Text style={styles.bigTitle}>{t('Authorized Person Information')}</Text>
            </View>
            {GetKisAccountInfo?.data?.customerProfile?.authorizedPerson ? (
              <>
                <View style={styles.PersonalContainer}>
                  <Text allowFontScaling={false} style={styles.titleAccount}>
                    {t('Full Name')}
                  </Text>

                  <Text allowFontScaling={false} style={styles.valueAccount}>
                    {GetKisAccountInfo?.data?.authorizedPerson?.authorizedPersonsName || '_'}
                  </Text>
                </View>
                <View style={styles.PersonalContainer}>
                  <Text allowFontScaling={false} style={styles.titleAccount}>
                    {t('ID')}
                  </Text>

                  <Text allowFontScaling={false} style={styles.valueAccount}>
                    {GetKisAccountInfo?.data?.authorizedPerson?.authorizedPersonsID || '_'}
                  </Text>
                </View>
                <View style={styles.PersonalContainer}>
                  <Text allowFontScaling={false} style={styles.titleAccount}>
                    {t('Email')}
                  </Text>

                  <Text allowFontScaling={false} style={styles.valueAccount}>
                    {GetKisAccountInfo?.data?.authorizedPerson.email || '_'}
                  </Text>
                </View>
              </>
            ) : (
              <View style={styles.noDataCon}>
                <Text style={styles.noDataText}>(*) {t('You have no authorized person.')}</Text>
              </View>
            )}
          </View>
        )}
        {/* //Link Social */}
        <View style={styles.lineHeader} />
        <LinkSocial />
        <View style={styles.lineHeader} />
      </ScrollView>
      <ModalRequestCreatePassword />
    </View>
  );
};

export default withMemo(AccountInformation);
