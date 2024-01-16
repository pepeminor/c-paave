import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { useAppSelector } from 'hooks';
import { scaleSize } from 'styles';
import useStyles from './styles';
import AIRatingStock from 'screens/AIRatingScreen/components/AIRatingStock';
import { handleNumberAI, navigateReplace } from 'utils';
import AIRatingModal from 'components/AIRatingModal';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import AskScore from 'assets/icon/AskScore.svg';
import { TouchableOpacity } from 'react-native';

const hitSlop = {
  top: 10,
  bottom: 10,
  left: 10,
  right: 10,
};

export const AIRating = memo(() => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const aiRatingData = useAppSelector(state => state.aiRatingData.data?.[0]);

  const [visibleModal, setVisibleModal] = useState<boolean>(false);

  const handleVisible = useCallback(() => {
    setVisibleModal(pre => !pre);
  }, []);

  const goToAIRatingScreen = useCallback(() => {
    navigateReplace(ScreenNames.HomeTab, { tab: 'Insights' });
    setVisibleModal(false);
  }, []);

  if (!aiRatingData) return null;

  return (
    <View style={styles.container}>
      <View style={styles.containerTitle}>
        <Text allowFontScaling={false} style={styles.titleText}>
          {t('AI Rating')}
        </Text>
        <TouchableOpacity onPress={handleVisible} hitSlop={hitSlop}>
          <AskScore width={scaleSize(20)} height={scaleSize(20)} style={styles.askScoreIcon} />
        </TouchableOpacity>
      </View>

      <AIRatingStock
        stock={aiRatingData?.code}
        rank={aiRatingData?.rank}
        change={Number(aiRatingData?.change)}
        overall={Number(handleNumberAI(aiRatingData?.overall))}
        valuationScore={aiRatingData?.valuationScore}
        techScore={aiRatingData?.techScore}
        gsCore={aiRatingData?.gsCore}
        disablePress={true}
      />
      {visibleModal === true && <AIRatingModal handleVisible={handleVisible} goToAIRatingScreen={goToAIRatingScreen} />}
    </View>
  );
});
