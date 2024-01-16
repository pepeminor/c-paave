import { put, select, all, call, takeLatest } from 'redux-saga/effects';
import {
  LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST,
  // PORTFOLIO_DERIVATIVE_CASH_BALANCE,
  PORTFOLIO_ENTER_SCREEN,
  PORTFOLIO_REDUCER_UPDATE,
  GET_CURRENT_TIME,
} from '../../actions';
import { IAction, IResponse, IAPI, IActionCallBack, IAccount } from 'interfaces/common';
import {
  getAccountContestRegistered,
  getCashBalanceAndStockBalanceForKis,
  getLeaderBoardCurrentInvestingInfo,
  getLeaderBoardInvestingUserRanking,
  getNumberOfUnreadNotification,
  getPortfolioContestCurrentRanking,
  getVirtualProfitLoss,
  resetDailyProfitLossForKis,
} from 'reduxs/global-actions';
import { ACCOUNT_TYPE, ESubAccountJoinedContest, SYSTEM_TYPE } from 'global';
import { IState } from '../../global-reducers/index';
import { OneSignalUtils, query } from 'utils';
import APIList from 'config/api';
import { IKisProfitLossParams, IProfitLossResponse } from 'interfaces/equity';
import { ILoadingReducer, ReducerStatus } from 'interfaces/reducer';
import { IOnEnterPortfolioScreen } from 'interfaces/portfolio';
import { getCurrentUserSetting, updateCurrentUserSetting } from '../../global-actions/UserInfo';
import { IUserSetting } from 'interfaces/user';

import { ILeaderBoardVirtualCoreContestResponse } from 'interfaces/leaderBoard';
import { SUCCESS } from 'reduxs/action-type-utils';
import { ILeaderBoardInvestingPeriod } from 'constants/enum';
import { getDerivativePortfolio } from 'reduxs/global-actions/Derivative';
import { InvestmentActions } from 'reduxs/Investment';
import ScreenNames from 'screens/RootNavigation/ScreenNames';

export function* handleQueryProfitLoss(
  api: IAPI,
  params: IKisProfitLossParams | null,
  isLoading: boolean,
  callBack: IActionCallBack | undefined
) {
  try {
    const profitLossResponse: ILoadingReducer<IProfitLossResponse | null> = yield select(
      (state: IState) => state.screenPortfolio.profitLossResponse
    );
    const profitLossTotal: ILoadingReducer<IProfitLossResponse | null> = yield select(
      (state: IState) => state.screenPortfolio.profitLossTotal
    );
    if (isLoading || profitLossResponse.status === ReducerStatus.FAILED || profitLossResponse.data == null) {
      yield put({
        type: PORTFOLIO_REDUCER_UPDATE,
        payload: {
          profitLossResponse: {
            ...profitLossResponse,
            status: ReducerStatus.LOADING,
          },
          profitLossTotal: {
            ...profitLossTotal,
            status: ReducerStatus.LOADING,
          },
        },
      });
    }

    const response: IResponse<IProfitLossResponse> = yield call(query, api, params);

    if (response.data != null) {
      yield put({
        type: PORTFOLIO_REDUCER_UPDATE,
        payload: {
          profitLossResponse: {
            data: response.data,
            status: ReducerStatus.SUCCESS,
          },
          profitLossTotal: {
            data: {
              totalBuyValue: response.data.profitLossItems.reduce(
                (prevValue, currentValue) => prevValue + currentValue.buyingPrice * currentValue.balanceQuantity,
                0
              ),
              totalMarketValue: response.data.stockBalance,
              totalProfitLoss: response.data.totalProfitLoss ?? 0,
              totalProfitLossRate: response.data.totalProfitLossRate ?? 0,
            },
            status: ReducerStatus.SUCCESS,
          },
        },
      });
    }
    yield callBack?.handleSuccess && callBack.handleSuccess(response);
  } catch (error) {
    yield put({
      type: PORTFOLIO_REDUCER_UPDATE,
      payload: {
        profitLossResponse: {
          data: null,
          status: ReducerStatus.FAILED,
        },
        profitLossTotal: {
          data: null,
          status: ReducerStatus.FAILED,
        },
        profitLossData: {
          data: [],
          status: ReducerStatus.FAILED,
        },
      },
    });
  }
}

