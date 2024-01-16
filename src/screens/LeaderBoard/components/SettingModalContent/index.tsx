import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, memo } from 'react';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import CloseIcon from 'assets/icon/btn_close.svg';
import StickIcon from 'assets/icon/StickIcon.svg';
import globalStyles, { GradientColors } from 'styles';
import DiagonalGradientButton from 'components/DiagonalGradientButton';
import { BaseBottomModalProps } from 'components/BottomModal';

const LeaderboardSettingMode = ['Normal Account', 'Margin Account'];

const LeaderBoardItemStyles = [
  globalStyles.flexDirectionRow,
  globalStyles.justifySpaceBetween,
  globalStyles.padding16,
  globalStyles.borderBottom1,
];

const SettingModalContent = ({ closeModal }: BaseBottomModalProps) => {
  const { t } = useTranslation();
  const [selected, _setSelected] = useState('');
  const { styles } = useStyles();

  const setSelected = (data: string) => () => {
    _setSelected(data);
    // TODO: Update option
  };

  const LeaderboardItem = ({ data, key }: { data: string; key: number }) => (
    <TouchableOpacity style={LeaderBoardItemStyles} onPress={setSelected(data)} key={key}>
      <Text allowFontScaling={false} style={[styles.text, styles.itemText]}>
        {t(data)}
      </Text>
      {selected === data && <StickIcon />}
    </TouchableOpacity>
  );
  return (
    <View>
      <View style={[styles.modalHeader, globalStyles.borderBottom1]}>
        <Text allowFontScaling={false} style={[styles.text, styles.modalHeaderText]}>
          {t('Leaderboard Setting')}
        </Text>
        <TouchableOpacity style={styles.closeBtn} onPress={closeModal}>
          <CloseIcon />
        </TouchableOpacity>
      </View>
      <View style={[globalStyles.borderBottom1, globalStyles.padding16]}>
        <Text allowFontScaling={false} style={styles.text}>
          {t(
            'By joining Leaderboard, other people can see your information, including: Profile; Investment portfolio and Ranking.'
          )}
        </Text>
        <Text allowFontScaling={false} style={[styles.text, styles.specialText]}>
          {t('Join Leaderboard by:')}
        </Text>
      </View>
      {LeaderboardSettingMode.map((item, index) => (
        <LeaderboardItem data={item} key={index} />
      ))}
      <DiagonalGradientButton
        containerStyle={styles.btnStyles}
        onPress={closeModal}
        btnText={'Join Now'}
        colors={GradientColors.GradientYellow}
      />
    </View>
  );
};

export default memo(SettingModalContent);
