import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStyles, { scaleSize } from 'styles';
import IconSearch from 'assets/icon/IconSearch.svg';
import IconShare from 'assets/icon/IconShare.svg';
import IconHeart from 'assets/icon/IconHeart.svg';
import IconLightHeart from 'assets/icon/Heart.svg';
import useStyles from './styles';
import { alertMessage, isVirtualAccount, navigate } from 'utils';
import HeaderScreen from 'components/HeaderScreen';
import { useDispatch } from 'react-redux';
import ScreenNames from 'screens/RootNavigation/ScreenNames';
import { queryAIRatingScore } from 'reduxs/global-actions';
import ShareData from '../../components/ShareData';
import { resetFinancialRatioData } from '../../reduxs/global-actions/Finance';
import { ParamListBase, useIsFocused } from '@react-navigation/native';
import SymbolInfo from './SymbolInfo';
import { QuestionIcon } from './QuestionIcon';
import ActionGroup from './ActionGroup';
import { track } from '@amplitude/analytics-react-native';
import { AMPLITUDE_EVENT } from 'interfaces/Amplitude';
import { SymbolDataSelector, SymbolTypeChecker, getCurrentSymbolStatistic } from 'reduxs/SymbolData';
import { useAppSelector } from 'hooks/useAppSelector';
import { WatchListActions } from 'reduxs';
import useSubscribeSymbol from 'hooks/useSubscribeSymbol';
import { StackNavigationProp } from '@react-navigation/stack';
import TabSelector from 'components/TabSelector';
import Overview from './Overview';
import Financial from './Financial';
import News from './News';
import CompanyInfo from './CompanyInfo';
import { checkViewInTab } from './helper';
import Discuss from './Discuss';
import { LANG } from 'global';

type Props = {
  navigation: StackNavigationProp<ParamListBase, string>;
};

const PAGE_NUMBER = 0;
const PAGE_SIZE = 10;
const TabConfig = {
  OVERVIEW: 'Overview',
  FINANCIAL: 'Financial',
  DISCUSS: 'Discuss',
  EVENT: 'Event',
  COMPANY_INFO: 'Company Info',
} as const;
type TabConfig = keyof typeof TabConfig;
const TabSelectorIconList = [<QuestionIcon />];

