import APIList from 'config/api';
import { IAction, IResponse } from 'interfaces/common';
import {
  IGetAllSymbolFavoriteParams,
  IGetAllSymbolFavoriteResponse,
  IGetAllWatchlistResponse,
  IInitWatchListParams,
  IKisWatchListResponse,
} from 'interfaces/favorite';
import { ReducerStatus } from 'interfaces/reducer';
import { call, put, select } from 'redux-saga/effects';
import { IState } from 'reduxs/global-reducers';
import { mapV2, query, queryKis } from 'utils';
import { ICreateWatchlistParams, ICreateWatchlistResponse } from 'interfaces/favorite';
import { IAccount } from 'interfaces/common';
import { ACCOUNT_TYPE, LANG } from 'global';
import { NonLoginWatchList } from 'reduxs/global-reducers/WatchList';
import { MarketSymbol } from 'reduxs/SymbolData';
import { WatchListActions } from '../WatchList.redux';
import { isEmpty } from 'ramda';
import { IWatchListModule } from '../WatchList.type';
import { DiscoverActions } from 'reduxs/Discover';
import { InvestmentActions, InvestmentSelectors } from 'reduxs/Investment';
import { IProfitLossItems } from 'interfaces/equity';
import { isNotNil } from 'ramda-adjunct';

interface ICreateWatchlist {
  message: string;
  watchListId: number;
}

export function* queryWatchListDetail({
  params,
  isLoading = true,
  handleSuccess,
  handleFail,
}: {
  params: IGetAllSymbolFavoriteParams;
  isLoading?: boolean;
  handleSuccess?: () => void;
  handleFail?: () => void;
}) {
  try {
    const watchList: IWatchListModule = yield select((state: IState) => state.WatchListReducer);
    const watchListSymbolsResponse: IResponse<IGetAllSymbolFavoriteResponse[]> = { data: [] };
    const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
    if (selectedAccount == null) return;
    switch (selectedAccount.type) {
      case ACCOUNT_TYPE.KIS: {
        const kisWatchListSymbolsResponse: IResponse<IKisWatchListResponse[]> = yield call(
          queryKis,
          APIList.getKisFavorite
        );
        kisWatchListSymbolsResponse.data.forEach(
          watchList =>
            watchList.id === params.watchListId &&
            watchList.itemList.forEach(symbol => watchListSymbolsResponse.data.push({ code: symbol.data, name: '' }))
        );
        //đảo mảng để lấy symbol mới nhất lên đầu - Áp dụng với KIS - VT đã sort từ đầu
        watchListSymbolsResponse.data.reverse();
        break;
      }
      case ACCOUNT_TYPE.VIRTUAL: {
        const watchListVirtualSymbolsResponse: IResponse<IGetAllSymbolFavoriteResponse[]> = yield call(
          query,
          APIList.getAllFavoriteSymbol,
          params
        );
        watchListVirtualSymbolsResponse.data.forEach(watchList => watchListSymbolsResponse.data.push(watchList));
        break;
      }
      case ACCOUNT_TYPE.DEMO: {
        const nonLoginWatchList: NonLoginWatchList = watchList.watchListNonLogin;
        const selectedLanguage: LANG = yield select((state: IState) => state.lang);
        const dataMap: { readonly [s: string]: MarketSymbol } = yield select(
          (state: IState) => state.SymbolData.marketData.symbolMap
        );
        nonLoginWatchList?.stocks?.forEach(symbol =>
          watchListSymbolsResponse.data.push({
            code: symbol,
            name: (selectedLanguage === LANG.VI ? dataMap[symbol].vietnameseName : dataMap[symbol].englishName) ?? '',
          })
        );

        break;
      }
      default:
        break;
    }

    if (handleSuccess && !isLoading) {
      yield handleSuccess();
    }

    yield put(
      WatchListActions.updateWatchList({
        selectedWatchlistSymbolList: {
          ...watchList.selectedWatchlistSymbolList,
          data: watchListSymbolsResponse.data,
          status: ReducerStatus.SUCCESS,
          hasMore: params.pageSize == null || watchListSymbolsResponse.data.length >= params.pageSize,
        },
      })
    );

    if (handleSuccess && isLoading) {
      yield handleSuccess();
    }
    // callerId && subscribeState.subscribeQuote(callerId);
  } catch (e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('fail to query watch list detail', e);
    }
    if (handleFail) yield handleFail();
    yield put(WatchListActions.initWatchListFailed());
  }
}

function* queryInvestment() {
  const profitLossStockCodes: IProfitLossItems[] = yield select(InvestmentSelectors.selectedProfitLossItems(false));
  const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
  const accountNumber = selectedAccount?.selectedSubAccount?.accountNumber;

  if (profitLossStockCodes.length === 0) {
    if (selectedAccount.type === ACCOUNT_TYPE.VIRTUAL) {
      yield put(
        InvestmentActions.getInvestmentListRequest({
          api: APIList.getProfitLoss,
          isLoading: false,
        })
      );
    }

    if (selectedAccount.type === ACCOUNT_TYPE.KIS && isNotNil(accountNumber)) {
      yield put(
        InvestmentActions.getInvestmentListRequest({
          api: APIList.getKisProfitLoss,
          params: {
            subAccount: accountNumber,
            forced: true,
          },
          isLoading: false,
        })
      );
    }
  }
}

