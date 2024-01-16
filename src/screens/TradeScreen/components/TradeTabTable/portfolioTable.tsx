import React, { useMemo, useCallback, useState, useEffect } from 'react';
import RowWrapper from 'components/SheetData2/components/RowWrapper';
import { useScrollHorizontal } from 'components/SheetData2';
import { useDispatch } from 'react-redux';
import {
  IDrAccountOpenPositionItem,
  IKisClientPortfolioResponse,
  IProfitLossItems,
  IProfitLossResponse,
} from 'interfaces/equity';
import { setSellBuyType } from 'reduxs/global-actions';
import { SELL_BUY_TYPE } from 'global';
import portfolioRowItem from './portfolioRowItem';
import { width } from 'styles';
import { onRefreshPortfolioInvestmentScreen } from '../../../PortfolioInvestment/action';
import { IResponse } from 'interfaces/common';
import { useIsFocused } from '@react-navigation/native';
import { View, Text } from 'react-native';
import EmptySymbol from 'assets/icon/EmptySymbol.svg';
import { useTranslation } from 'react-i18next';
import { ReducerStatus } from 'interfaces/reducer';
import { setCurrentSymbol, SymbolDataSelector } from 'reduxs/SymbolData';
import { useAppSelector, useTypedSelector } from 'hooks/useAppSelector';
import { isSymbolExist, mapV2 } from 'utils';
import { SortType } from 'components/StockList/components/TouchCell';
import { comparePL } from 'components/StockList/helper';
import { TitleHeader } from 'components/StockList/components/Header/HeaderUserWall';
import useStyles from './styles';
import withMemo from 'HOC/withMemo';
import { InvestmentSelectors } from 'reduxs';
import useUpdateEffect from 'hooks/useUpdateEffect';
import { EndReachedEventHandler } from 'screens/TradeScreen/TradeScreen.helper';

interface IPortfolioTableProps {
  plViewType: boolean;
  triggerReload: boolean;
  isNotRefresh?: boolean;
  sortType?: SortType;
  activeTitleHeader?: string;
  getSortType?: (type: SortType) => void;
  scrollToTop?: () => void;
}

const PAGE_SIZE = 10;

