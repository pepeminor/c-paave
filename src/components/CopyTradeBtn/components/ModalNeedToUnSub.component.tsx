import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity } from 'react-native';
import React, { memo, useCallback } from 'react';
import useStyles from '../styles';
import { navigate } from 'utils';
import { useDispatch } from 'react-redux';
import { setCurrentUserSubAccount } from 'reduxs/global-actions';
import { getBotInfo } from '..';
import { TAB } from 'screens/AIRatingScreen/AiRatingScreen.logic';

interface ModalNeedToUnSubProps {
  followingID: string;
  closeModal: () => void;
}

const ModalNeedToUnSub = memo(({ followingID, closeModal }: ModalNeedToUnSubProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();

  const isCopyTopAI = followingID.match(/AIRating/) != null;

  const goToAiRating = useCallback(() => {
    navigate({
      key: 'AIRatingScreen',
      params: {
        aiRatingTab: {
          tab: TAB.AI_RATING,
        },
      },
    });
    closeModal();
  }, []);

  const goToUserWall = () => {
    dispatch(setCurrentUserSubAccount('000')); // bot wont join contest
    const botInfo = getBotInfo(followingID);
    if (botInfo) {
      navigate({
        key: 'UserWall',
        params: {
          userData: botInfo,
          headerTitle: 'AI Insights',
          defaultSample: 30,
        },
      });
    }
    closeModal();
  };

  return (
    <View style={styles.modalContentContainer}>
      <Text allowFontScaling={false} style={styles.modalHeader}>
        {t('Attention')}
      </Text>
      <Text allowFontScaling={false} style={styles.modalUnSubText}>
        {t('You need to unsubscribe from the current auto copy before you can auto copy another robo advisor.')}
      </Text>
      <TouchableOpacity
        style={[styles.modalBtn, styles.btnPrimary]}
        onPress={isCopyTopAI ? goToAiRating : goToUserWall}
      >
        <Text allowFontScaling={false} style={[styles.optionText, styles.textPrimary]}>
          {t(isCopyTopAI ? 'Go to AI Rating' : 'Go to Robo Advisor')}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

export default ModalNeedToUnSub;
