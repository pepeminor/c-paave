import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFollowingDailyProfitLossRequest, IFollowingDailyProfitLossSuccess, IUserWall } from './UserWall.type';
import { ReducerStatus } from 'interfaces/reducer';
import { IState } from 'reduxs/global-reducers';
import { mergeDeepRight } from 'ramda';
import { ACCOUNT_TYPE } from 'global';
import { IVNIndexReturn } from 'reduxs/DailyProfitLoss';
import { IAccumulativeProfitLossResponse } from 'interfaces/equity';

const initialState = {
  userWallList: {
    [ACCOUNT_TYPE.KIS]: {} as IUserWall,
    [ACCOUNT_TYPE.VIRTUAL]: {} as IUserWall,
    [ACCOUNT_TYPE.DEMO]: {} as IUserWall,
  },
  vnindexReturn: {} as IVNIndexReturn,
  dataByDate: {
    accNAVProfitValue: undefined as number | undefined,
    accNAVProfitRatio: undefined as number | undefined,
  },
};

export const UserWallSelectors = {
  selectUserDailyProfitLoss: (accountType: ACCOUNT_TYPE, userId: number) => (state: IState) =>
    state.UserWallReducer.userWallList?.[accountType]?.[userId]?.dailyProfitLoss,
};

const userWallSlice = createSlice({
  initialState,
  name: 'UserWall',
  reducers: {
    getUserProfitLoss(state, action: PayloadAction<IFollowingDailyProfitLossRequest>) {
      const { accountType, params } = action.payload;
      const { userWallList } = state;
      state.userWallList[accountType] = mergeDeepRight(userWallList[accountType], {
        [params.followingUserId]: {
          status: ReducerStatus.LOADING,
        },
      });
    },
    getUserProfitLossSuccess(state, action: PayloadAction<IFollowingDailyProfitLossSuccess>) {
      const { userId, data, period, accountType } = action.payload;
      const { userWallList } = state;
      state.userWallList[accountType] = mergeDeepRight(userWallList[accountType], {
        [userId]: {
          status: ReducerStatus.SUCCESS,
          dailyProfitLoss: {
            [period]: {
              data: data.dataProfitLoss,
              NAVDataPercent: data.NAVDataPercent,
              VNIndexDataPercent: data.VNIndexDataPercent,
              NetAssetValue: data.NetAssetValue,
              NavProfit: data.NavProfit,
              accumulatedProfit: data.accumulatedProfit,
              accumulatedProfitRatio: data.accumulatedProfitRatio,
              accNAVProfitValue: data.accNAVProfitValue,
              accNAVProfitRatio: data.accNAVProfitRatio,
              cashAllocation: data.cashAllocation,
              stockAllocation: data.stockAllocation,
            },
          },
          accountCreatedDate: data.accountCreatedDate,
          accountLinkedDate: data.accountLinkedDate,
        },
      });
    },
    getUserProfitLossFailed(state, action: PayloadAction<{ userId: number; accountType: ACCOUNT_TYPE }>) {
      const { userId, accountType } = action.payload;

      state.userWallList[accountType][userId].status = ReducerStatus.FAILED;
    },
    getAccumulativeProfitLossByDateSuccess(state, action: PayloadAction<IAccumulativeProfitLossResponse>) {
      const { accNAVProfitValue, accNAVProfitRatio } = action.payload;
      state.dataByDate = {
        ...state.dataByDate,
        accNAVProfitValue,
        accNAVProfitRatio,
      };
    },
    getVNIndexReturnSuccess(state, action: PayloadAction<IVNIndexReturn>) {
      state.vnindexReturn = {
        ...state.vnindexReturn,
        ...action.payload,
      };
    },
  },
});

export const UserWallActions = userWallSlice.actions;
export const UserWallReducer = userWallSlice.reducer;
