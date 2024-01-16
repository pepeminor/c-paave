import React, { useCallback } from 'react';

// Styles
import useStyles from './styles';
import { queryIndexRankAndSubscribe } from 'reduxs/global-actions/IndexInfo';
import CompositionTable from './Table';
import TabSelector from 'components/TabSelector';
import { store } from 'screens/App';

export enum CompositionOption {
  TRADING_VOLUME = 'TRADING_VOLUME',
  TOP_RETURN = 'TOP_RETURN',
  WORST_RETURN = 'WORST_RETURN',
}

const CompositionTab = {
  TRADING_VOLUME: 'Trading Volume',
  TOP_RETURN: 'Top Return',
  WORST_RETURN: 'Worst Return',
} as const;
export type CompositionTab = keyof typeof CompositionTab;

type ICompositionBaseProps = {
  symbolCode: string;
};

const CompositionSection = (props: ICompositionBaseProps) => {
  const { styles } = useStyles();
  const { symbolCode } = props;
  const [tab, setTab] = React.useState<CompositionTab>('TRADING_VOLUME');

  const onSelectOption = useCallback(
    (option: CompositionTab) => {
      setTab(pre => {
        if (pre === option) return pre;
        store.dispatch(queryIndexRankAndSubscribe({ option: option as CompositionOption, symbolCode }));
        return option;
      });
    },
    [symbolCode]
  );

  return (
    <>
      <TabSelector
        value={tab}
        setValue={onSelectOption}
        listValue={CompositionTab}
        selectedContainer={styles.selectedTab}
      />
      <CompositionTable />
    </>
  );
};

export default CompositionSection;
