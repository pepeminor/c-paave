/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAction } from 'interfaces/common';
import {
  IAddSymbolParams,
  IChangeSelectedWatchListParams,
  IDeleteSymbolParams,
  IGetAllWatchlistResponse,
  IGetSymbolIncludeWatchlistParams,
  IInitWatchListParams,
  IModifyWatchlistParams,
} from 'interfaces/favorite';
import { ReducerStatus } from 'interfaces/reducer';
import { IWatchListModule } from './WatchList.type';
import { IState } from 'reduxs/global-reducers';
import { mergeDeepRight } from 'ramda';
import { ICreateNewWatchListAction } from 'interfaces/sagas/ICreateNewWatchListAction';
import { PersistConfig } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { ACCOUNT_TYPE } from 'global';
import { listType } from 'screens/DiscoverWatchlist/components/WatchListType/WatchListType.logic';
import { InvestmentActions } from 'reduxs/Investment';
import { mapV2 } from 'utils';

const initialState: IWatchListModule = {
  watchListList: {
    status: ReducerStatus.LOADING,
    data: [],
  },
  watchlistIncludeItem: {
    status: ReducerStatus.LOADING,
    data: [],
  },
  selectedWatchList: {} as IGetAllWatchlistResponse,
  selectedWatchlistSymbolList: {
    status: ReducerStatus.LOADING,
    data: [],
    hasMore: true,
    hasMoreLoading: false,
  },

  watchListNonLogin: {
    index: 0,
    name: 'My Watchlist',
    stocks: [],
  },
  watchListType: listType[0],

  isAddingSymbol: false,
};

export const WatchListSelectors = {
  selectWatchListList: (state: IState) => state.WatchListReducer.watchListList,
  selectWatchlistIncludeItem: (state: IState) => state.WatchListReducer.watchlistIncludeItem,
  selectSelectedWatchList: (state: IState) => state.WatchListReducer.selectedWatchList,
  selectSelectedWatchlistSymbolList: (state: IState) => state.WatchListReducer.selectedWatchlistSymbolList,
  selectWatchListType: (state: IState) => state.WatchListReducer.watchListType.type,
};