const DiscoverStockInfoOverView = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const isFocused = useIsFocused();
  const [isHeart, setIsHeart] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabConfig>('OVERVIEW');
  const [refreshing] = useState(false);
  const prevSymbolCode = useRef<string | undefined>();
  const isFirstRender = useRef(true);
  const scrollViewRef = useRef<ScrollView>(null);
  const accessToken = useAppSelector(state => state.authToken.accessToken);
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const lang = useAppSelector(state => state.lang);
  const currentSymbol = useAppSelector(SymbolDataSelector.selectCurrentSymbol, {
    symbolCode: true,
    market: true,
  });

  const isTrackViewQuote = useRef(true);
  const isTrackForeignTrade = useRef(true);

  useSubscribeSymbol([currentSymbol?.symbolCode], ['BID_OFFER', 'QUOTE']);

  const onPressTab = useCallback((tab: TabConfig) => {
    setCurrentTab(tab);
    if (tab === 'FINANCIAL') {
      track(AMPLITUDE_EVENT.VIEW_TAB_FINANCIAL_STOCK_INFO);
    }
    scrollViewRef.current?.scrollTo({ y: 0, animated: false });
  }, []);

  const goToAddToSymbol = useCallback(() => {
    navigate({
      key: ScreenNames.AddToWatchlists,
      params: {
        nextToStockInfo: true,
      },
    });
  }, []);

  const goToSearchSymbol = useCallback(() => {
    if (!currentSymbol) return;
    navigate({ key: ScreenNames.SearchSymbolAndMember });
    dispatch(
      resetFinancialRatioData({
        code: currentSymbol.symbolCode,
      })
    );
  }, []);

  const handleRefreshData = useCallback(() => {
    if (!currentSymbol) return;
    dispatch(
      getCurrentSymbolStatistic({
        payload: { symbol: currentSymbol.symbolCode, pageNumber: PAGE_NUMBER, pageSize: PAGE_SIZE },
      })
    );
  }, []);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (currentTab === 'OVERVIEW') {
        checkViewInTab(
          event.nativeEvent.contentOffset.y,
          currentSymbol?.symbolCode!,
          isTrackViewQuote,
          isTrackForeignTrade
        );
      }
    },
    [currentTab, currentSymbol?.symbolCode]
  );

  useEffect(() => {
    if (!currentSymbol) return;
    track(AMPLITUDE_EVENT.VIEW_STOCK_INFO_DETAIL, {
      selectedAccount: selectedAccount?.selectedSubAccount?.accountName ?? 'NON_LOGIN',
      source: 'NONE',
      symbolCode: currentSymbol.symbolCode,
    });

    if (
      isFocused &&
      isVirtualAccount(selectedAccount) &&
      SymbolTypeChecker.isIncludeSymbol(currentSymbol, ['ETF', 'CW', 'FUTURES'])
    ) {
      alertMessage(
        'warning',
        'VT_NOT_YET_SUPPORT_TRADING',
        'Virtual Trading has not supported trading ETF/CW/Derivatices yet'
      );
    }

    if (isFocused && isFirstRender.current && prevSymbolCode.current !== currentSymbol.symbolCode) {
      isFirstRender.current = false;
      prevSymbolCode.current = currentSymbol.symbolCode;
      dispatch(
        WatchListActions.getSymbolIncludeWatchList({
          code: currentSymbol.symbolCode,
          callback: {
            handleSuccess: () => {
              setIsHeart(true);
            },
          },
        })
      );
      dispatch(
        queryAIRatingScore({
          start: 0,
          limit: 1,
          sort: 'rank:asc',
          date: '',
          filter: { code: currentSymbol.symbolCode },
        })
      );
    }
  }, [isFocused, currentSymbol?.symbolCode]);

  if (!currentSymbol) return null;

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={navigation.goBack}
        headerTitle={
          <View style={[globalStyles.container, globalStyles.alignCenter]}>
            <Text allowFontScaling={false} style={styles.stockCodeText}>
              {currentSymbol.symbolCode}
            </Text>
            <Text allowFontScaling={false} style={styles.marketTexT}>
              {currentSymbol.market}
            </Text>
          </View>
        }
        rightButtonListIcon={
          accessToken
            ? [
                <TouchableOpacity onPress={goToSearchSymbol}>
                  <IconSearch width={scaleSize(24)} height={scaleSize(24)} />
                </TouchableOpacity>,
                <TouchableOpacity onPress={ShareData}>
                  <IconShare width={scaleSize(24)} height={scaleSize(23)} />
                </TouchableOpacity>,
                <TouchableOpacity onPress={goToAddToSymbol}>
                  {isHeart ? (
                    <IconLightHeart width={scaleSize(22)} height={scaleSize(21)} />
                  ) : (
                    <IconHeart width={scaleSize(22)} height={scaleSize(21)} />
                  )}
                </TouchableOpacity>,
              ]
            : [
                <TouchableOpacity onPress={goToSearchSymbol}>
                  <IconSearch width={scaleSize(24)} height={scaleSize(24)} />
                </TouchableOpacity>,
                <TouchableOpacity>
                  <IconShare width={scaleSize(24)} height={scaleSize(23)} />
                </TouchableOpacity>,
              ]
        }
        eachIconGap={10}
      />
      <SymbolInfo />
      <TabSelector
        listValue={TabConfig}
        icons={TabSelectorIconList}
        value={currentTab}
        setValue={onPressTab}
        type="SOLID"
        style={styles.tabSelectorContainer}
        unSelectedContainer={styles.tabUnselectedItem}
        unSelectedText={styles.unselectedText}
        scrollable={lang !== LANG.KO}
      />
      {currentTab !== 'DISCUSS' && (
        <ScrollView
          style={styles.discoverStockContainer}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefreshData} />}
          ref={scrollViewRef}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          {currentTab === 'OVERVIEW' && <Overview />}
          {currentTab === 'FINANCIAL' && <Financial />}
          {currentTab === 'EVENT' && <News />}
          {currentTab === 'COMPANY_INFO' && <CompanyInfo />}
        </ScrollView>
      )}
      {currentTab === 'DISCUSS' && <Discuss code={currentSymbol?.symbolCode} />}
      <ActionGroup />
    </View>
  );
};

export default memo(DiscoverStockInfoOverView);