export function* initWatchList(action: IAction<IInitWatchListParams>) {
  try {
    yield queryInvestment();
    const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
    const profitLossStockCodes: IProfitLossItems[] = yield select(InvestmentSelectors.selectedProfitLossItems(false));

    if (selectedAccount == null) return;
    const allWatchListResponse: IResponse<IGetAllWatchlistResponse[]> = { data: [] };
    switch (selectedAccount.type) {
      case ACCOUNT_TYPE.KIS: {
        const kisWatchListSymbolsResponse: IResponse<IKisWatchListResponse[]> = yield call(
          queryKis,
          APIList.getKisFavorite
        );
        allWatchListResponse.data.push({
          watchListId: -1,
          watchListName: 'my_portfolio',
          numberOfStocks: profitLossStockCodes.length,
        });
        kisWatchListSymbolsResponse.data.forEach(watchList =>
          allWatchListResponse.data.push({
            watchListId: watchList.id,
            watchListName: watchList.name,
            numberOfStocks: watchList.count,
          })
        );
        break;
      }
      case ACCOUNT_TYPE.VIRTUAL: {
        const allVirtualWatchListResponse: IResponse<IGetAllWatchlistResponse[]> = yield call(
          query,
          APIList.getAllWatchlist,
          {}
        );
        allWatchListResponse.data.push({
          watchListId: -1,
          watchListName: 'my_portfolio',
          numberOfStocks: profitLossStockCodes.length,
        });
        allVirtualWatchListResponse.data.forEach(watchList => allWatchListResponse.data.push(watchList));
        break;
      }
      case ACCOUNT_TYPE.DEMO: {
        const nonLoginWatchList: NonLoginWatchList = yield select(
          (state: IState) => state.WatchListReducer.watchListNonLogin
        );
        allWatchListResponse.data.push({
          watchListId: nonLoginWatchList.index,
          watchListName: nonLoginWatchList.name,
          numberOfStocks: nonLoginWatchList.stocks.length,
        });

        break;
      }
      default:
        break;
    }
    const isNotDemoAccount = selectedAccount.type !== ACCOUNT_TYPE.DEMO;
    //create watchlist default if not exist
    if (allWatchListResponse.data.length === 1 && isNotDemoAccount) {
      const createResponse: IResponse<ICreateWatchlist> = { data: { message: '', watchListId: 0 } };
      switch (selectedAccount.type) {
        case ACCOUNT_TYPE.KIS: {
          const paramKis = {
            name: 'My Watchlist',
          };
          const kisWatchListSymbolsResponse: IResponse<IKisWatchListResponse> = yield call(
            queryKis,
            APIList.postKisFavorite,
            paramKis
          );
          createResponse.data.watchListId = kisWatchListSymbolsResponse.data.id;
          break;
        }
        case ACCOUNT_TYPE.VIRTUAL: {
          const params: ICreateWatchlistParams = {
            watchListName: 'My Watchlist',
          };
          const createWatchlistResponse: IResponse<ICreateWatchlistResponse> = yield call(
            query,
            APIList.createWatchlist,
            params
          );
          createResponse.data.watchListId = createWatchlistResponse.data.watchListId;
          break;
        }
        default:
          break;
      }
      const iniWatchlist = {
        watchListName: 'My Watchlist',
        watchListId: createResponse.data.watchListId,
        numberOfStocks: 0,
      };
      yield put(
        WatchListActions.updateWatchList({
          watchListList: {
            data: [...allWatchListResponse.data, iniWatchlist],
            status: ReducerStatus.SUCCESS,
          },
          selectedWatchList: iniWatchlist,
        })
      );
    } else {
      const watchList: IWatchListModule = yield select((state: IState) => state.WatchListReducer);
      const selectedWatchList = isEmpty(watchList.selectedWatchList)
        ? allWatchListResponse.data[isNotDemoAccount ? 1 : 0] //default select first watchlist
        : watchList.selectedWatchList;
      yield put(
        WatchListActions.updateWatchList({
          watchListList: {
            data: allWatchListResponse.data,
            status: ReducerStatus.SUCCESS,
          },
          selectedWatchList: selectedWatchList,
        })
      );

      if (action.payload.watchListListOnly) return;

      //if watchlist is my portfolio
      if (selectedWatchList?.watchListId === -1) {
        const data = mapV2(profitLossStockCodes, item => {
          return {
            code: item.stockCode,
            name: '',
          };
        });

        yield put(
          WatchListActions.updateWatchList({
            selectedWatchlistSymbolList: {
              data: data,
              status: ReducerStatus.SUCCESS,
              hasMore: false,
              hasMoreLoading: false,
            },
          })
        );
        return;
      }

      if (selectedWatchList != null) {
        yield queryWatchListDetail({
          params: {
            watchListId: selectedWatchList.watchListId,
            pageNumber: action.payload.pageNumber,
            pageSize: action.payload.pageSize,
          },
          isLoading: !!action.payload.refresh,
        });
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    if (__DEV__) console.log('fail in query watchlist', e);
    yield put(WatchListActions.initWatchListFailed());
  }
  yield put(DiscoverActions.refreshDiscoverScreenFinish({ refreshWatchlistFinish: true }));
}
