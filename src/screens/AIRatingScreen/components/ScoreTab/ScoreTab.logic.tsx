import useMergingState from 'hooks/useMergingState';
import useHandlers from 'hooks/useHandlers';
import { useEffect, useRef, useMemo } from 'react';
import { IProps } from './ScoreTab.type';
import { ACCOUNT_TYPE } from 'global';
import { useDispatch } from 'react-redux';
import { putIncreaseSearch, putIncreaseSearchForKis } from 'reduxs/global-actions';
import { ITopNumber, numberID } from 'screens/AIRatingScreen/constants';
import {
  toNonAccentVietnamese,
  formatDateToString,
  formatStringToDate,
  isSymbolExist,
  filterV2,
  navigateToSymbolInfoOverview,
  insertObjectIfElse,
} from 'utils';
import { AIRatingActions, IAIRatingScore, WatchListActions } from 'reduxs';
import config from 'config';
import momentTimezone from 'moment-timezone';
import { TabViewRef } from 'components/TabView/TabView.type';
import { store } from 'screens/App';

const currentAIRatingDate = (date?: string) => {
  if (date != null && date.match(/^\d{4}-\d{2}-\d{2}$/) != null) {
    return formatStringToDate(date, 'yyyy-MM-dd');
  }
  const timezone = config.rootTimezone; // 'Asia/Ho_Chi_Minh'
  const now = momentTimezone().tz(timezone);
  const conversionTime = momentTimezone().tz(timezone).startOf('day').add(15, 'hours').add(30, 'minutes'); // 15:30 (UTC +7)
  if (now.isSameOrBefore(conversionTime)) {
    return now.clone().subtract(1, 'days').toDate(); // yesterday
  }
  return now.toDate();
};

const filterStockByStockType = (inputList: IAIRatingScore[], stockList: string[] = [], condition = false) => {
  if (!condition) return inputList;
  return filterV2(inputList, item => stockList.includes(item.code));
};

const insertArray = (condition: boolean, input1: string[] | undefined): string[] =>
  insertObjectIfElse(condition, input1 ?? [], []) as string[];

const initializeState = {
  optionSelecting: ITopNumber.TOP5,
  stock: '',
  currentDate: {} as Date,
  enabledScroll: true,
  refreshing: false,
};
const useScoreTabLogic = (props: IProps) => {
  const [state, setState] = useMergingState({
    optionSelecting: ITopNumber.TOP5,
    stock: '',
    currentDate: currentAIRatingDate(store.getState().aiRatingDataList.data?.[0]?.date),
    enabledScroll: true,
    refreshing: false,
  });
  const dispatch = useDispatch();
  const aiRatingData = useMemo(
    () => props.dataAIRating[state.optionSelecting]?.dataList || [],
    [props.dataAIRating[state.optionSelecting]?.dataList]
  );
  const aiRatingInOut = useMemo(
    () => props.dataAIRating[state.optionSelecting]?.inOutRating || [],
    [props.dataAIRating[state.optionSelecting]?.inOutRating]
  );

  const TabViewRef = useRef<TabViewRef>(null);
  const filteredStocks = useMemo(() => {
    if (state.stock != '')
      return filterV2(aiRatingData, item => item.code.includes(toNonAccentVietnamese(state.stock.toUpperCase())));

    const filteredByScore = filterV2(
      aiRatingData,
      item =>
        item.gsCore >= props.filterStock.quality &&
        item.valuationScore >= props.filterStock.valuation &&
        item.overall >= props.filterStock.rating &&
        item.techScore >= props.filterStock.technical
    );
    return filterStockByStockType(
      filteredByScore,
      [
        ...insertArray(props.filterStock.VN30, props.indexStockList.VN30),
        ...insertArray(props.filterStock.HNX30, props.indexStockList.HNX30),
        ...insertArray(props.filterStock.UPCOM, props.indexStockList.UPCOM),
      ],
      props.filterStock.VN30 || props.filterStock.HNX30 || props.filterStock.UPCOM
    );
  }, [aiRatingData, props.filterStock, props.indexStockList, state.stock]);

  const propsRefJson = {
    ...props,
    ...state,
    TabViewRef,
  };

  const propsRef = useRef(propsRefJson);
  propsRef.current = propsRefJson;

  useEffect(() => {
    if (aiRatingData == null || aiRatingData[0]?.date == null) return;
    setState({ currentDate: formatStringToDate(aiRatingData[0].date, 'yyyy-MM-dd') });
  }, [aiRatingData]);

  const handlers = useHandlers({
    goToStockInfo: (code: string) => () => {
      if (!isSymbolExist(code)) return;
      if (propsRef.current.selectedAccount.type === ACCOUNT_TYPE.VIRTUAL) {
        dispatch(putIncreaseSearch({ code: code }));
      }
      if (propsRef.current.selectedAccount.type === ACCOUNT_TYPE.KIS) {
        dispatch(putIncreaseSearchForKis({ code: code, partnerId: 'kis' }));
      }
      dispatch(
        WatchListActions.getSymbolIncludeWatchList({
          code,
        })
      );
      navigateToSymbolInfoOverview(code, dispatch);
    },
    onChangeCurrentDate: (date: Date) => {
      setState({ currentDate: date });
      const dateString = formatDateToString(date, 'yyyyMMdd') || '';
      const paramsInOut = {
        top: propsRef.current.optionSelecting,
        date: dateString,
      };
      dispatch(AIRatingActions.getAiRatingInOut(paramsInOut));
      const params = {
        start: 0,
        limit: -1,
        sort: 'rank:asc',
        date: dateString,
        filter: {},
        top: propsRef.current.optionSelecting,
      };
      dispatch(AIRatingActions.getAiRatingList(params));
    },

    onChangeOption: (index: number) => {
      const option = parseInt(numberID[index].key, 10) as ITopNumber;
      setState({ optionSelecting: option });
    },
    onChangeStock: (stock: string) => {
      setState({ stock });
    },
    onChangeEnabledScroll: (enabledScroll: boolean) => {
      setState({ enabledScroll });
    },
    onRefresh: () => {
      propsRef.current.TabViewRef.current?.reset();
      dispatch(AIRatingActions.resetDataAiRating());
      setState(initializeState);
    },
  });

  return {
    state,
    handlers,
    filteredStocks,
    aiRating: {
      aiRatingData,
      aiRatingInOut,
    },
    refs: {
      TabViewRef,
    },
  };
};

export default useScoreTabLogic;
