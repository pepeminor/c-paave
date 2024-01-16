import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IPayloadGetInvestmentListKisRequest,
  IPayloadGetInvestmentListRequest,
  IPayloadGetInvestmentListSuccess,
} from './Investment.type';
import { ReducerStatus } from 'interfaces/reducer';
import { IProfitLossItems, IProfitLossResponse } from 'interfaces/equity';
import { IState } from 'reduxs/global-reducers';
import { isNilOrEmpty, isNotNilOrEmpty } from 'ramda-adjunct';
import { SIGNOUT } from 'reduxs/actions';
import { SELECTED_ACCOUNT } from 'components/AccountPicker/reducers';
import { mapV2 } from 'utils';

const DEMO_PROFIT_LOSS = {
  netAsset: 500000000,
  previousNetAsset: 500000000,
  netAssetReturn: 0,
  cashBalance: 500000000,
  buyingPower: 500000000,
  cashT0: 0,
  cashT1: 0,
  totalAwaitCash: 0,
  profitLossItems: [],
  sectorWeight: [],
  totalProfitLoss: 0,
  totalProfitLossRate: 0,
  stockBalance: 0,
  navProfitLoss: 0,
  navProfit: 0,
  navProfitRatio: 0,
  netAssetValue: 0,
};
const initialState = {
  profitLossResponse: {
    data: {} as IProfitLossResponse,
    status: ReducerStatus.LOADING,
  },
  profitLossItems: [] as IProfitLossItems[],
  profitLossStockCodes: [] as string[],
  otherProfitLossResponse: {
    data: {} as IProfitLossResponse,
    status: ReducerStatus.LOADING,
  },
  otherProfitLossItems: [] as IProfitLossItems[],
  otherProfitLossStockCodes: [] as string[],
};

export const InvestmentSelectors = {
  selectedProfitLoss: (isOtherUser: boolean) => (state: IState) =>
    isOtherUser ? state.InvestmentReducer.otherProfitLossResponse : state.InvestmentReducer.profitLossResponse,
  selectedProfitLossStatus: (isOtherUser: boolean) => (state: IState) =>
    isOtherUser
      ? state.InvestmentReducer.otherProfitLossResponse.status
      : state.InvestmentReducer.profitLossResponse.status,
  selectedProfitLossItems: (isOtherUser: boolean) => (state: IState) =>
    isOtherUser ? state.InvestmentReducer.otherProfitLossItems : state.InvestmentReducer.profitLossItems,
  selectedProfitLossStockCodes: (isOtherUser: boolean) => (state: IState) =>
    isOtherUser ? state.InvestmentReducer.otherProfitLossStockCodes : state.InvestmentReducer.profitLossStockCodes,
  selectedProfitLossItem: (stockCode: string, isOtherUser: boolean) => (state: IState) => {
    const { profitLossItems } = isOtherUser
      ? state.InvestmentReducer.otherProfitLossResponse.data
      : state.InvestmentReducer.profitLossResponse.data;
    return isNotNilOrEmpty(profitLossItems) ? profitLossItems?.find(item => item.stockCode === stockCode) : undefined;
  },
};

const investmentSlice = createSlice({
  initialState,
  name: 'Investment',
  reducers: {
    getInvestmentListRequest(state, action: PayloadAction<IPayloadGetInvestmentListRequest>) {
      const { isLoading } = action.payload;
      if (
        isLoading ||
        state.profitLossResponse.status === ReducerStatus.FAILED ||
        isNilOrEmpty(state.profitLossResponse.data)
      ) {
        state.profitLossResponse.status = ReducerStatus.LOADING;
      }
      if (isNotNilOrEmpty(action.payload.paramsOther)) {
        state.otherProfitLossResponse = initialState.otherProfitLossResponse;
        state.otherProfitLossItems = initialState.otherProfitLossItems;
        state.otherProfitLossStockCodes = initialState.otherProfitLossStockCodes;
      }
    },
    getInvestmentListKisRequest(state, _action: PayloadAction<IPayloadGetInvestmentListKisRequest>) {
      state.otherProfitLossResponse = initialState.otherProfitLossResponse;
      state.otherProfitLossItems = initialState.otherProfitLossItems;
      state.otherProfitLossStockCodes = initialState.otherProfitLossStockCodes;
    },
    getInvestmentListSuccess(state, action: PayloadAction<IPayloadGetInvestmentListSuccess>) {
      if (action.payload.isOtherUser) {
        state.otherProfitLossResponse.data = action.payload.profitLossResponse;
        state.otherProfitLossItems = action.payload.profitLossResponse.profitLossItems;
        state.otherProfitLossStockCodes = mapV2(
          action.payload.profitLossResponse.profitLossItems,
          item => item.stockCode
        );

        state.otherProfitLossResponse.status = ReducerStatus.SUCCESS;

        return;
      }

      state.profitLossResponse.data = action.payload.profitLossResponse;
      state.profitLossItems = action.payload.profitLossResponse.profitLossItems;
      state.profitLossStockCodes = mapV2(action.payload.profitLossResponse.profitLossItems, item => item.stockCode);

      state.profitLossResponse.status = ReducerStatus.SUCCESS;
    },
    getInvestmentListKisSuccess(state, action: PayloadAction<IPayloadGetInvestmentListSuccess>) {
      state.otherProfitLossResponse.data = action.payload.profitLossResponse;
      state.otherProfitLossItems = action.payload.profitLossResponse.profitLossItems;
      state.otherProfitLossStockCodes = mapV2(
        action.payload.profitLossResponse.profitLossItems,
        item => item.stockCode
      );

      state.otherProfitLossResponse.status = ReducerStatus.SUCCESS;
    },
    getInvestmentListFailure(state) {
      state.otherProfitLossResponse.status = ReducerStatus.FAILED;

      state.profitLossResponse.status = ReducerStatus.FAILED;
    },
    getInvestmentListDemoData(state) {
      state.profitLossResponse.data = DEMO_PROFIT_LOSS;
      state.profitLossResponse.status = ReducerStatus.SUCCESS;
    },
    resetInvestmentList(state) {
      state.profitLossResponse.data = initialState.profitLossResponse.data;
      state.profitLossResponse.status = initialState.profitLossResponse.status;
    },
  },
  extraReducers(builder) {
    builder.addCase(SIGNOUT, () => {
      return initialState;
    }),
      builder.addCase(SELECTED_ACCOUNT, () => {
        return initialState;
      });
  },
});

export const InvestmentActions = investmentSlice.actions;
export const InvestmentReducer = investmentSlice.reducer;
