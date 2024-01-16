import React, { memo } from 'react';
import { ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { IProps } from './LeaderboardSetting.type';
import HeaderScreen from 'components/HeaderScreen';
import { FlatList } from 'react-native-gesture-handler';
import CheckBox from 'components/CheckBox';
import useStyles from './styles';
import BottomButton from 'components/BottomButton';
import Icon from 'components/Icon';
import { Colors } from 'styles';
import { convertTextSubAccChoosedToOptIn, useLeaderboardSettingLogic } from './LeaderboardSetting.logic';
import { useTranslation } from 'react-i18next';
import { ReducerStatus } from 'interfaces/reducer';
import DummyModal from 'components/DummyModal';

const LeaderboardSetting = (props: IProps) => {
  const { styles } = useStyles();
  const { t } = useTranslation();
  const isFocused = props.navigation.isFocused();
  const { leaderboardSetting, isShowDummyModal, kisSubAccount } = props;

  const {
    state: { isOptIn, whichAccountJoin, disableConfirmButton },
    logic: { handleOptOUT, handleOptIN, handleJoinWhichAccount, handleConfirm, goToLeaderboard },
  } = useLeaderboardSettingLogic(props);

  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.contain}>
      <ScrollView style={styles.contain}>
        <HeaderScreen leftButtonIcon={true} goBackAction={goBack} headerTitle={'Leaderboard Setting'} />
        <View style={styles.wrap}>
          <View>
            <CheckBox
              children={<Text style={styles.label}>{t('Private Mode')}</Text>}
              value={!isOptIn}
              onPress={handleOptOUT}
            />
            <View style={styles.wrapDotText}>
              <View style={styles.dotText}>
                <Text style={styles.dotStyle}>{'\u2022'}</Text>
                <Text>{t('Other_People_Cannot_See_Your_Information')}.</Text>
              </View>
            </View>
          </View>
          <View>
            <CheckBox
              children={<Text style={styles.label}>{t('Public Mode')}</Text>}
              value={isOptIn}
              onPress={handleOptIN}
            />
            <View style={styles.wrapDotText}>
              <View style={styles.dotText}>
                <Text style={styles.dotStyle}>{'\u2022'}</Text>
                <Text>{t('Join Leaderboard')}.</Text>
              </View>
              <View style={styles.dotText}>
                <Text style={styles.dotStyle}>{'\u2022'}</Text>
                <Text>{t('Other_People_Can_See_Your_Information')}.</Text>
              </View>
            </View>
          </View>

          {isOptIn && (
            <View style={styles.wrapJoinBy}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={kisSubAccount}
                keyExtractor={(item, idx) => `${item.accountNumber + idx}`}
                renderItem={({ item }) => {
                  return (
                    <View>
                      <TouchableOpacity
                        onPress={() => handleJoinWhichAccount(item.accountNumber)}
                        style={styles.touchJoinText}
                      >
                        <Text style={styles.joinText}>
                          {t('Join by ' + convertTextSubAccChoosedToOptIn(item.accountNumber))} ({item.accountNumber})
                        </Text>
                        {whichAccountJoin !== item.accountNumber && <View style={styles.circleShape} />}
                        {whichAccountJoin === item.accountNumber && (
                          <View style={styles.iconCheck}>
                            <Icon name={'check'} color={Colors.Green1} size={24} />
                          </View>
                        )}
                      </TouchableOpacity>
                      <View style={styles.touchBorder} />
                    </View>
                  );
                }}
                ListEmptyComponent={
                  <TouchableWithoutFeedback style={styles.touchJoinText}>
                    <Text style={styles.joinText}>{t('No_KIS_Account')}</Text>
                  </TouchableWithoutFeedback>
                }
              />
            </View>
          )}
          <Text style={styles.contactText}>(*) {t('Leaderboard_Setting_Note')}</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomButton}>
        <TouchableOpacity onPress={goToLeaderboard}>
          <Text style={styles.goToLeaderboard}>{t('Go_To_Leaderboard')}</Text>
        </TouchableOpacity>
        <BottomButton
          isShowLoading={leaderboardSetting.status === ReducerStatus.LOADING}
          backgroundButton={
            disableConfirmButton ? [Colors.BACKGROUND_MODAL, Colors.BACKGROUND_MODAL] : [Colors.Blue5, Colors.Blue5]
          }
          text={'Confirm'}
          onPress={handleConfirm}
        />
      </View>
      {isShowDummyModal && isFocused && (
        <DummyModal
          dummyTitle="Leaderboard_Title_Your_Adjustment_Recorded"
          dummyText="Leaderboard_Your_Adjustment_Recorded"
        />
      )}
    </View>
  );
};

export default memo(LeaderboardSetting);
