import HeaderScreen from 'components/HeaderScreen';
import React, { memo, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import globalStyles from 'styles';
import { useIsFocused } from '@react-navigation/native';
import { track } from '@amplitude/analytics-react-native';
import useStyles from './styles';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import { useAppSelector } from 'hooks';
import useUpdateEffect from 'hooks/useUpdateEffect';
import InsightsContinue from './InsightsContinue';
import InsightsVideo from './InsightsVideo';
import InsightsBlog from './InsightsBlog';
import InsightsAIRating from './InsightsAIRating';
import InsightsInvestmentStrategy from './InsightsInvestmentStrategy';

const InsightsHome = () => {
  const isFocused = useIsFocused();

  const { styles } = useStyles();

  const selectedAccountName = useAppSelector(
    state => state.selectedAccount?.selectedSubAccount?.accountName ?? 'NON_LOGIN'
  );
  const scrollRef = useRef<ScrollView>(null);

  useUpdateEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }, [isFocused]);

  React.useLayoutEffect(() => {
    track(AMPLITUDE_EVENT.InsightTab, {
      selectedAccount: selectedAccountName,
    });
  }, []);

  return (
    <View style={[globalStyles.container]}>
      <HeaderScreen headerTitle={'Insights'} />
      <ScrollView
        style={[globalStyles.container, styles.container]}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
      >
        <InsightsContinue />
        <InsightsVideo />
        <InsightsBlog />
        <InsightsAIRating />
        <InsightsInvestmentStrategy />
      </ScrollView>
    </View>
  );
};

export default memo(InsightsHome);
