import React, { memo, useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, RefreshControl, TouchableOpacity } from 'react-native';
import { StackScreenProps } from 'screens/RootNavigation';
import { scaleSize } from 'styles';
import useStyles from './styles';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../reduxs/global-reducers/index';
import NoDataPieChart from 'components/Chart/NoDataPieChart';
import { ReducerStatus } from 'interfaces/reducer';
import { onRefreshPortfolioInvestmentScreen } from './action';
import useUpdateEffect from 'hooks/useUpdateEffect';
// import { IResponse } from 'interfaces/common';
import PortFolioTotal from './components/PortfolioTotal';
import { useIsFocused } from '@react-navigation/native';
import { getTradingHistory, getUserAccountInfo, resetTradingHistory } from 'reduxs/global-actions';
import StockListLeaderActivity from 'components/StockListLeaderActivity';
import { ACCOUNT_TYPE, SYSTEM_TYPE } from 'global';

import StockList from 'components/StockList';
import PieChart from 'components/Chart/PieChart';
import HeaderScreen from 'components/HeaderScreen';
import PortfolioDerivatives from 'screens/PortfolioDerivatives';
// import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import { InvestmentSelectors } from 'reduxs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useAppSelector } from 'hooks/useAppSelector';
import useSubAccountSelector from 'hooks/useSubAccountSelector';
import { filterV2, mapV2, insertObjectIf } from 'utils';

const PortfolioInvestment = ({ navigation }: StackScreenProps<'PortfolioInvestment'>) => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { styles } = useStyles();
  const { isSubD } = useSubAccountSelector();

  const isFirstFetch = useRef<boolean>(true);

  const selectedAccount = useSelector((state: IState) => state.selectedAccount);
  const profitLossResponse = useSelector(InvestmentSelectors.selectedProfitLoss(false));
  const profitLossItems = useAppSelector(InvestmentSelectors.selectedProfitLossItems(false));
  const derivativePortfolio = useSelector((state: IState) => state.derivativePortfolio);
  const profitLossStockCodes = useAppSelector(InvestmentSelectors.selectedProfitLossStockCodes(false));

  const getAccountInfo = useSelector((state: IState) => state.getUserAccountInfo);
  const [selectingPortfolio, setSelectingPortfolio] = useState(true);
  const [listItems, setListItems] = useState(profitLossItems ?? []);
  const [listCodes, setListCodes] = useState(profitLossStockCodes ?? []);

  const onRefresh = React.useCallback(() => {
    dispatch(onRefreshPortfolioInvestmentScreen(selectedAccount, undefined, undefined, undefined, undefined));
    dispatch(getUserAccountInfo(null));
    if (getAccountInfo.data != null && selectedAccount.type === ACCOUNT_TYPE.VIRTUAL) {
      dispatch(getTradingHistory({ profileId: getAccountInfo.data.id }, undefined, undefined, true));
    }
  }, [selectedAccount, getAccountInfo.data]);

  useEffect(() => {
    setListItems(profitLossItems);
    setListCodes(profitLossStockCodes);
  }, [profitLossItems]); //Avoid rendering 2 times unnecessarily, only rerun when "profitLossItems" changes

  useEffect(() => {
    return () => {
      dispatch(resetTradingHistory(null));
    };
  }, []);

  useEffect(() => {
    if (
      isFirstFetch.current ||
      profitLossResponse.status !== ReducerStatus.SUCCESS ||
      profitLossResponse.data == null
    ) {
      isFirstFetch.current = false;
      onRefresh();
    }
  }, [isFocused]);

  useUpdateEffect(() => {
    onRefresh();
    if (!selectingPortfolio) {
      setSelectingPortfolio(true);
    }
  }, [selectedAccount]);

  const onSelectPortfolio = () => {
    if (!selectingPortfolio) {
      setSelectingPortfolio(true);
    }
  };

  const onSelectRealizedPL = () => {
    if (selectingPortfolio) {
      setSelectingPortfolio(false);
    }
  };

  const setDataFilter = useCallback(
    (industry: string) => {
      if (industry !== '') {
        const data = filterV2(profitLossItems, item => item.sectorName === industry);
        const listStockCodes = mapV2(data, item => item.stockCode);
        setListItems(data);
        setListCodes(listStockCodes);

        return;
      }

      setListItems(profitLossItems);
      setListCodes(profitLossStockCodes);
      // dispatch(InvestmentActions.onFilterProfitLossItem({ industry, isOtherUser: false, index }));
    },
    [profitLossItems, profitLossStockCodes]
  );

  const refreshState =
    (selectedAccount.type === ACCOUNT_TYPE.KIS &&
      selectedAccount.selectedSubAccount != null &&
      selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.EQUITY) ||
    selectedAccount.type === ACCOUNT_TYPE.VIRTUAL
      ? profitLossResponse.status === ReducerStatus.LOADING
      : derivativePortfolio.status === ReducerStatus.LOADING;

  return (
    <View style={styles.container}>
      <HeaderScreen
        leftButtonIcon={true}
        goBackAction={navigation.goBack}
        headerTitle={'Investment'}
        subAccountVisible={true}
      />
      <KeyboardAwareScrollView
        refreshControl={<RefreshControl refreshing={refreshState} onRefresh={onRefresh} />}
        scrollEventThrottle={16}
        extraHeight={scaleSize(-1)}
      >
        {isSubD ? <PortfolioDerivatives /> : null}

        {selectedAccount.type === ACCOUNT_TYPE.VIRTUAL &&
          profitLossResponse.status === ReducerStatus.SUCCESS &&
          profitLossResponse.data != null && (
            <View style={styles.pAOptionContainer}>
              <View style={styles.screenOption}>
                <TouchableOpacity
                  onPress={onSelectPortfolio}
                  style={[styles.optionContainer, selectingPortfolio === true && styles.optionContainerSelected]}
                >
                  <Text
                    allowFontScaling={false}
                    style={selectingPortfolio === true ? styles.selectedText : styles.unselectedText}
                  >
                    {t('Portfolio')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onSelectRealizedPL}
                  style={[styles.optionContainer, selectingPortfolio !== true && styles.optionContainerSelected]}
                >
                  <Text
                    allowFontScaling={false}
                    style={selectingPortfolio === true ? styles.unselectedText : styles.selectedText}
                  >
                    {t('Realized P/L')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

        <View
          style={[
            { display: !selectingPortfolio ? 'none' : 'flex' },
            insertObjectIf(!selectingPortfolio, { zIndex: -1 }),
          ]}
        >
          <View style={styles.chart}>
            {profitLossResponse.data != null && profitLossResponse.data.profitLossItems?.length >= 1 && (
              <PieChart
                data={profitLossResponse.data}
                setData={setDataFilter}
                isVisibleStockBalance
                status={profitLossResponse.status}
              />
            )}
            {profitLossResponse.data != null && profitLossResponse.data.profitLossItems?.length === 0 && (
              <NoDataPieChart />
            )}
          </View>
          <PortFolioTotal />
        </View>
        {!isSubD && selectingPortfolio && (
          <StockList
            setDataStock={setListCodes}
            scrollEnabled={false}
            isFullData={true}
            isOtherUser={false}
            listItems={listItems}
            listCodes={listCodes}
          />
        )}
        {!selectingPortfolio && selectedAccount.type === ACCOUNT_TYPE.VIRTUAL && (
          <View style={styles.containerStockListLeader}>
            <StockListLeaderActivity />
          </View>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default memo(PortfolioInvestment);
