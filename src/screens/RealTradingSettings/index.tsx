import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState, memo, useRef } from 'react';
import useStyles from './styles';
import { StackScreenProps } from 'screens/RootNavigation';
import HeaderScreen from 'components/HeaderScreen';
import { useTranslation } from 'react-i18next';
import globalStyles from 'styles';
import QuestionIcon from 'assets/icon/WhiteQuestionIcon.svg';
import CloseIcon from 'assets/icon/btn_close.svg';
import Radio from 'components/Radio';
import { CONNECT_SEC_FLOW } from 'global';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import BottomModal, { BaseBottomModalProps } from 'components/BottomModal';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from 'reduxs/global-reducers';
import { ILoginRealAccountRequest } from 'interfaces/common';
import { getAllPartner } from 'reduxs/global-actions/Partner';
import { reduceKisUsername } from 'reduxs/sagas/LoginRealAccount/LoginRealAccount';
import useUpdateEffect from 'hooks/useUpdateEffect';
import LeaderboardAccount from './components/LeaderboardAccount';

const RealTradingSettings = (props: StackScreenProps<'RealTradingSettings'>) => {
  const { flow = CONNECT_SEC_FLOW.AUTH } = props.route.params;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const [selected, setSelected] = useState(-1);
  const loginRealAccountParams: ILoginRealAccountRequest | null = useSelector(
    (state: IState) => state.loginRealAccountParams
  );
  const linkAccountsSuccessTrigger: boolean = useSelector((state: IState) => state.linkAccountsSuccessTrigger);
  const currentPublicOption = useRef('Join by Normal Account');

  useUpdateEffect(() => {
    switch (flow) {
      case CONNECT_SEC_FLOW.AUTH:
        goAccountTrading();
        break;
      case CONNECT_SEC_FLOW.SIGNUP:
        goSignupCongratulation();
        break;
    }
  }, [linkAccountsSuccessTrigger]);

  const openConnect = () => {
    if (flow === CONNECT_SEC_FLOW.LEADERBOARD) {
      goLeaderboard();
      return;
    }
    if (loginRealAccountParams != null) {
      dispatch(getAllPartner(reduceKisUsername(loginRealAccountParams.username)));
    }
  };

  const onPublicOptionChange = (option: string) => {
    currentPublicOption.current = option;
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const goAccountTrading = () => {
    props.navigation.navigate(ScreenNames.AccountTrading);
  };

  const goSignupCongratulation = () => {
    props.navigation.navigate(ScreenNames.SignupCongratulation);
  };

  const goLeaderboard = () => {
    props.navigation.navigate(ScreenNames.LeaderBoard);
  };

  const renderQuestionIcon = () => {
    return (
      <TouchableOpacity onPress={openBottomModal}>
        <QuestionIcon />
      </TouchableOpacity>
    );
  };

  const modalContent = ({ closeModal }: BaseBottomModalProps) => {
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text allowFontScaling={false} style={styles.modalHeaderText}>
            {t('What is Leaderboard?')}
          </Text>
          <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
            <CloseIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.imgContainer}>
          <ImageBackground
            resizeMode="contain"
            source={require('assets/LeaderBoardSetting.png')}
            style={styles.imgStyle}
          />
        </View>
        <View style={styles.textContainer}>
          <View style={globalStyles.flexDirectionRow}>
            <Text allowFontScaling={false} style={styles.modalContentPoint}>
              ・
            </Text>
            <Text allowFontScaling={false} style={styles.modalContent}>
              {t('Leaderboard - a trading competition where participants will compete with each other.')}
            </Text>
          </View>
          <View style={[globalStyles.flexDirectionRow]}>
            <Text allowFontScaling={false} style={styles.modalContentPoint}>
              ・{' '}
            </Text>
            <Text allowFontScaling={false} style={styles.modalContent}>
              {t('The Top 50 Investors ranked based on Trading Return will be honored on the Leaderboard.')}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const [bottomModal, openBottomModal] = BottomModal({ ModalContent: modalContent });

  return (
    <>
      <View style={styles.container}>
        <HeaderScreen
          leftButtonIcon={true}
          goBackAction={goBack}
          headerTitle={t('Leaderboard Setting')}
          rightButtonListIcon={[renderQuestionIcon()]}
        />
        <View style={[globalStyles.container, styles.RealTradingSettingsContainer]}>
          <View style={styles.contentContainer}>
            <Radio
              selected={selected}
              options={['Private Mode', 'Public Mode']}
              horizontal={true}
              onChangeSelect={setSelected}
              textOptions={[
                ['Other people cannot see your information.'],
                [
                  'Join Leaderboard',
                  'Other people can see your information, including: Profile; Investment portfolio and Ranking.',
                  {
                    component: (
                      <LeaderboardAccount
                        data={['Join by Normal Account', 'Join by Margin Account']}
                        onOptionChange={onPublicOptionChange}
                      />
                    ),
                    showWhenChosen: true,
                  },
                ],
              ]}
            />
          </View>
          {flow !== CONNECT_SEC_FLOW.LEADERBOARD ? (
            <Text allowFontScaling={false} style={styles.note}>
              (*) {t('You can change this setting at anytime.')}
            </Text>
          ) : (
            <Text allowFontScaling={false} style={styles.note}>
              (*) {t('Leaderboard_Update_Note')}
              <Text style={styles.email}> support@paave.io</Text>
            </Text>
          )}
        </View>
        <View style={styles.bottomButtons}>
          {flow !== CONNECT_SEC_FLOW.LEADERBOARD && (
            <TouchableOpacity
              style={[globalStyles.centered, styles.executeFormButton]}
              onPress={goSignupCongratulation}
            >
              <Text allowFontScaling={false} style={styles.skipButtonText}>
                {t('Skip')}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            disabled={selected === -1}
            style={[
              globalStyles.centered,
              styles.executeFormButton,
              styles.doneButton,
              selected === -1 ? styles.executeFormDisableButton : {},
            ]}
            onPress={openConnect}
          >
            <Text allowFontScaling={false} style={styles.doneButtonText}>
              {t('Done')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {bottomModal}
    </>
  );
};

export default memo(RealTradingSettings);