const PortfolioTable = ({
  plViewType,
  triggerReload,
  isNotRefresh,
  scrollToTop,
  sortType,
  getSortType,
  activeTitleHeader,
}: IPortfolioTableProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { scrollStyle, frozenStyle } = useScrollHorizontal(width);
  const profitLossItemsOriginal = useAppSelector(InvestmentSelectors.selectedProfitLossItems(false));
  const derivativesPortfolioTableInTradeData = useAppSelector(state => state.derivativesPortfolioTableInTradeData);
  const status = useAppSelector(state => state.InvestmentReducer.profitLossResponse.status);
  const cwList = useTypedSelector(state => state.SymbolData.marketData.cwList);
  const cwCodeList = useMemo(() => cwList.map(item => item.symbolCode), [cwList]);
  const currentSymbolType = useAppSelector(state => SymbolDataSelector.selectCurrentSymbol(state)?.symbolType);
  const selectedAccount = useAppSelector(state => state.selectedAccount);
  const accountList = useAppSelector(state => state.accountList);
  const [profitLossItems, setProfitLossListItem] = useState<IProfitLossItems[] | IDrAccountOpenPositionItem[]>(() => {
    if (currentSymbolType !== 'FUTURES') {
      return profitLossItemsOriginal != null ? profitLossItemsOriginal : [];
    } else {
      return derivativesPortfolioTableInTradeData?.openPositionList ?? [];
    }
  });
  const [page, setPage] = useState(1);

  EndReachedEventHandler.useSubscribeEndReached(() => {
    setPage(pre => pre + 1);
  });

  const onRefresh = useCallback(() => {
    setPage(1);
    dispatch(
      onRefreshPortfolioInvestmentScreen(selectedAccount, undefined, undefined, undefined, undefined, {
        handleSuccess(response?: IResponse<IProfitLossResponse | IKisClientPortfolioResponse>) {
          if (response != null) {
            if (currentSymbolType !== 'FUTURES') {
              if ((response.data as IProfitLossResponse).profitLossItems.length > 0) {
                setProfitLossListItem((response.data as IProfitLossResponse).profitLossItems);
              }
            } else {
              if ((response.data as IKisClientPortfolioResponse).openPositionList.length > 0) {
                setProfitLossListItem((response.data as IKisClientPortfolioResponse).openPositionList);
              }
            }
          }
        },
        handleFail() {
          setProfitLossListItem([]);
        },
      })
    );
  }, [selectedAccount, currentSymbolType]);

  useUpdateEffect(() => {
    const originalList = mapV2(profitLossItemsOriginal, item => item);

    if (activeTitleHeader === TitleHeader.PLPERCENT || activeTitleHeader === TitleHeader.PLVALUE) {
      switch (sortType) {
        case SortType.ASC:
          const dataASC = originalList.sort((a, b) => comparePL(a, b, plViewType));
          setProfitLossListItem(dataASC);
          break;
        case SortType.DESC:
          const dataDESC = originalList.sort((a, b) => comparePL(b, a, plViewType));

          setProfitLossListItem(dataDESC);
          break;
        default:
          setProfitLossListItem(originalList);
          break;
      }
    } else if (activeTitleHeader === TitleHeader.SYMBOL) {
      switch (sortType) {
        case SortType.ASC:
          const dataASC = originalList.sort((a, b) => a.stockCode.localeCompare(b.stockCode));
          setProfitLossListItem(dataASC);
          break;
        case SortType.DESC:
          const dataDESC = originalList.sort((a, b) => b.stockCode.localeCompare(a.stockCode));
          setProfitLossListItem(dataDESC);
          break;
        default:
          setProfitLossListItem(originalList);
          break;
      }
    } else {
      setProfitLossListItem(originalList);
    }
  }, [profitLossItemsOriginal, sortType, activeTitleHeader]);

  // handle symbol CW removed file symbol list data
  const symbolRemoved = useMemo(() => {
    if (profitLossItems == null) return;
    const symbolDataCode = profitLossItems.map(item => {
      if ('stockCode' in item) return item.stockCode;
      return item.seriesID;
    });
    const symbolRemoved = symbolDataCode.filter(item => {
      return cwCodeList.includes(item);
    });
    return symbolRemoved;
  }, [profitLossItemsOriginal, cwCodeList, profitLossItems]);

  const SellOrder = useCallback(
    (item: IProfitLossItems) => () => {
      scrollToTop?.();
      if (item != null && isSymbolExist(item.stockCode)) {
        dispatch(setCurrentSymbol(item.stockCode));
        dispatch(setSellBuyType(SELL_BUY_TYPE.SELL));
      }
    },
    [accountList, selectedAccount.type, selectedAccount.selectedSubAccount]
  );

  const Wrapper = useCallback(RowWrapper({ scrollStyle, frozenStyle }), []);

  const RenderRow = useMemo(
    () => portfolioRowItem({ plViewType, SellOrder, symbolRemoved }),
    [plViewType, SellOrder, symbolRemoved]
  );

  useEffect(() => {
    if (!isFocused || isNotRefresh) return;
    getSortType?.(SortType.NONE);
    onRefresh();
  }, [selectedAccount.type, selectedAccount.selectedSubAccount, isFocused, triggerReload]);

  if (status !== ReducerStatus.SUCCESS || profitLossItemsOriginal == null) return null;
  return (
    <>
      {Object.keys(profitLossItemsOriginal).length !== 0 && profitLossItemsOriginal.length >= 1 ? (
        <View>
          {(profitLossItems as IProfitLossItems[]).slice(0, page * PAGE_SIZE).map((item, index) => (
            <RenderRow data={item} key={index} Wrapper={Wrapper} />
          ))}
        </View>
      ) : null}
      {Object.keys(profitLossItemsOriginal).length !== 0 && profitLossItemsOriginal.length === 0 ? (
        <View style={styles.noDataCon}>
          <EmptySymbol />
          <Text style={styles.noDataText}>{t('You have not owned any symbols yet.')}</Text>
        </View>
      ) : null}
    </>
  );
};

export default withMemo(PortfolioTable);
