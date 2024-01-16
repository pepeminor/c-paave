import React, { memo, useEffect, useMemo, useState } from 'react';
import { RefreshControl, ScrollView, TouchableOpacity, View } from 'react-native';
import HeaderScreen from 'components/HeaderScreen';
import globalStyles from 'styles';
import useStyles from './styles';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { onEnterScreen, onLeaveScreen } from './actions';

// SECTIONS
import InfoSection from './InfoSection';
import TabDataSection from './TabDataSection';
import ChartSection from './ChartSection';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import { useAppSelector } from 'hooks/useAppSelector';
import { SymbolDataSelector, getSymbolLatest } from 'reduxs/SymbolData';
import { LANG } from 'global';
import { FinancialInfo } from 'screens/DiscoverStockInfoOverview/Overview/components';
import { ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'components/Icon';
import { navigate } from 'utils';
import useSubscribeSymbol from 'hooks/useSubscribeSymbol';
import { useDispatch } from 'react-redux';
import TabSelector from 'components/TabSelector';
import { IndexTab } from './type';
import Discuss from 'screens/DiscoverStockInfoOverview/Discuss';
import { store } from 'screens/App';

type Props = {
  navigation: StackNavigationProp<ParamListBase, string>;
};

const IndexInfo_goToSearchSymbolAndMember = () => {
  navigate({
    key: ScreenNames.SearchSymbolAndMember,
  });
};

export const isHighLightIndex = (symbolCode: string) =>
  store
    .getState()
    .SymbolData.marketData.indexList.filter(item => item.indexType !== 'F')
    .slice(0, 5)
    .map(item => item.symbolCode)
    .includes(symbolCode);

const IndexInfo = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const { styles, dynamicColors } = useStyles();
  const lang = useAppSelector(state => state.lang);
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const currentSymbol = useAppSelector(state => {
    const symbol = SymbolDataSelector.selectCurrentIndex(state);
    return {
      symbolCode: symbol?.symbolCode ?? '',
      symbolName: (state.lang === LANG.VI ? symbol?.vietnameseName : symbol?.englishName) ?? '',
    };
  });
  const [refreshing, setRefreshing] = useState(false);
  const [tab, setTab] = useState<IndexTab>('MarketInfo');

  const isHighLighted = useMemo(() => isHighLightIndex(currentSymbol.symbolCode), [currentSymbol.symbolCode]);

  useSubscribeSymbol([currentSymbol.symbolCode], ['BID_OFFER', 'QUOTE'], true);

  useEffect(() => {
    track(AMPLITUDE_EVENT.IndexInfo, {
      index: currentSymbol.symbolName,
      selectedAccount: selectedAccount?.selectedSubAccount?.accountName ?? 'NON_LOGIN',
    });
    store.dispatch(onEnterScreen(currentSymbol?.symbolCode ?? ''));
    return () => {
      store.dispatch(onLeaveScreen({}));
    };
  }, [currentSymbol, selectedAccount?.selectedSubAccount?.accountName]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(onEnterScreen(currentSymbol?.symbolCode ?? ''));
    dispatch(
      getSymbolLatest({
        payload: [currentSymbol.symbolCode],
        callBack: {
          handleSuccess: () => setRefreshing(false),
          handleFail: () => setRefreshing(false),
        },
      })
    );
  }, [currentSymbol]);

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={navigation.goBack}
        headerTitle={currentSymbol.symbolName}
        rightButtonListIcon={[
          <TouchableOpacity onPress={IndexInfo_goToSearchSymbolAndMember}>
            <Icon name="search" size={24} color={dynamicColors.WHITE} />
          </TouchableOpacity>,
        ]}
      />
      <TabSelector
        value={tab}
        setValue={setTab}
        listValue={IndexTab}
        type="UNDERLINE"
        selectedContainer={styles.selectedTab}
        unSelectedContainer={styles.unselectedTab}
      />
      {tab === 'MarketInfo' && (
        <ScrollView
          style={globalStyles.containerGrow1}
          nestedScrollEnabled={true}
          bounces={true}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {/* Info */}
          <InfoSection symbolCode={currentSymbol.symbolCode} />

          {/* Chart */}
          <ChartSection symbolCode={currentSymbol.symbolCode} lang={lang} navigation={navigation} />
          <FinancialInfo symbolCode={currentSymbol.symbolCode} />
          {!isHighLighted ? null : (
            <>
              <View style={styles.border} />
              <TabDataSection symbolCode={currentSymbol.symbolCode} />
            </>
          )}
        </ScrollView>
      )}
      {tab === 'Discuss' && <Discuss code={currentSymbol.symbolName} />}
    </View>
  );
};

export default memo(IndexInfo);
