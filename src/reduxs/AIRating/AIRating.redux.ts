import { IFilterStock, ITopNumber } from 'screens/AIRatingScreen/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IAIRatingDataParams,
  IAiRatingItem,
  IAIRatingScore,
  IDataChart,
  IGetAIRatingDataChartSuccess,
  IGetAIRatingDataSuccess,
  IGetAIRatingInOutSuccess,
  IGetAIRatingListParams,
  IGetAIRatingListSuccess,
  IInOutAIRatingParams,
  IInOutAIRatingResponse,
} from './AIRating.type';
import { IState } from 'reduxs/global-reducers';
import { ReducerStatus } from 'interfaces/reducer';
import { isNotNil } from 'ramda-adjunct';

const initialState = {
  dataAIRating: {
    [ITopNumber.TOP5]: {
      dataRating: {} as IDataChart,
      dataIndex: {} as IDataChart,
      inOutRating: {} as IInOutAIRatingResponse,
      chartData: [] as IAiRatingItem[],
      dataList: [] as IAIRatingScore[],
      status: ReducerStatus.LOADING,
      isRefresh: false,
    },
    [ITopNumber.TOP10]: {
      dataRating: {} as IDataChart,
      dataIndex: {} as IDataChart,
      inOutRating: {} as IInOutAIRatingResponse,
      chartData: [] as IAiRatingItem[],
      dataList: [] as IAIRatingScore[],
      status: ReducerStatus.LOADING,
      isRefresh: false,
    },
    [ITopNumber.TOP15]: {
      dataRating: {} as IDataChart,
      dataIndex: {} as IDataChart,
      inOutRating: {} as IInOutAIRatingResponse,
      chartData: [] as IAiRatingItem[],
      dataList: [] as IAIRatingScore[],
      status: ReducerStatus.LOADING,
      isRefresh: false,
    },
    [ITopNumber.TOP20]: {
      dataRating: {} as IDataChart,
      dataIndex: {} as IDataChart,
      inOutRating: {} as IInOutAIRatingResponse,
      chartData: [] as IAiRatingItem[],
      dataList: [] as IAIRatingScore[],
      status: ReducerStatus.LOADING,
      isRefresh: false,
    },
  },
  dataList: [] as IAIRatingScore[],
  stockFilter: {
    rating: 0,
    technical: 0,
    valuation: 0,
    quality: 0,
    VN30: false,
    HNX30: false,
    UPCOM: false,
  } as IFilterStock,
};

export const AiRatingSelectors = {
  selectAIRatingData: (top: ITopNumber) => (state: IState) => state.AIRatingReducer.dataAIRating[top],
  selectAIRatingDataChart: (top: ITopNumber) => (state: IState) => {
    return {
      dataIndex: state.AIRatingReducer.dataAIRating[top].dataIndex,
      dataRating: state.AIRatingReducer.dataAIRating[top].dataRating,
      isRefresh: state.AIRatingReducer.dataAIRating[top].isRefresh,
      status: state.AIRatingReducer.dataAIRating[top].status,
    };
  },
  selectChartDataIndex: (top: ITopNumber) => (state: IState) => state.AIRatingReducer.dataAIRating[top].dataIndex,
  selectChartDataRating: (top: ITopNumber) => (state: IState) => state.AIRatingReducer.dataAIRating[top].dataRating,
  selectInOutRating: (top: ITopNumber) => (state: IState) => state.AIRatingReducer.dataAIRating[top].inOutRating,
  selectAiRatingStatus: (top: ITopNumber) => (state: IState) => state.AIRatingReducer.dataAIRating[top].status,
  selectAiRatingIsRefresh: (top: ITopNumber) => (state: IState) => state.AIRatingReducer.dataAIRating[top].isRefresh,
};

const aiRatingSlice = createSlice({
  initialState,
  name: 'AIRating',
  reducers: {
    getAIRating(state, action: PayloadAction<IAIRatingDataParams>) {
      //todo
      const { top, isRefresh } = action.payload;

      if (!isRefresh) {
        state.dataAIRating[top].status = ReducerStatus.LOADING;
      }
    },
    getAIRatingDataChartSuccess(state, action: PayloadAction<IGetAIRatingDataChartSuccess>) {
      const { top, dataIndex, dataRating } = action.payload;

      state.dataAIRating[top].dataIndex = dataIndex;
      state.dataAIRating[top].dataRating = dataRating;
      state.dataAIRating[top].status = ReducerStatus.SUCCESS;
      state.dataAIRating[top].isRefresh = false;
    },
    getAIRatingSuccess(state, action: PayloadAction<IGetAIRatingDataSuccess>) {
      const { dataList, inOutRating, top } = action.payload;
      if (isNotNil(dataList)) {
        state.dataAIRating[top].dataList = dataList;
        state.dataList = dataList;
      } else {
        state.dataAIRating[top].dataList = state.dataList;
      }
      state.dataAIRating[top].inOutRating = inOutRating;
    },
    getAIRatingFailed(state, action: PayloadAction<{ top: ITopNumber }>) {
      state.dataAIRating[action.payload.top].status = ReducerStatus.FAILED;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAiRatingInOut(_state, _action: PayloadAction<IInOutAIRatingParams>) {
      // To call saga
    },
    getAiRatingInOutSuccess(state, action: PayloadAction<IGetAIRatingInOutSuccess>) {
      const { data, top } = action.payload;
      state.dataAIRating[top].inOutRating = data;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getAiRatingList(_state, _action: PayloadAction<IGetAIRatingListParams>) {
      // To call saga
    },
    getAiRatingListSuccess(state, action: PayloadAction<IGetAIRatingListSuccess>) {
      const { dataList, top } = action.payload;
      state.dataAIRating[top].dataList = dataList;
    },
    resetDataAiRating(state) {
      state.dataAIRating[ITopNumber.TOP5].isRefresh = true;
      state.dataAIRating[ITopNumber.TOP10].isRefresh = true;
      state.dataAIRating[ITopNumber.TOP15].isRefresh = true;
      state.dataAIRating[ITopNumber.TOP20].isRefresh = true;
    },
    setFilterStock(state, action: PayloadAction<Partial<IFilterStock>>) {
      state.stockFilter = { ...state.stockFilter, ...action.payload };
    },
  },
});

export const AIRatingActions = aiRatingSlice.actions;
export const AIRatingReducer = aiRatingSlice.reducer;