function* handleEnterScreen(action: IAction<IOnEnterPortfolioScreen>) {
  if (action == null) return;
  const selectedAccount: IAccount = yield select((state: IState) => state.selectedAccount);
  try {
    yield put({ type: GET_CURRENT_TIME });
    if (selectedAccount.type !== ACCOUNT_TYPE.DEMO) {
      const accountContestRegistered: string = yield select((state: IState) => state.accountContestRegistered.data);
      // account not join contest => get ranking of account paave
      if (accountContestRegistered === ESubAccountJoinedContest.NOT_JOIN) {
        yield put(
          getLeaderBoardCurrentInvestingInfo({
            period: ILeaderBoardInvestingPeriod.DAY,
          })
        );
      } else {
        // account joined contest => get ranking of account contest
        // yield put({
        //   type: RESET(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST_CURRENT_RANKING), //not reset when focus screen
        // });
        const contestData: IResponse<ILeaderBoardVirtualCoreContestResponse[]> = yield call(
          query,
          APIList.leaderBoardVirtualCoreContest
        );
        if (contestData != null) {
          yield put({
            type: SUCCESS(LEADER_BOARD_GET_VIRTUAL_CORE_CONTEST),
            payload: contestData.data,
          });

          if (contestData.data.length > 0 && contestData.data[0].contestId != null) {
            yield put(
              getPortfolioContestCurrentRanking({
                contestId: contestData.data[0].contestId,
                period: ILeaderBoardInvestingPeriod.WEEK,
                withCondition: true, // Paave contest just only withCondition = true
              })
            );
          }
        }
      }
    }

    switch (selectedAccount.type) {
      case ACCOUNT_TYPE.VIRTUAL:
        yield all([
          put(
            InvestmentActions.getInvestmentListRequest({
              api: APIList.getProfitLoss,
              callBack: action.callBack,
              isLoading: action.payload.investmentLoading,
            })
          ),
          put(getLeaderBoardInvestingUserRanking(null)),
          put(getNumberOfUnreadNotification(null)),
          put(
            getLeaderBoardCurrentInvestingInfo({
              period: ILeaderBoardInvestingPeriod.DAY,
              currentScreen: ScreenNames.HomeTab,
            })
          ),
        ]);
        break;

      case ACCOUNT_TYPE.KIS: {
        if (selectedAccount.selectedSubAccount == null) return;
        const currentUserSetting: IUserSetting = yield select((state: IState) => state.currentUserSetting);
        const isSubD =
          selectedAccount != null &&
          selectedAccount.selectedSubAccount != null &&
          selectedAccount.selectedSubAccount.accountSubs[0] != null &&
          selectedAccount.selectedSubAccount.accountSubs[0].type === SYSTEM_TYPE.DERIVATIVES;

        yield put(updateCurrentUserSetting({ isSms: !currentUserSetting.alreadyDoneSmsOTP }));
        OneSignalUtils.updateTagMobileOTP(currentUserSetting.alreadyDoneSmsOTP);
        const accountNumber = selectedAccount.selectedSubAccount.accountNumber;

        if (isSubD) {
          yield all([
            put(getDerivativePortfolio({ accountNo: accountNumber })),
            put(resetDailyProfitLossForKis({ subAccount: accountNumber })),
          ]);
        }
        // other subs
        else {
          yield all([
            put(
              InvestmentActions.getInvestmentListRequest({
                api: APIList.getKisProfitLoss,
                params: {
                  subAccount: accountNumber,
                  forced: true,
                },
                callBack: action.callBack,
                isLoading: action.payload.investmentLoading,
              })
            ),
            put(
              getCashBalanceAndStockBalanceForKis({
                accountNumber: accountNumber,
                clientID: selectedAccount.username,
              })
            ),
            put(resetDailyProfitLossForKis({ subAccount: accountNumber })),
            put(getAccountContestRegistered({})),
            put(
              getLeaderBoardCurrentInvestingInfo({
                period: ILeaderBoardInvestingPeriod.DAY,
                currentScreen: ScreenNames.HomeTab,
              })
            ),
            put(getNumberOfUnreadNotification(null)),
          ]);
        }
        yield action.callBack?.handleSuccess?.();
        break;
      }

      case ACCOUNT_TYPE.DEMO:
        yield put(getVirtualProfitLoss(null));
        // get data account demo
        yield put(InvestmentActions.getInvestmentListDemoData());
        yield action.callBack?.handleSuccess?.();
        break;
      default:
        break;
    }
  } catch (e) {
    yield action.callBack?.handleFail && action.callBack.handleFail();
    // eslint-disable-next-line no-console
    console.error('fail in query onEnter Portfolio', e);
  }
}

export default function* watchOnEnterScreen() {
  yield put(getCurrentUserSetting({}));
  yield takeLatest(PORTFOLIO_ENTER_SCREEN, handleEnterScreen);
}