const watchListSlice = createSlice({
  name: 'watchList',
  initialState,
  reducers: {
    initWatchList(_state, _action: IAction<IInitWatchListParams>) {
      //todo init watch list
    },
    initWatchListSuccess(_state) {
      //success
    },
    initWatchListFailed(state) {
      //failed

      state.selectedWatchlistSymbolList = {
        data: [],
        status: ReducerStatus.FAILED,
        hasMore: true,
        hasMoreLoading: false,
      };
    },
    updateWatchList(state, action: IAction<Partial<IWatchListModule>>) {
      if (state.selectedWatchList.watchListName === '') {
        const newSelectedWatchlist = action.payload.watchListList?.data.find(
          item => item.watchListId === state.selectedWatchList.watchListId
        );
        if (newSelectedWatchlist != null) action.payload.selectedWatchList = newSelectedWatchlist;
      }
      return {
        ...(mergeDeepRight(state, action.payload) as IWatchListModule),
      };
    },
    onAddMultiSymbols(state, _action: PayloadAction<IAddSymbolParams>) {
      state.isAddingSymbol = true;
    },
    onAddMultiSymbolsSuccess(state, action: PayloadAction<{ numberStocks: number; listCode: string[] }>) {
      const newWatchListList = state.watchListList.data;
      const watchListId = state.selectedWatchList.watchListId;
      const index = newWatchListList.findIndex(item => item.watchListId === watchListId);

      newWatchListList[index].numberOfStocks = action.payload.numberStocks;

      state.watchListList.data = newWatchListList;
      state.selectedWatchList.numberOfStocks = action.payload.numberStocks;
      state.isAddingSymbol = false;

      const listCode = action.payload.listCode;
      const oldList = state.selectedWatchlistSymbolList;
      const newList = oldList.data.filter(item => listCode.includes(item.code));
      state.selectedWatchlistSymbolList.data = newList;
    },
    onAddSymbol(_state, _action: PayloadAction<IAddSymbolParams>) {
      //Todo
    },
    onChangeSelectedWatchList(state, action: IAction<IChangeSelectedWatchListParams>) {
      state.selectedWatchList = action.payload.selectedWatchList;
      state.selectedWatchlistSymbolList = {
        status: ReducerStatus.LOADING,
        data: [],
        hasMore: true,
        hasMoreLoading: false,
      };
    },
    onCreateWatchList(state, _action: IAction<ICreateNewWatchListAction>) {
      state.selectedWatchlistSymbolList = {
        status: ReducerStatus.LOADING,
        data: [],
        hasMore: false,
        hasMoreLoading: false,
      };
    },
    onDeleteWatchList(state, action: IAction<IGetAllWatchlistResponse>) {
      const newList = state.watchListList.data?.filter(item => item.watchListId !== action.payload.watchListId) || [];
      if (state.selectedWatchList != null && state.selectedWatchList.watchListId === action.payload.watchListId) {
        const newSelected = newList.length > 0 ? newList[0] : initialState.selectedWatchList;

        state.selectedWatchList = newSelected;
      }

      state.watchListList = {
        data: newList,
        status: ReducerStatus.SUCCESS,
      };
    },
    onDeleteSymbol(state, action: IAction<string>) {
      const symbol = action.payload.trim();
      const { selectedWatchlistSymbolList, selectedWatchList, watchListList } = state;
      const newSelectedWatchListSymbolList = selectedWatchlistSymbolList.data.filter(item => item.code !== symbol);

      const newNumberOfStock = selectedWatchList.numberOfStocks - 1;
      const newWatchListList = watchListList.data.map(x =>
        x.watchListId === selectedWatchList?.watchListId ? { ...x, numberOfStocks: x.numberOfStocks - 1 } : x
      );

      state.watchListList = {
        data: newWatchListList,
        status: ReducerStatus.SUCCESS,
      };
      state.selectedWatchlistSymbolList.data = newSelectedWatchListSymbolList;

      state.selectedWatchList.numberOfStocks = newNumberOfStock;
    },
    onDeleteSymbolMulti(_state, _action: IAction<IDeleteSymbolParams>) {
      //Todo
    },
    onDeleteSymbolMultiNonLogin(state, action: IAction<IDeleteSymbolParams>) {
      //Todo
      const { selectedWatchlistSymbolList, watchListNonLogin } = state;

      const newSelectedWatchlistSymbolList = {
        ...selectedWatchlistSymbolList,
        status: ReducerStatus.SUCCESS,
        data: selectedWatchlistSymbolList.data.filter(item => item.code !== action.payload.code),
      };

      state.selectedWatchlistSymbolList = newSelectedWatchlistSymbolList;
      state.watchListNonLogin.stocks = watchListNonLogin.stocks.filter(item => item !== action.payload.code);

      state.watchListList.data[0].numberOfStocks -= 1;
      state.selectedWatchList.numberOfStocks -= 1;
      state.watchlistIncludeItem = {
        data: [],
        status: ReducerStatus.SUCCESS,
      };
    },
    onDeleteSymbolMultiKIS(_state, _action: IAction<IDeleteSymbolParams>) {
      //Todo Delete symbol multi KIS
    },
    onModifyWatchList(state, action: IAction<IModifyWatchlistParams>) {
      const { watchListList, selectedWatchList } = state;

      const newWatchListData = watchListList.data?.map(item => {
        if (item.watchListId === action.payload.watchListId) {
          return {
            ...item,
            watchListName: action.payload.watchListName,
          };
        }
        return item;
      });

      state.watchListList = {
        data: newWatchListData,
        status: ReducerStatus.SUCCESS,
      };

      if (action.payload.watchListId === selectedWatchList?.watchListId) {
        state.selectedWatchList.watchListName = action.payload.watchListName;
      }
    },
    getSymbolIncludeWatchList(_state, _action: IAction<IGetSymbolIncludeWatchlistParams>) {
      //Todo get symbol include watchlist
    },
    onChangeAccount(
      state,
      action: PayloadAction<{ newType: ACCOUNT_TYPE; oldType?: ACCOUNT_TYPE; newWatchListId: number }>
    ) {
      const { newType, oldType, newWatchListId } = action.payload;

      if (oldType !== newType) {
        state.watchlistIncludeItem = initialState.watchlistIncludeItem;
        state.watchListList = initialState.watchListList;
        state.selectedWatchList = {
          numberOfStocks: 0,
          watchListId: newWatchListId,
          watchListName: '',
        };
      }
    },
    clearData(state) {
      state.watchListList = initialState.watchListList;
      state.watchlistIncludeItem = initialState.watchlistIncludeItem;
      state.selectedWatchList = initialState.selectedWatchList;
      state.selectedWatchlistSymbolList = initialState.selectedWatchlistSymbolList;
      state.isAddingSymbol = initialState.isAddingSymbol;
      state.watchListNonLogin = initialState.watchListNonLogin;
    },
    onAddSymbolNonLogin(state, action: PayloadAction<string>) {
      const watchListNonLogin = state.watchListNonLogin;
      if (!watchListNonLogin.stocks.includes(action.payload) && state.selectedWatchList.numberOfStocks < 3) {
        state.watchListNonLogin.stocks = [action.payload, ...watchListNonLogin.stocks];
        state.watchlistIncludeItem = {
          data: [state.selectedWatchList.watchListId],
          status: ReducerStatus.SUCCESS,
        };
      }
    },
    onDeleteSymbolNonLogin(state, action: PayloadAction<string[]>) {
      state.watchListNonLogin.stocks = action.payload;
    },
    onChangeType(state, action: PayloadAction<{ type: (typeof listType)[0] }>) {
      state.watchListType = action.payload.type;
    },
  },
  extraReducers(builder) {
    builder.addCase(InvestmentActions.getInvestmentListSuccess, (state, action) => {
      const { profitLossItems } = action.payload.profitLossResponse;
      if (state.selectedWatchList.watchListId === -1 && !action.payload.isOtherUser) {
        const data = mapV2(profitLossItems, item => {
          return {
            code: item.stockCode,
            name: '',
          };
        });
        state.selectedWatchlistSymbolList.data = data;
      }
    });
    builder.addCase(InvestmentActions.getInvestmentListKisSuccess, (state, action) => {
      const { profitLossItems } = action.payload.profitLossResponse;

      if (state.selectedWatchList.watchListId === -1 && !action.payload.isOtherUser) {
        const data = mapV2(profitLossItems, item => {
          return {
            code: item.stockCode,
            name: '',
          };
        });
        state.selectedWatchlistSymbolList.data = data;
      }
    });
  },
});

const persistConfig: PersistConfig<ReturnType<typeof watchListSlice.reducer>> = {
  key: 'watchList',
  storage: AsyncStorage,
  whitelist: ['selectedWatchList', 'watchListNonLogin'],
};

const { actions, reducer } = watchListSlice;

export const WatchListActions = actions;
export const WatchListReducer = persistReducer(persistConfig, reducer);
