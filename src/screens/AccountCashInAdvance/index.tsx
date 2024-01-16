import React, { memo, useState } from 'react';
import { View } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import { useStyles } from './styles';
import HeaderScreen from 'components/HeaderScreen';
import TabSelector from 'components/TabSelector';
import HistoryTab from './components/HistoryTab';
import AdvanceTab from './components/AdvanceTab';

export const CashInAdvanceTab = {
  ADVANCE: 'Cash Advance',
  HISTORY: 'Cash Advance History',
} as const;
export type CashInAdvanceTab = keyof typeof CashInAdvanceTab;

const CashInAdvance = (props: StackScreenProps<'CashInAdvance'>) => {
  const { styles } = useStyles();
  const [tab, setTab] = useState<CashInAdvanceTab>('ADVANCE');

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={props.navigation.goBack}
        headerTitle={'Cash In Advance'}
        subAccountVisible={true}
        disableVirtualAccount={true}
      />
      <TabSelector
        value={tab}
        setValue={setTab}
        listValue={CashInAdvanceTab}
        selectedContainer={styles.selectedTabContainer}
      />
      {tab === 'ADVANCE' ? <AdvanceTab /> : <HistoryTab />}
    </View>
  );
};

export default memo(CashInAdvance);
