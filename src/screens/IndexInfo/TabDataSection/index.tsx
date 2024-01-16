import React, { memo, useState } from 'react';
import { View } from 'react-native';
import useStyles from './styles';
// SECTIONS
// import NewsSection from './NewsSection';
import CompositionSection from './CompositionSection';
import HistoricalSection from './HistoricalSection';
import TabSelector from 'components/TabSelector';

const TabDataName = {
  // NEWS_SECTION: 'News',
  COMPOSITION_SECTION: 'Composition',
  HISTORICAL_SECTION: 'Historical Data',
} as const;
type TabDataName = keyof typeof TabDataName;

type TabDataSectionProps = {
  symbolCode: string;
};

const TabDataSection = ({ symbolCode }: TabDataSectionProps) => {
  const [tab, setTab] = useState<TabDataName>('COMPOSITION_SECTION');
  const { styles } = useStyles();
  return (
    <View style={styles.container}>
      <TabSelector value={tab} setValue={setTab} listValue={TabDataName} type="UNDERLINE" />
      {tab === 'COMPOSITION_SECTION' && <CompositionSection symbolCode={symbolCode} />}
      {tab === 'HISTORICAL_SECTION' && <HistoricalSection />}
    </View>
  );
};

export default memo(TabDataSection);
