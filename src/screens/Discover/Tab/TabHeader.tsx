import { View } from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import { useStyles } from './styles';
import TabSelector from 'components/TabSelector';
import { DiscoverTabType } from '../constants';
import globalStyles from 'styles';
import { DiscoverActions } from 'reduxs';
import { useDispatch } from 'react-redux';
import { TabBody } from './TabBody';
import { useAppSelector } from 'hooks';
import { LANG } from 'global';
import { track } from '@amplitude/analytics-react-native';

type Props = {
  tabBodyRef: React.RefObject<TabBody>;
};

export const TabHeader = memo(({ tabBodyRef }: Props) => {
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const [tab, setTab] = useState<DiscoverTabType>('StockTheme');
  const lang = useAppSelector(state => state.lang);

  const onTabPressed = useCallback((tab: DiscoverTabType, index: number) => {
    tabBodyRef.current?.onTabPressed?.(tab, index);
    setTab(tab);
    dispatch(DiscoverActions.updateDiscoverTab({ tab }));

    track(tab);
  }, []);

  return (
    <View style={styles.headerContainer}>
      <TabSelector
        value={tab}
        setValue={onTabPressed}
        listValue={DiscoverTabType}
        type="SOLID"
        scrollable={lang !== LANG.KO}
        unSelectedText={styles.unselectedText}
      />
      <View style={globalStyles.alignCenter}>
        <View style={styles.smolBorder} />
      </View>
    </View>
  );
});
